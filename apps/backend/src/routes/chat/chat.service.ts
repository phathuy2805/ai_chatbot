// import { Injectable } from '@nestjs/common'
// import { convertToModelMessages, ModelMessage, smoothStream, streamText, UIMessage } from 'ai'
// import { Response } from 'express'
// import { ChatWithMessagesType, GetChatsResType } from 'src/chat/chat.model'
// import { ChatRepository } from 'src/chat/chat.repository'
// import { ToolsService } from 'src/chat/tools.service'
// import { MessageRepository } from 'src/message/message.repository'
// import { MessageType } from 'src/shared/models/shared-message.model'
// import { UIMessageType } from 'src/shared/models/UIMessage.model'

// @Injectable()
// export class ChatService {
//   constructor(
//     private readonly toolsService: ToolsService,
//     private readonly chatRepo: ChatRepository,
//     private readonly messageRepo: MessageRepository
//   ) {}

//   //UIMessage là định nghĩa message mà frontend gửi lên, ModelMessage là định nghĩa message mà model cần
//   async chat({
//     message,
//     model,
//     response,
//     chatId
//   }: {
//     message: UIMessage
//     model: string
//     response: Response
//     chatId: string
//   }): Promise<void> {
//     let chat = await this.chatRepo.getChatById(chatId)
//     console.log('chat', chat)

//     if (!chat) {
//       chat = await this.chatRepo.createChat(chatId)
//     }
//     const storedMessages = chat.messages.flatMap((m) => m.content as UIMessage[])

//     console.log('storedMessages', storedMessages)
//     this.messageRepo.saveMessage(chat.id, message)

//     const uiMessages: UIMessage[] = [...storedMessages, message]
//     const newMessagesIndex = uiMessages.length

//     console.log('ui message', uiMessages[0].parts)

//     console.log('index', newMessagesIndex)

//     const modelMessages: ModelMessage[] = await convertToModelMessages(uiMessages)

//     console.log('model messages', modelMessages)

//     const result = streamText({
//       model,
//       system: this.getSystemPrompt(),
//       messages: modelMessages,
//       tools: this.toolsService.getAllTools(),
//       experimental_transform: smoothStream({
//         delayInMs: 20,
//         chunking: 'line'
//       }),
//       providerOptions: {
//         openai: {
//           reasoningEffort: 'high',
//           reasoningSummary: 'detailed'
//         }
//       }
//     })
//     result.pipeUIMessageStreamToResponse(response, {
//       originalMessages: uiMessages,
//       onFinish: async ({ messages }) => {
//         const newMessages = messages.slice(newMessagesIndex)

//         if (newMessages.length === 0) return

//         await Promise.all(newMessages.map((msg) => this.messageRepo.saveMessage(chat.id, msg)))

//         await this.chatRepo.updateChat(chat.id, {
//           updatedAt: new Date()
//         })
//       }
//     })
//   }

//   private getSystemPrompt(): string {
//     return `You are a generic chat bot that can answer any questions, but also use the tools that we define to answer questions when needed. Always use the tools when you can, and never make up answers if you don't know something, just say you don't know.`
//   }

//   private generateSnippet(messages: MessageType[]): string {
//     if (!messages.length) return 'No messages yet'

//     const latestMessage = messages[0].content as unknown as UIMessageType
//     const textPart = latestMessage.parts.find((part) => part.type === 'text')

//     if (!textPart || !('text' in textPart)) return 'No messages yet'
//     const text = textPart.text

//     return text.length > 60 ? text.slice(0, 60) + '...' : text
//   }

//   async getChats(): Promise<GetChatsResType[]> {
//     const chats = await this.chatRepo.getChats()
//     return chats.map((chat) => ({
//       id: chat.id,
//       updatedAt: chat.updatedAt,
//       snippet: this.generateSnippet(chat.messages)
//     }))
//   }

//   async getChatById(chatId: string): Promise<ChatWithMessagesType | null> {
//     return await this.chatRepo.getChatById(chatId)
//   }

//   async getMessagesFromChat(chatId: string): Promise<UIMessageType[]> {
//     const result = await this.messageRepo.getMessagesFromChat(chatId)
//     return result.flatMap((message) => message.content as unknown as UIMessageType)
//   }
// }
