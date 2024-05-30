import { Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { KeyCafeCredentialsRepositoryInterface } from './interfaces/keycafe-credentialls-repository.interface';

export class KeyCafeCredentialsFireStoreRepository
  implements KeyCafeCredentialsRepositoryInterface
{
  constructor(
    @Inject('FIRESTORE') private readonly firestore: admin.firestore.Firestore,
  ) {}
  async getCredential(company: string): Promise<any> {
    const credentials = await this.firestore
      .collection('companies')
      .doc(company)
      .collection('global')
      .doc('generalInfo')
      .get();

    return credentials.data().keyCafeAuth;
  }
}
