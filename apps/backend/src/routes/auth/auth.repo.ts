import { Injectable } from '@nestjs/common'
import { RegisterBodyType, UserType } from 'src/routes/auth/auth.model'
import { PrismaService } from 'src/shared/services/prisma.service'

@Injectable()
export class AuthRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createAuth(body: Omit<RegisterBodyType, 'confirmPassword'>): Promise<Omit<UserType, 'password'>> {
    console.log('data từ repo:', body)
    const auth = await this.prismaService.user.create({
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
    console.log('Auth từ repo:', auth)
    return auth
  }
}
