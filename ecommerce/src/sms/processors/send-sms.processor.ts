import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('sms-queue')
export class SmsProcess {
  @Process('send-sms')
  async handleSms(job: Job<{ mobile: string; message: string }>) {
    console.log(`sending sms to ${job.data.mobile}`);

    // let number = Math.random();
    // console.log(number);

    // if (number > 0.5) {
    //   console.log('Eror💥💥💥');
    //   throw new Error('Errroooor');
    // }

    console.log('Sending Successfuly✌️⭐');

    return true;
  }
}
