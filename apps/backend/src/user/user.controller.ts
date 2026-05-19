import { Body, Controller, Post } from '@nestjs/common'
import { RegisterBodyDTO } from 'src/user/user.dto'
import { UserService } from 'src/user/user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('register')
  register(@Body() body: RegisterBodyDTO) {
    return this.userService.register(body)
  }
}
