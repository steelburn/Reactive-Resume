import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import path from 'path';

import { JwtAuthGuard } from '@/auth/guards/jwt.guard';
import { OptionalJwtAuthGuard } from '@/auth/guards/optional-jwt.guard';
import { User } from '@/decorators/user.decorator';
import { User as UserEntity } from '@/users/entities/user.entity';

import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { ResumeService } from './resume.service';

@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createResumeDto: CreateResumeDto, @User('id') userId: number) {
    return this.resumeService.create(createResumeDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllByUser(@User('id') userId: number) {
    return this.resumeService.findAllByUser(userId);
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @User('id') userId?: number) {
    return this.resumeService.findOne(+id, userId);
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Get('/:username/:slug')
  findOneByIdentifier(
    @Param('username') username: string,
    @Param('slug') slug: string,
    @User('id') userId?: number,
  ) {
    return this.resumeService.findOneByIdentifier(username, slug, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateResumeDto: UpdateResumeDto,
    @User('id') userId: number,
  ) {
    return this.resumeService.update(+id, updateResumeDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @User('id') userId: number) {
    return this.resumeService.remove(+id, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/duplicate')
  duplicate(@Param('id') id: string, @User('id') userId: number) {
    return this.resumeService.duplicate(+id, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/upload-image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, _, cb) => {
          const userId = (req.user as UserEntity).id;
          const resumeId = req.params.id;
          const fileDirectory = `public/uploads/${userId}/${resumeId}`;

          mkdirSync(fileDirectory, { recursive: true });

          cb(null, fileDirectory);
        },
        filename: (_, file, cb) => {
          const filename = 'avatar' + path.extname(file.originalname);

          cb(null, filename);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return file.path;
  }
}
