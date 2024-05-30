import { Controller, Get } from '@nestjs/common';
import { KeyCafeCredentialsService } from './keycafe-credentials.service';

@Controller('/keycafe-credentials')
export class KeyCafeCredentialsController {
  constructor(
    private readonly keyCafeCredentialsService: KeyCafeCredentialsService,
  ) {}

  @Get('/credentials')
  async getCredential(): Promise<any> {
    return await this.keyCafeCredentialsService.getCredential('rac4less');
  }
}
