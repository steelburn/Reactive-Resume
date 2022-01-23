import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';

import { User } from '@/users/entities/user.entity';
import Handlebars = require('handlebars');
import * as nodemailer from 'nodemailer';
import * as path from 'path';

@Injectable()
export class MailService {
  private readonly transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport(
      {
        host: this.configService.get<string>('mail.host'),
        port: this.configService.get<number>('mail.host'),
        auth: {
          user: this.configService.get<string>('mail.username'),
          pass: this.configService.get<string>('mail.password'),
        },
      },
      {
        from: this.configService.get<string>('mail.from'),
      },
    );
  }

  async sendForgotPasswordEmail(user: User, resetToken: string) {
    const url = `http://localhost:3000?modal=auth.reset&resetToken=${resetToken}`;
    const templateSource = fs.readFileSync(
      path.join(__dirname, 'templates/forgot-password.hbs'),
      'utf-8',
    );
    const template = Handlebars.compile(templateSource);
    const html = template({ name: user.name, url });

    await this.transporter.sendMail({
      to: user.email,
      subject: 'Reset your Reactive Resume password',
      html,
    });
  }
}
