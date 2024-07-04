import { paeseBaseAuthHelper } from '@common/helpers';
import { AccessKeyService } from './access-key.service';
import { Body, Post, Headers } from '@nestjs/common';
import { SendAccessKeyDto } from './dto/send-access-key.dto';
import { AuthHeaderDto } from '@common/dtos';

export class AccessKeyController {
  constructor(private readonly accessKeyService: AccessKeyService) {}

  @Post('/access-key')
  async getLockerStatus(
    @Headers('Authorization') { authHeader }: AuthHeaderDto,
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
}
