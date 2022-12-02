import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class DoesUserExist implements CanActivate {
  constructor(private usersService: UsersService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request): Promise<any> {
    const userExist = await this.usersService.findOneByEmail(
      request.body.email,
    );

    if (userExist) throw new ForbiddenException('This email already exists');

    const usernameExist = await this.usersService.findOneByUsername(
      request.body.username,
    );

    if (usernameExist)
      throw new ForbiddenException('This username already exists');
    return true;
  }
}
