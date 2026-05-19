import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/shared/services/prisma.service'
import { RegisterBodyType } from 'src/user/user.model'

Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(body: Omit<RegisterBodyType, 'confirmPassword'>) {
    return await this.prismaService.user.create({
      data: {
        email: body.email,
        password: body.password,
        displayName: body.displayName,
        phoneNumber: body.phoneNumber
      }
    })
  }
}
