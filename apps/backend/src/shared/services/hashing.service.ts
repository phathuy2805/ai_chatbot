import { Injectable } from '@nestjs/common'
import { hash } from 'bcrypt'

const saltOrRounds = 10

@Injectable()
export class HashingService {
  async hashPassword(password: string): Promise<string> {
    return hash(password, saltOrRounds)
  }
}
