import { AuthService } from './auth.service';
import { Controller, Post, Headers } from '@nestjs/common';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { TokenDto } from './dto/token.dto';

@Controller('authorization')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async getToken(
    @Headers('Authorization') authHeader: string,
  ): Promise<TokenDto> {
    const authData = this.parseBasicAuth(authHeader);
    const user: AuthCredentialDto = {
      username: authData.username,
      password: authData.password,
    };
    return this.authService.getToken(user);
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
