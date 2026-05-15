import { Injectable } from '@nestjs/common'
import { ChatWithMessagesType } from 'src/chat/chat.model'
import { PrismaService } from 'src/shared/services/prisma.service'

@Injectable()
export class ChatRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async getChats(): Promise<ChatWithMessagesType[]> {
    const chats = await this.prismaService.chat.findMany({
      orderBy: {
        updatedAt: 'desc'
      },
      include: {
        messages: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 1
        }
      }
    })
    return chats as unknown as ChatWithMessagesType[]
  }

  async getChatById(chatId: string): Promise<ChatWithMessagesType | null> {
    return (await this.prismaService.chat.findFirst({
      where: {
        id: chatId
      },
      include: {
        messages: {
          orderBy: {
            createdAt: 'asc'
          }
        }
      }
    })) as unknown as ChatWithMessagesType | null
  }

  async createChat(chatId: string): Promise<ChatWithMessagesType> {
    const chat = await this.prismaService.chat.create({
      data: { id: chatId },
      include: {
        messages: true
      }
    })
    return chat as unknown as ChatWithMessagesType
  }

  async updateChat(chatId: string, body: any): Promise<ChatWithMessagesType> {
    return (await this.prismaService.chat.update({
      where: {
        id: chatId
      },
      data: {
        ...body
      }
    })) as unknown as ChatWithMessagesType
  }
}
