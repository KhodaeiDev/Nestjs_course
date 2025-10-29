import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CleanJob } from './jobs/cleanOtp.job';

@Module({
  providers: [TasksService, CleanJob],
})
export class TasksModule {}
