import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly exampleService: AuthService) {}

  @Get()
  getHello(): string {
    return this.exampleService.getHello();
  }
}
