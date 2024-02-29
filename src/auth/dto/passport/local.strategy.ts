import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../../auth.service.js';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // if strategy requires config pass it into super
    super();
  }

  async validate(username: string, password: string) {
    const user = await this.authService.validateUser({
      usernameOrEmail: username,
      password,
    });
    if (!user) {
      throw new UnauthorizedException('invalid credentials');
    }
    return user;
  }
}
