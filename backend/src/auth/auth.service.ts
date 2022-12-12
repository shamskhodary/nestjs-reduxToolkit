import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserDto } from '../dto/users.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private usersService: UsersService,
    private configService: ConfigService,
  ) {}
  async signup(dto: UserDto): Promise<object> {
    const hash = await this.hashPassword(dto.password);

    try {
      const newUser = await this.usersService.create({
        ...dto,
        password: hash,
      });

      newUser.password = '';
      const token = await this.generateToken(newUser.id, newUser.email);

      return {
        data: newUser,
        token: token,
        message: 'User is signed up successfully',
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(dto: { email: string; password: string }): Promise<object> {
    const user = await this.usersService.findOneByEmail(dto.email);
    if (!user) throw new ForbiddenException('User does not exist');

    const match = await this.comparePassword(dto.password, user.password);
    if (!match) throw new ForbiddenException('Password is incorrect');
    try {
      const token = await this.generateToken(user.id, user.email);
      user.password = '';
      return { user, token, message: 'User is logged in successfully' };
    } catch (error) {
      throw new Error(error);
    }
  }

  private async hashPassword(password): Promise<string> {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  private async comparePassword(password, dbPassword): Promise<string> {
    const match = await bcrypt.compare(password, dbPassword);
    return match;
  }

  private async generateToken(userId: number, email: string): Promise<string> {
    const payload = { id: userId, email };
    const secret = this.configService.get('JWTKEY');
    const token = await this.jwt.signAsync(payload, { secret: secret });

    return token;
  }
}
