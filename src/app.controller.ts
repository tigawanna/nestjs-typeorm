import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
// import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  login(@Request() req) {
    return req.user;
  }
  // @UseGuards(LocalAuthGuard)
  @Get('protected')
  getProtectedHello(): string {
    return this.appService.getHello();
  }
}
