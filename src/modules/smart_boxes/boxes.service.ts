import { Injectable } from '@nestjs/common';
import { SmartBoxesResponseModel } from './models/boxes-response.model';
import axios from 'axios';
import { SmartBoxesDto } from './dto/smartBoxes.dto';
import { SmartBinsDto } from './dto/smartBins.dto';
import { AuthSmartBoxesDto } from './dto/auth-smartBoxes.dto';

@Injectable()
export class BoxesService {
  async getSmartBoxes(
    user: AuthSmartBoxesDto,
    smartBoxeskDto: SmartBoxesDto,
  ): Promise<SmartBoxesResponseModel> {
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

  async getBins(
    user: AuthSmartBoxesDto,
    smartBinsDto: SmartBinsDto,
  ): Promise<SmartBoxesResponseModel> {
    const authHeader = `Basic ${Buffer.from(`${user.username}:${user.password}`).toString('base64')}`;
    const { data } = await axios.get<SmartBoxesResponseModel>(
      `https://www.keycafe.com/v0/bin?box=${smartBinsDto.binsId}`,
      {
        headers: {
          Authorization: authHeader,
        },
      },
    );
    return data;
  }
}
