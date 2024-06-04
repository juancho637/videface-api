import { Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { KeyCafeCredentialsRepositoryInterface } from './interfaces/keycafe-credentialls-repository.interface';
import { KeyCafeCredentialDto } from './dto/keycafe-credentials.dto';

export class KeyCafeCredentialsFireStoreRepository
  implements KeyCafeCredentialsRepositoryInterface
{
  constructor(
    @Inject('FIRESTORE') private readonly firestore: admin.firestore.Firestore,
  ) {}
  async getCredential(companyName: string): Promise<KeyCafeCredentialDto> {
    const credentials = await this.firestore
      .collection('companies')
      .doc(companyName)
      .collection('global')
      .doc('generalInfo')
      .get();

    return credentials.data().keyCafeAuth;
  }
}
