import { Injectable } from '@nestjs/common'
import { isUniqueConstraintPrismaError } from 'src/helper'
import { EmailAlreadyExistsException } from 'src/routes/auth/auth.error'
import { RegisterBodyType } from 'src/routes/auth/auth.model'
import { AuthRepository } from 'src/routes/auth/auth.repo'
import { HashingService } from 'src/shared/services/hashing.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepo: AuthRepository,
    private readonly hashingService: HashingService
  ) {}

  async register(body: RegisterBodyType) {
    try {
      console.log('data từ service:', body)
      const hashedPassword = await this.hashingService.hashPassword(body.password)
      console.log('Hash password từ service:', hashedPassword)
      const auth = await this.authRepo.createAuth({
        email: body.email,
        phoneNumber: body.phoneNumber,
        displayName: body.displayName,
        password: hashedPassword
      })
      console.log('Auth từ service:', auth)
      return auth
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw EmailAlreadyExistsException
      }
      throw error
    }
  }
}
