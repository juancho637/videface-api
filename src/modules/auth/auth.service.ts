import { Injectable } from '@nestjs/common';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { AuthResponseModel } from './models/auth-response.model';
import { TokenDto } from './dto/token.dto';
import { OrganizationResponseModel } from './models/organization.dto';
import axios from 'axios';
import { CredentialDto } from './dto/credentials.dto';

@Injectable()
export class AuthService {
  async getToken(user: AuthCredentialDto): Promise<TokenDto> {
    const authHeader = `Basic ${Buffer.from(`${user.username}:${user.password}`).toString('base64')}`;
    const { data } = await axios.post<AuthResponseModel>(
      'https://www.keycafe.com/v0/authorization',
      {},
      {
        headers: {
          Authorization: authHeader,
        },
      },
    );
    return { token: data.token };
  }

  async getCredential(user: AuthCredentialDto): Promise<CredentialDto> {
    const getToken = await this.getToken(user);
    const authHeader = `Basic ${Buffer.from(`${user.username}:${user.password}`).toString('base64')}`;
    const { data } = await axios.get<OrganizationResponseModel>(
      'https://www.keycafe.com/v0/organization/current',
      {
        headers: {
          Authorization: authHeader,
        },
      },
    );
    return { id: data.id, name: data.name, token: getToken.token };
  }
}
