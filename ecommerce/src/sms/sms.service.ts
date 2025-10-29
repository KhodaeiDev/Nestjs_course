import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { SensSmsDto } from './dto/sendsms.dto';

@Injectable()
export class SmsService {
  constructor(
    @InjectQueue('sms-queue')
    private smsQueue: Queue,
  ) {}

  async sendSms(sendSmsDto: SensSmsDto) {
    let { mobiles, text } = sendSmsDto;

    mobiles.forEach((mobile, index) => {
      this.smsQueue.add(
        'send-sms',
        { mobile, message: text },
        {
          // attempts: 3,
          // backoff: 5000,
          delay: (index + 1) * 5000,
          removeOnComplete: true,
        },
      );
    });
  }
}
