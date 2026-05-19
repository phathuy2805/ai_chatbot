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

export type UserType = z.infer<typeof UserSchema>
export type RegisterBodyType = z.infer<typeof RegisterBodySchema>
