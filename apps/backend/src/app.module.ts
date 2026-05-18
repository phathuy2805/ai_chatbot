import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ChatModule } from 'src/chat/chat.module'
import { SharedModule } from 'src/shared/shared.module'
import { UserModule } from './user/user.module';
import { UserService } from './user.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), SharedModule, ChatModule, UserModule],
  controllers: [],
  providers: [UserService]
})
export class AppModule {}
