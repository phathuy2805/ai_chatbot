import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client'

export function isUniqueConstraintPrismaError(error: any): error is PrismaClientKnownRequestError {
  return error instanceof PrismaClientKnownRequestError && error.code === 'P2002'
}
