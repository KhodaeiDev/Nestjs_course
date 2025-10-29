import { Body, Controller, Post } from '@nestjs/common';
import { SmsService } from './sms.service';
import { SensSmsDto } from './dto/sendsms.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Public()
@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Post('send')
  async sendSms(@Body() sendSmsDto: SensSmsDto) {
    await this.smsService.sendSms(sendSmsDto);
    return 'Ok';
  }
}
