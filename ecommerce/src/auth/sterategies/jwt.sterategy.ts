import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Sterategy, ExtractJwt } from 'passport-jwt';

export class JwtSterategy extends PassportStrategy(Sterategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET_KEY'),
    });
  }

  async validate(payload: any) {
    return { userId: payload.id, role: payload.role, mobile: payload.mobile };
  }
}
