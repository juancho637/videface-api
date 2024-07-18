import { Body, Post, Headers, Controller, Delete, Param } from '@nestjs/common';
import { paeseBaseAuthHelper } from '@common/helpers';
import { AccessKeyService } from './access-key.service';
import { SendAccessKeyDto } from './dto';

@Controller('/organization')
export class AccessKeyController {
  constructor(private readonly accessKeyService: AccessKeyService) {}

  @Post('/access-key')
  async sendAccessKey(
    @Headers('Authorization') authHeader: string,
    @Body() sendAccessKeyDto: SendAccessKeyDto,
  ) {
    const authData = paeseBaseAuthHelper(authHeader);

    const user = {
      username: authData.username,
      password: authData.password,
    };

    return this.accessKeyService.sendAccessKey({
      user,
      sendAccessKeyData: sendAccessKeyDto,
    });
  }

  @Delete('/access-key/:accessKeyId')
  async deleteAccessKey(
    @Headers('Authorization') authHeader: string,
    @Param('accessKeyId') accessKeyId: string,
  ) {
    const authData = paeseBaseAuthHelper(authHeader);

    const user = {
      username: authData.username,
      password: authData.password,
    };

    return this.accessKeyService.deleteAccessKey({
      user,
      accessKeyId,
    });
  }
}
