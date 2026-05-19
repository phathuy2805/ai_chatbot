// import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common'
// import { UIMessage } from 'ai'
// import type { Response } from 'express'
// import { ChatService } from 'src/chat/chat.service'

// @Controller('chats')
// export class ChatController {
//   constructor(private readonly chatService: ChatService) {}

//   @Post()
//   async chat(@Body() body: { message: UIMessage; id: string; model?: string }, @Res() res: Response) {
//     await this.chatService.chat({
//       message: body.message,
//       model: body.model ?? 'google/gemini-3-flash',
//       response: res,
//       chatId: body.id
//     })
//   }

//   @Get()
//   async getChats() {
//     return await this.chatService.getChats()
//   }

//   @Get(':chatId/messages')
//   async getMessagesFromChat(@Param('chatId') chatId: string) {
//     return await this.chatService.getMessagesFromChat(chatId)
//   }

//   @Get(':chatId')
//   async getChat(@Param('chatId') chatId: string) {
//     return await this.chatService.getChatById(chatId)
//   }
// }
