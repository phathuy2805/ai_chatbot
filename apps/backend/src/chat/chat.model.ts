import { MessageSchema } from 'src/shared/models/shared-message.model'
import { UIMessageSchema } from 'src/shared/models/UIMessage.model'
import { z } from 'zod'

export const ChatSchema = z.object({
  id: z.uuid(),
  updatedAt: z.date()
})

export const ChatWithMessagesSchema = ChatSchema.extend({
  messages: z.array(MessageSchema)
})

export const GetChatsResSchema = z.object({
  id: z.uuid(),
  updatedAt: z.date(),
  snippet: z.string()
})

export const GetMessagesResSchema = z.array(UIMessageSchema)

export type ChatType = z.infer<typeof ChatSchema>
export type ChatWithMessagesType = z.infer<typeof ChatWithMessagesSchema>
export type GetChatsResType = z.infer<typeof GetChatsResSchema>
export type GetMessagesResType = z.infer<typeof GetMessagesResSchema>
