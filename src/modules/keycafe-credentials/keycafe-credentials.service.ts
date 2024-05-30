import { KeyCafeCredentialsRepositoryInterface } from './interfaces/keycafe-credentialls-repository.interface';

export class KeyCafeCredentialsService {
  constructor(
    private readonly keyCafeCredentialsRepository: KeyCafeCredentialsRepositoryInterface,
  ) {}

  async getCredential(company: string): Promise<any> {
    return await this.keyCafeCredentialsRepository.getCredential(company);
  }
}
