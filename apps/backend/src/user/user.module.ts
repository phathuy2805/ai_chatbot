import { Module } from '@nestjs/common'
import { UserRepository } from 'src/user/user.repo'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  providers: [UserService, UserRepository],
  controllers: [UserController]
})
export class UserModule {}
