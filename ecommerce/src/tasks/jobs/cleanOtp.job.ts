import { Injectable } from '@nestjs/common';

@Injectable()
export class CleanJob {
  cleanJob() {
    console.log('cleaning ...');
  }
}
