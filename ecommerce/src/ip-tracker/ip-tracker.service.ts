import { Injectable } from '@nestjs/common';

@Injectable()
export class IpTrackerService {
  private readonly requestCount = 10;
  private readonly window_minute = 1;
  private readonly block_minute = 1;

  async track(ip: string) {
    const now = new Date();
    console.log(`ip: ${ip} send request in time : ${now}`);
  }
}
