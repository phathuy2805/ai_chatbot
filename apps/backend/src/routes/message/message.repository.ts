// import { Injectable } from '@nestjs/common'
// import { MessageType } from 'src/shared/models/shared-message.model'
// import { PrismaService } from 'src/shared/services/prisma.service'

// @Injectable()
// export class MessageRepository {
//   constructor(private readonly prismaService: PrismaService) {}

//   async getMessagesFromChat(chatId: string): Promise<MessageType[]> {
//     const messages = await this.prismaService.message.findMany({
//       where: {
//         chatId
//       },
//       orderBy: {
//         createdAt: 'asc'
//       }
//     })
//     return messages as unknown as MessageType[]
//   }

//   async saveMessage(chatId: string, message: any): Promise<MessageType> {
//     const saved = await this.prismaService.message.create({
//       data: {
//         chatId,
//         content: message,
//         createdAt: new Date()
//       }
//     })
//     return saved as unknown as MessageType
//   }
// }
