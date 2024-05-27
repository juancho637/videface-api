import { Injectable } from '@nestjs/common';
import { SmartBoxesResponseModel } from './models/boxes-response.model';
import axios from 'axios';
import { SmartBoxesDto } from './dto/smartBoxes.dto';
import { AuthCredentialDto } from '../auth/dto/auth-credentials.dto';

@Injectable()
export class BoxesService {
  async getSmartBoxes(
    user: AuthCredentialDto,
    smartBoxeskDto: SmartBoxesDto,
  ): Promise<any> {
    console.log('Request', smartBoxeskDto);
    const authHeader = `Basic ${Buffer.from(`${user.username}:${user.password}`).toString('base64')}`;
    const { data } = await axios.get<SmartBoxesResponseModel>(
      `https://www.keycafe.com/v0/box?organization=${smartBoxeskDto.organizationId}`,
      {
        headers: {
          Authorization: authHeader,
        },
      },
    );
    return data;
  }
}
