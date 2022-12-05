import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { getUser } from 'src/auth/decorator/get-user.decorator';
import { User } from 'src/entities/users.entity';

@Controller('users')
export class UsersController {
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  myAccount(@getUser() user: User) {
    return user;
  }
}
