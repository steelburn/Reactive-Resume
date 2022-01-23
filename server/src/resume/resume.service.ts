import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { pick, sample } from 'lodash';
import { Socket } from 'socket.io';
import { Repository } from 'typeorm';

import { AuthService } from '@/auth/auth.service';
import { PostgresErrorCode } from '@/database/errorCodes.enum';
import { UsersService } from '@/users/users.service';

import { covers } from './data/covers';
import { defaultState } from './data/defaultState';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { Resume } from './entities/resume.entity';

@Injectable()
export class ResumeService {
  constructor(
    @InjectRepository(Resume) private resumeRepository: Repository<Resume>,
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  async create(createResumeDto: CreateResumeDto, userId: number) {
    try {
      const user = await this.usersService.findById(userId);

      const resume = this.resumeRepository.create({
        ...defaultState,
        ...createResumeDto,
        image: sample(covers),
        user,
        basics: {
          name: user.name,
        },
      });

      return this.resumeRepository.save(resume);
    } catch (error: any) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'A resume with the same slug already exists, please enter a unique slug and try again.',
          HttpStatus.BAD_REQUEST,
        );
      }

      throw new HttpException(
        'Something went wrong. Please try again later, or raise an issue on GitHub if the problem persists.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll() {
    return this.resumeRepository.find();
  }

  findAllByUser(userId: number) {
    return this.resumeRepository.find({ user: { id: userId } });
  }

  async findOne(id: number, userId?: number) {
    const resume = await this.resumeRepository.findOne(id);

    if (!resume) {
      throw new HttpException(
        'The resume you are looking does not exist, or maybe never did?',
        HttpStatus.NOT_FOUND,
      );
    }

    const isPrivate = !resume.public;
    const isNotOwner = resume.user.id !== userId;

    if (isPrivate && isNotOwner) {
      throw new HttpException(
        'The resume you are looking does not exist, or maybe never did?',
        HttpStatus.NOT_FOUND,
      );
    }

    return resume;
  }

  async findOneByIdentifier(username: string, slug: string, userId?: number) {
    const resume = await this.resumeRepository.findOne({ user: { username }, slug });

    if (!resume) {
      throw new HttpException(
        'The resume you are looking does not exist, or maybe never did?',
        HttpStatus.NOT_FOUND,
      );
    }

    const isPrivate = !resume.public;
    const isNotOwner = resume.user.id !== userId;

    if (isPrivate && isNotOwner) {
      throw new HttpException(
        'The resume you are looking does not exist, or maybe never did?',
        HttpStatus.NOT_FOUND,
      );
    }

    return resume;
  }

  async update(id: number, updateResumeDto: UpdateResumeDto, userId: number) {
    const resume = await this.findOne(id, userId);

    const updatedResume = {
      ...resume,
      ...updateResumeDto,
    };

    return this.resumeRepository.save<Resume>(updatedResume);
  }

  async remove(id: number, userId: number) {
    await this.resumeRepository.delete({ id, user: { id: userId } });
  }

  async duplicate(id: number, userId: number) {
    try {
      const originalResume = await this.findOne(id, userId);

      const duplicatedResume: Partial<Resume> = {
        ...pick(originalResume, ['name', 'slug', 'basics', 'metadata', 'sections', 'public']),
        name: `${originalResume.name} Copy`,
        slug: `${originalResume.slug}-copy`,
      };

      const resume = this.resumeRepository.create({
        ...duplicatedResume,
        image: sample(covers),
        user: { id: userId },
      });

      return this.resumeRepository.save(resume);
    } catch (error: any) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'A resume with the same slug already exists, please enter a unique slug and try again.',
          HttpStatus.BAD_REQUEST,
        );
      }

      throw new HttpException(
        'Something went wrong. Please try again later, or raise an issue on GitHub if the problem persists.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  getUserFromSocket(socket: Socket) {
    const accessToken = socket.handshake.headers.authorization;

    if (!accessToken) {
      socket.disconnect();
    }

    try {
      return this.authService.getUserFromAccessToken(accessToken);
    } catch {
      socket.emit('error', 'Invalid Credentials');
      socket.disconnect();
    }
  }
}
