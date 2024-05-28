export interface KeyCafeCredentialsRepositoryInterface {
  getCredential(company: string): Promise<any>;
}
