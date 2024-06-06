import { Injectable } from '@nestjs/common';
import { AuthResponseModel } from './models/auth-response.model';
import { TokenDto } from './dto/token.dto';
import { OrganizationResponseModel } from './models/organization.model';
import axios from 'axios';
import { CredentialDto } from './dto/credentials.dto';
import { KeyCafeCredentialsService } from '../keycafe-credentials/keycafe-credentials.service';
import { RequestCredentialDto } from './dto/request-credentials.dto';
import { KeyCafeCredentialDto } from '../keycafe-credentials/dto/keycafe-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly keyCafeCredentialsService: KeyCafeCredentialsService,
  ) {}
  async getToken(credential: KeyCafeCredentialDto): Promise<TokenDto> {
    const authHeader = `Basic ${Buffer.from(`${credential.email}:${credential.pass}`).toString('base64')}`;
    const { data } = await axios.post<AuthResponseModel>(
      `${process.env.HOST_KEYCAFE}/authorization`,
      {},
      {
        headers: {
          Authorization: authHeader,
        },
      },
    );
    return { token: data.token };
  }

  async getCredential(
    authorizationKeyCafeDto: RequestCredentialDto,
  ): Promise<CredentialDto> {
    const credential = await this.keyCafeCredentialsService.getCredential(
      authorizationKeyCafeDto.companyName,
    );
    const getToken = await this.getToken(credential);
    const authHeader = `Basic ${Buffer.from(`${credential.email}:${credential.pass}`).toString('base64')}`;
    const { data } = await axios.get<OrganizationResponseModel>(
      `${process.env.HOST_KEYCAFE}/organization/current`,
      {
        headers: {
          Authorization: authHeader,
        },
      },
    );
    return {
      organizationId: data.id,
      name: data.name,
      email: `${credential.email}/token`,
      token: getToken.token,
    };
  }
}
