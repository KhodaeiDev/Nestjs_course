import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { IpTracker } from './entities/ip-tracker.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class IpTrackerService {
  private readonly MAX_REQUEST = 10;
  private readonly WINDOW_MINUTE = 1;
  private readonly BLOCK_MINUTE = 1;
  private readonly TEHRAN_TIME = 3.5;

  constructor(
    @InjectRepository(IpTracker)
    private readonly ipTrackRepository: Repository<IpTracker>,
  ) {}

  async track(ip: string) {
    // Get time and tehran TimeZone
    const now = new Date();
    const nowTh = new Date(now.getTime() + this.TEHRAN_TIME * 60 * 60 * 1000);

    // Find Record
    const record = await this.ipTrackRepository.findOne({ where: { ip } });

    // Block Check
    if (record?.isBlocked && record?.blockUtil >= nowTh) {
      throw new HttpException(
        {
          statusCode: HttpStatus.TOO_MANY_REQUESTS,
          error: 'Too Many Request',
          message: `شما برای مدت ${this.BLOCK_MINUTE} دقیقه محدود شده اید`,
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
    // Create Record
    if (!record) {
      const newRecord = this.ipTrackRepository.create({
        ip,
        windowStart: now,
        requestCount: 1,
        isBlocked: false,
        blockUtil: null,
      });

      await this.ipTrackRepository.save(newRecord);
      return;
    }

    // End Record Time After 1 min
    const windowEnd = new Date(
      record.windowStart.getTime() +
        this.WINDOW_MINUTE * 60 * 1000 +
        this.TEHRAN_TIME * 60 * 60 * 1000,
    );

    // Check Record for reset Or add to Request Count and Block Condition
    if (nowTh > windowEnd) {
      record.windowStart = now;
      record.requestCount = 1;
      record.blockUtil = null;
      record.isBlocked = false;
    } else {
      record.requestCount += 1;
      if (record.requestCount >= this.MAX_REQUEST) {
        record.isBlocked = true;
        record.blockUtil = new Date(
          nowTh.getTime() + this.BLOCK_MINUTE * 60 * 1000,
        );
      }
    }
    await this.ipTrackRepository.save(record);
  }
}
