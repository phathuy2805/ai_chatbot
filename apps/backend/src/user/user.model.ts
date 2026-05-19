import z from 'zod'

export const UserSchema = z.object({
  id: z.uuid(),
  googleUserId: z.uuid().nullable(),
  email: z.email(),
  displayName: z.string().min(1).max(100),
  password: z.string().min(6).max(100),
  phoneNumber: z.string().min(1).max(50),
  avatarUrl: z.string().nullable(),
  status: z.string().default('active'),
  createdAt: z.date(),
  updatedAt: z.date(),
  lastLoginAt: z.date().nullable()
})

export const RegisterBodySchema = UserSchema.pick({
  email: true,
  password: true,
  displayName: true,
  phoneNumber: true
})
  .extend({
    confirmPassword: z.string().min(6).max(100)
  })
  .strict()
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Password and confirm password must match',
        path: ['confirmPassword']
      })
    }
  })

export const RegisterResponseSchema = UserSchema.omit({
  password: true
})

export type UserType = z.infer<typeof UserSchema>
export type RegisterBodyType = z.infer<typeof RegisterBodySchema>
export type RegisterResponseType = z.infer<typeof RegisterResponseSchema>
