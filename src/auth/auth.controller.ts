import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SignInDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body(ValidationPipe) signupDto: CreateUserDto) {
    await this.authService.signupUser(signupDto);
  }
  @Post('signin')
  async signin(@Body(ValidationPipe) signinDto: SignInDto) {
    await this.authService.signinUser(signinDto);
  }
}
