import { createZodDto } from 'nestjs-zod'
import { RegisterBodySchema, RegisterResponseSchema } from 'src/user/user.model'

export class RegisterBodyDTO extends createZodDto(RegisterBodySchema) {}
export class RegisterResponseDTO extends createZodDto(RegisterResponseSchema) {}
