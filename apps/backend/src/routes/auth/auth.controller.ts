import { Body, Controller, Post } from '@nestjs/common'
import { ZodResponse } from 'nestjs-zod'
import { RegisterBodyDTO, RegisterResponseDTO } from 'src/routes/auth/auth.dto'
import { AuthService } from 'src/routes/auth/auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ZodResponse({ type: RegisterResponseDTO })
  register(@Body() body: RegisterBodyDTO) {
    console.log('data từ controller:', body)
    return this.authService.register(body)
  }

  @Post('login')
  login(@Body() body: any) {
    return this.authService.login(body)
  }
}
