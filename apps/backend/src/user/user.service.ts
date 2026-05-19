import { Injectable } from '@nestjs/common'
import { isUniqueConstraintPrismaError } from 'src/helper'
import { HashingService } from 'src/shared/services/hashing.service'
import { EmailAlreadyExistsException } from 'src/user/user.error'
import { RegisterBodyType } from 'src/user/user.model'
import { UserRepository } from 'src/user/user.repo'

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly hashingService: HashingService
  ) {}

  async register(body: RegisterBodyType) {
    try {
      console.log('data từ service:', body)
      const hashedPassword = await this.hashingService.hashPassword(body.password)
      console.log('Hash password từ service:', hashedPassword)
      const user = await this.userRepo.createUser({
        email: body.email,
        phoneNumber: body.phoneNumber,
        displayName: body.displayName,
        password: hashedPassword
      })
      console.log('User từ service:', user)
      return user
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw EmailAlreadyExistsException
      }
      throw error
    }
  }
}
