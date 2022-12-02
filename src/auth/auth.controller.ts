import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserDto } from '../dto/users.dto';
import { AuthService } from './auth.service';
import { DoesUserExist } from '../guards/doesUserExist.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(DoesUserExist)
  @Post('signup')
  signup(@Body() dto: UserDto) {
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() dto) {
    return this.authService.login(dto);
  }
}
