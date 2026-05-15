import { Module } from '@nestjs/common'
import { ChatController } from 'src/chat/chat.controller'
import { ChatRepository } from 'src/chat/chat.repository'
import { ChatService } from 'src/chat/chat.service'
import { ToolsService } from 'src/chat/tools.service'
import { MessageRepository } from 'src/message/message.repository'

@Module({
  controllers: [ChatController],
  providers: [ChatService, ToolsService, ChatRepository, MessageRepository]
})
export class ChatModule {}
