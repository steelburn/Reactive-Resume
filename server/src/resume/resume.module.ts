import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@/auth/auth.module';
import { UsersModule } from '@/users/users.module';

import { Resume } from './entities/resume.entity';
import { ResumeController } from './resume.controller';
import { ResumeService } from './resume.service';

@Module({
  imports: [TypeOrmModule.forFeature([Resume]), MulterModule, AuthModule, UsersModule],
  controllers: [ResumeController],
  providers: [ResumeService],
})
export class ResumeModule {}
