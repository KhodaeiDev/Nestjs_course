import { Injectable } from '@nestjs/common';
import { CleanJob } from './jobs/cleanOtp.job';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  constructor(private readonly cleanUpJob: CleanJob) {}

  // @Cron('* * * * *')
  cleanUp() {
    this.cleanUpJob.cleanJob();
  }
}
