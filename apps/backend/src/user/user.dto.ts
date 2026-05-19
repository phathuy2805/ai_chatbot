import { createZodDto } from 'nestjs-zod'
import { RegisterBodySchema } from 'src/user/user.model'

export class RegisterBodyDTO extends createZodDto(RegisterBodySchema) {}
