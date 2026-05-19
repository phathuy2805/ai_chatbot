import { Global, Module } from '@nestjs/common'
import { HashingService } from 'src/shared/services/hashing.service'
import { PrismaService } from 'src/shared/services/prisma.service'

@Global()
@Module({
  providers: [PrismaService, HashingService],
  exports: [PrismaService, HashingService]
})
export class SharedModule {}
