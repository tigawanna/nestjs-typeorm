import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser({ usernameOrEmail, password }: SignInDto) {
    const user = await this.userService.findByEmailOrUsernae(usernameOrEmail);
    if (!user) {
      return null;
    }
    if (await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
  }
  async signupUser(user: CreateUserDto) {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    await this.userService.create(user);
    const { password, ...result } = user;
    const payload = {
      email: result.email,
      sub: {
        id: result.id,
        username: result.username,
        isActive: result.isActive,
      },
    };
    return {
      ...user,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async signinUser({ usernameOrEmail, password }: SignInDto) {
    const user = await this.userService.findByEmailOrUsernae(usernameOrEmail);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      const payload = {
        email: result.email,
        sub: {
          id: result.id,
          username: result.username,
          isActive: result.isActive,
        },
      };
      return {
        ...result,
        access_token: await this.jwtService.signAsync(payload),
      };
    } else {
      throw new NotFoundException('incorrect password');
    }
  }
}
