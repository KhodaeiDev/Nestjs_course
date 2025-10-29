import { Module } from '@nestjs/common';
import { SmsService } from './sms.service';
import { SmsController } from './sms.controller';
import { BullModule } from '@nestjs/bull';
import { SmsProcess } from './processors/send-sms.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'sms-queue',
    }),
  ],
  controllers: [SmsController],
  providers: [SmsService, SmsProcess],
})
export class SmsModule {}
