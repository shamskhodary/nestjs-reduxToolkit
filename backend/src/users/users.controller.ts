import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { getUser } from 'src/auth/decorator/get-user.decorator';
import { User } from 'src/entities/users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  myAccount(@getUser() user: User) {
    return user;
  }

  @Get(':id')
  findUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOneById(id);
  }
}
