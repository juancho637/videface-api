import { Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { KeyCafeCredentialsRepositoryInterface } from './interfaces/keycafe-credentialls-repository.interface';

export class KeyCafeCredentialsFireStoreRepository
  implements KeyCafeCredentialsRepositoryInterface
{
  constructor(@Inject('FIRESTORE') private readonly firestore: typeof admin) {}
  getCredential(company: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
