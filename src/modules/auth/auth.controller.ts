import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CredentialDto } from './dto/credentials.dto';
import { RequestCredentialDto } from './dto/request-credentials.dto';

@Controller('/authorization')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/keycafe')
  async getCredencials(
    @Body() authorizationKeyCafeDto: RequestCredentialDto,
  ): Promise<CredentialDto> {
    return this.authService.getCredential(authorizationKeyCafeDto);
  }
}
