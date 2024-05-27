import { AuthService } from './auth.service';
import { Controller, Post, Headers } from '@nestjs/common';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { CredentialDto } from './dto/credentials.dto';

@Controller('/authorization')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/keycafe')
  async getCredencials(
    @Headers('Authorization') authHeader: string,
  ): Promise<CredentialDto> {
    const authData = this.parseBasicAuth(authHeader);
    const user: AuthCredentialDto = {
      username: authData.username,
      password: authData.password,
    };
    return this.authService.getCredential(user);
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
