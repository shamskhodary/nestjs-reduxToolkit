import { Strategy, ExtractJwt } from 'passport-jwt/lib';
import { PassportStrategy } from '@nestjs/passport';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWTKEY,
    });
  }

  async validate(payload: { id: number; email: string }) {
    const user = await this.userService.findOneById(payload.id);

    if (!user)
      throw new UnauthorizedException(
        'You are not authorized to perform this operation',
      );
    delete user.password;
    return user;
  }
}
