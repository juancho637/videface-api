import { KeyCafeCredentialDto } from './dto/keycafe-credentials.dto';
import { KeyCafeCredentialsRepositoryInterface } from './interfaces/keycafe-credentialls-repository.interface';

export class KeyCafeCredentialsService {
  constructor(
    private readonly keyCafeCredentialsRepository: KeyCafeCredentialsRepositoryInterface,
  ) {}

  async getCredential(companyName: string): Promise<KeyCafeCredentialDto> {
    return await this.keyCafeCredentialsRepository.getCredential(companyName);
  }
}
