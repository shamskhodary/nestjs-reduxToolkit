import { Strategy, ExtractJwt } from 'passport-jwt/lib';
import { PassportStrategy } from '@nestjs/passport';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService, configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWTKEY'),
    });
  }

  async validate(payload: { id: number; email: string }) {
    const user = await this.userService.findOneById(payload.id);

    if (!user)
      throw new UnauthorizedException(
        'You are not authorized to perform this operation',
      );

    return user;
  }
}
