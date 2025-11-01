import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  sum(a: number, b: number) {
    return a + b;
  }
  getHello(): string {
    return 'Hello World!';
  }
}
