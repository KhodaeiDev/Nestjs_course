import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggresMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log(
      `${new Date().toISOString()} - ${req.method} - ${req.originalUrl}`,
    );
    next();
  }
}
