import { Injectable } from '@nestjs/common'
import { RegisterBodyType } from 'src/user/user.model'
import { UserRepository } from 'src/user/user.repo'

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async register(body: RegisterBodyType) {
    try {
      const user = await this.userRepo.createUser({
        email: body.email,
        phoneNumber: body.phoneNumber,
        displayName: 'default',
        password: body.password
      })
      return user
    } catch (error) {}
  }
}
