import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

@Module({ imports: [AuthModule] })
export class AuthModule {
  providers: [AuthService];
}
