import { KeyCafeCredentialDto } from '../dto/keycafe-credentials.dto';

export interface KeyCafeCredentialsRepositoryInterface {
  getCredential(companyName: string): Promise<KeyCafeCredentialDto>;
}
