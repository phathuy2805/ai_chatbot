import z from 'zod'

export const UserSchema = z.object({
  id: z.uuid(),
  googleUserId: z.uuid(),
  email: z.email(),
  displayName: z.string(),
  password: z.string().max(500),
  phoneNumber: z.string().max(50),
  avatarUrl: z.string().optional(),
  status: z.string().default('active'),
  createdAt: z.date(),
  updatedAt: z.date(),
  lastLoginAt: z.date().optional()
})
