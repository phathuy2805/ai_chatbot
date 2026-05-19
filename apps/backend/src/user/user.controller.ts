import { Body, Controller, Post } from '@nestjs/common'
import { ZodResponse } from 'nestjs-zod'
import { RegisterBodyDTO, RegisterResponseDTO } from 'src/user/user.dto'
import { UserService } from 'src/user/user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ZodResponse({ type: RegisterResponseDTO })
  register(@Body() body: RegisterBodyDTO) {
    console.log('data từ controller:', body)
    return this.userService.register(body)
  }
}
