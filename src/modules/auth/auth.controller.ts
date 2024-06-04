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

  private parseBasicAuth(authHeader: string): {
    username: string;
    password: string;
  } {
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString(
      'ascii',
    );
    const [username, password] = credentials.split(':');
    return { username, password };
  }
}
