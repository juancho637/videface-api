import { Injectable } from '@nestjs/common';
import { SmartBoxesResponseModel } from './models/boxes-response.model';
import axios from 'axios';
import { SmartBoxesDto } from './dto/smartBoxes.dto';
import { AuthSmartBoxesDto } from './dto/auth-smartBoxes.dto';
import { BinResponseModel } from './models/bins-response.model';

@Injectable()
export class BoxesService {
  async getLockerStatus(
    user: AuthSmartBoxesDto,
    smartBoxeskDto: SmartBoxesDto,
  ): Promise<any> {
    const getDatalocker = await this.getSmartBoxes(user, smartBoxeskDto);
    const getAllLockers = await this.getBins(user, getDatalocker[0].id);
    const resultLockerStatus = getAllLockers.map((locker) => {
      const allLockersNewObj = {
        binNumber: locker.binNumber,
        idSmartBox: locker.box.id,
        idLocker: locker.id,
        lastStatusUpdate: locker.box.lastStatusUpdate,
        location: getDatalocker[0].location.name,
      };

      if (locker.key) {
        allLockersNewObj['Status'] = 'TAKEN';
        allLockersNewObj['key'] = locker.key;
      } else {
        allLockersNewObj['Status'] = 'AVAILABLE';
      }

      return allLockersNewObj;
    });

    return resultLockerStatus;
  }

  async getSmartBoxes(
    user: AuthSmartBoxesDto,
    smartBoxeskDto: SmartBoxesDto,
  ): Promise<SmartBoxesResponseModel> {
    const authHeader = `Basic ${Buffer.from(`${user.username}:${user.password}`).toString('base64')}`;
    const { data } = await axios.get<SmartBoxesResponseModel>(
      `${process.env.HOST_KEYCAFE}/box?organization=${smartBoxeskDto.organizationId}`,
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
    smartBins: number,
  ): Promise<BinResponseModel[]> {
    const authHeader = `Basic ${Buffer.from(`${user.username}:${user.password}`).toString('base64')}`;
    const { data } = await axios.get<BinResponseModel[]>(
      `${process.env.HOST_KEYCAFE}/bin?box=${smartBins}`,
      {
        headers: {
          Authorization: authHeader,
        },
      },
    );
    return data;
  }
}
