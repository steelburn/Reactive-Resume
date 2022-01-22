import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SchedulerRegistry } from '@nestjs/schedule';
import * as bcrypt from 'bcrypt';

import { PostgresErrorCode } from '@/database/errorCodes.enum';
import { User } from '@/users/entities/user.entity';
import { UsersService } from '@/users/users.service';

import { RegisterDto } from './dto/register.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private configService: ConfigService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    try {
      const createdUser = await this.usersService.create({
        ...registerDto,
        password: hashedPassword,
      });

      return createdUser;
    } catch (error: any) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'A user with that username and/or email already exists.',
          HttpStatus.BAD_REQUEST,
        );
      }

      throw new HttpException(
        'Something went wrong. Please try again later, or raise an issue on GitHub if the problem persists.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUser(identifier: string, password: string) {
    try {
      const user = await this.usersService.findByIdentifier(identifier);

      await this.verifyPassword(password, user.password);

      return user;
    } catch (error) {
      throw new HttpException(
        'The username/email and password combination provided was incorrect.',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async verifyPassword(password: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordMatching) {
      throw new HttpException(
        'The username/email and password combination provided was incorrect.',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  forgotPassword(email: string) {
    this.usersService.generateResetToken(email);
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const user = await this.usersService.findByResetToken(resetPasswordDto.resetToken);
    const hashedPassword = await bcrypt.hash(resetPasswordDto.password, 10);

    await this.usersService.update(user.id, { password: hashedPassword, resetToken: null });

    try {
      this.schedulerRegistry.deleteInterval(`clear-resetToken-${user.id}`);
    } catch {
      // pass through
    }
  }

  removeUser(id: number) {
    return this.usersService.remove(id);
  }

  getAccessToken(id: number) {
    const expiresIn = this.configService.get<number>('auth.jwtExpiryTime');

    return this.jwtService.sign({ id }, { expiresIn });
  }

  getUserFromAccessToken(accessToken: string) {
    const payload: User = this.jwtService.verify(accessToken, {
      secret: this.configService.get<string>('auth.jwtSecret'),
    });

    return this.usersService.findById(payload.id);
  }
}
