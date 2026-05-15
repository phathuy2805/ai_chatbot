import z from 'zod'

export const MessageMetadataSchema = z.object({})

const TextUIPartSchema = z.object({
  type: z.literal('text'),
  text: z.string(),
  state: z.enum(['streaming', 'done']).optional()
})

const ReasoningUIPartSchema = z.object({
  type: z.literal('reasoning'),
  text: z.string(),
  state: z.enum(['streaming', 'done']).optional(),
  providerMetadata: z.record(z.string(), z.unknown()).optional()
})

const ToolUIPartSchema = z.object({
  type: z.string().startsWith('tool-'),
  toolCallId: z.string(),
  state: z.enum(['input-streaming', 'input-available', 'output-available', 'output-error']),
  input: z.unknown().optional(),
  output: z.unknown().optional(),
  errorText: z.string().optional(),
  providerExecuted: z.boolean().optional()
})

const SourceUrlUIPartSchema = z.object({
  type: z.literal('source-url'),
  sourceId: z.string(),
  url: z.string(),
  title: z.string().optional(),
  providerMetadata: z.record(z.string(), z.unknown()).optional()
})

const SourceDocumentUIPartSchema = z.object({
  type: z.literal('source-document'),
  sourceId: z.string(),
  mediaType: z.string(),
  title: z.string(),
  filename: z.string().optional(),
  providerMetadata: z.record(z.string(), z.unknown()).optional()
})

const FileUIPartSchema = z.object({
  type: z.literal('file'),
  mediaType: z.string(),
  filename: z.string().optional(),
  url: z.string()
})

const StepStartUIPartSchema = z.object({
  type: z.literal('step-start')
})

const MessagePartSchema = z.discriminatedUnion('type', [
  TextUIPartSchema,
  ReasoningUIPartSchema,
  SourceUrlUIPartSchema,
  SourceDocumentUIPartSchema,
  FileUIPartSchema,
  StepStartUIPartSchema
])

const UIMessagePartSchema = z.union([MessagePartSchema, ToolUIPartSchema])

export const UIMessageSchema = z.object({
  id: z.string(),
  role: z.enum(['system', 'user', 'assistant']),
  metadata: MessageMetadataSchema.optional(),
  parts: z.array(UIMessagePartSchema)
})

export type UIMessageType = z.infer<typeof UIMessageSchema>
export type MessagePartType = z.infer<typeof UIMessagePartSchema>
export type MessageMetadataType = z.infer<typeof MessageMetadataSchema>
