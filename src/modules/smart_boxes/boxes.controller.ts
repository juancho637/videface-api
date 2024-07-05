import { BoxesService } from './boxes.service';
import { paeseBaseAuthHelper } from '@common/helpers';
import { Controller, Post, Body, Headers } from '@nestjs/common';
import { SmartBoxesDto } from './dto/smartBoxes.dto';
import { SmartBoxesResponseModel } from './models/boxes-response.model';
import { AuthSmartBoxesDto } from './dto/auth-smartBoxes.dto';

@Controller('/organization')
export class BoxesController {
  constructor(private readonly boxesService: BoxesService) {}

  @Post('/boxes')
  async getCredencials(
    @Headers('Authorization') authHeader: string,
    @Body() smartBoxeskDto: SmartBoxesDto,
  ): Promise<SmartBoxesResponseModel> {
    const authData = paeseBaseAuthHelper(authHeader);
    const user: AuthSmartBoxesDto = {
      username: authData.username,
      password: authData.password,
    };
    return this.boxesService.getLockerStatus(user, smartBoxeskDto);
  }
}
