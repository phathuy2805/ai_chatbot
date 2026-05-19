import { Module } from '@nestjs/common'
import { AuthRepository } from 'src/routes/auth/auth.repo'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  providers: [AuthService, AuthRepository],
  controllers: [AuthController]
})
export class AuthModule {}
