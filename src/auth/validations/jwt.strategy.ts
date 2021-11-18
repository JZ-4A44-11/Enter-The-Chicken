import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

type Payload = {
  sub: string;
  username: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('AUTH').secret,
      usernameField: 'email',
    });
  }

  async validate(
    payload: Payload,
  ): Promise<{ userId: string; username: string }> {
    return { userId: payload.sub, username: payload.username };
  }
}
