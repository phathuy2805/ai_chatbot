import { UnprocessableEntityException } from '@nestjs/common'
import { createZodValidationPipe, ZodValidationPipe } from 'nestjs-zod'
import { ZodError as ZodErrorV4 } from 'zod'

export const CustomZodValidationPipe: typeof ZodValidationPipe = createZodValidationPipe({
  // provide custom validation exception factory
  createValidationException: (error: unknown) => {
    return new UnprocessableEntityException(
      (error as ZodErrorV4).issues.map((issue) => {
        return {
          ...issue,
          path: issue.path.join('.')
        }
      })
    )
  }
})
