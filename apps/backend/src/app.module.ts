import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
// import { ChatModule } from 'src/chat/chat.module'
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { ZodSerializerInterceptor } from 'nestjs-zod'
import { HttpExceptionFilter } from 'src/shared/filters/http-exception.filter'
import { CustomZodValidationPipe } from 'src/shared/pipes/custom-zod-validation.pipe'
import { SharedModule } from 'src/shared/shared.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), SharedModule, UserModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      //Cần đc set up để có thể validate đc body của response
      useClass: ZodSerializerInterceptor
    },
    {
      provide: APP_PIPE,
      //Cần đc set up để có thể validate đc body, query, params của request
      useClass: CustomZodValidationPipe
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    }
  ]
})
export class AppModule {}
