import { UIMessageSchema } from 'src/shared/models/UIMessage.model'
import z from 'zod'

export const MessageSchema = z.object({
  id: z.uuid(),
  chatId: z.uuid(),
  content: z.array(UIMessageSchema),
  createdAt: z.date()
})

export type MessageType = z.infer<typeof MessageSchema>
