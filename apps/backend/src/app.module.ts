import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ChatModule } from 'src/chat/chat.module'
import { SharedModule } from 'src/shared/shared.module'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), SharedModule, ChatModule],
  controllers: [],
  providers: []
})
export class AppModule {}
