import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@/auth/auth.module';
import { UsersModule } from '@/users/users.module';

import { Resume } from './entities/resume.entity';
import { ResumeController } from './resume.controller';
import { ResumeGateway } from './resume.gateway';
import { ResumeService } from './resume.service';

@Module({
  imports: [TypeOrmModule.forFeature([Resume]), HttpModule, AuthModule, UsersModule],
  controllers: [ResumeController],
  providers: [ResumeService, ResumeGateway],
})
export class ResumeModule {}
