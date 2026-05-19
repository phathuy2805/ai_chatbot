import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/shared/services/prisma.service'
import { RegisterBodyType, UserType } from 'src/user/user.model'

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(body: Omit<RegisterBodyType, 'confirmPassword'>): Promise<Omit<UserType, 'password'>> {
    console.log('data từ repo:', body)
    const user = await this.prismaService.user.create({
      data: {
        email: body.email,
        password: body.password,
        displayName: body.displayName,
        phoneNumber: body.phoneNumber
      },
      omit: {
        password: true
      }
    })
    console.log('User từ repo:', user)
    return user
  }
}
