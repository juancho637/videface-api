import { Injectable } from '@nestjs/common';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { AuthResponseModel } from './models/auth-response.model';
import { TokenDto } from './dto/token.dto';
import axios from 'axios';

@Injectable()
export class AuthService {
  async getToken(user: AuthCredentialDto): Promise<TokenDto> {
    const { data } = await axios.post<AuthResponseModel>(
      'https://www.keycafe.com/v0/authorization',
      user,
    );
    return { token: data.token };
  }
}
