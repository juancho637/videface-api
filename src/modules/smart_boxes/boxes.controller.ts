import { BoxesService } from './boxes.service';
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
    const authData = this.parseBasicAuth(authHeader);
    const user: AuthSmartBoxesDto = {
      username: authData.username,
      password: authData.password,
    };
    return this.boxesService.getLockerStatus(user, smartBoxeskDto);
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
