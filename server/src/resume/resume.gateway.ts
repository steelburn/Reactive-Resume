import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { Resume } from './entities/resume.entity';
import { ResumeService } from './resume.service';

@WebSocketGateway(80)
export class ResumeGateway {
  @WebSocketServer()
  server: Server;

  constructor(private resumeService: ResumeService) {}

  async handleConnection(socket: Socket) {
    const user = await this.resumeService.getUserFromSocket(socket);

    if (!user) {
      socket.disconnect();
    }

    return user;
  }

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() data: Resume, @ConnectedSocket() socket: Socket) {
    const user = await this.resumeService.getUserFromSocket(socket);

    return this.resumeService.update(data.id, data, user.id);
  }
}
