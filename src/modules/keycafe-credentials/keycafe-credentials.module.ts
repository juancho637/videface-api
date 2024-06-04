import { Module } from '@nestjs/common';
import { FirestoreModule } from '../adapters/fire-store-db';
import { KeyCafeCredentialsService } from './keycafe-credentials.service';
import { KeyCafeCredentialsRepositoryInterface } from './interfaces';
import { KeyCafeCredentialsFireStoreRepository } from './keycafe-credentials-firestore.repository';

@Module({
  imports: [FirestoreModule],
  providers: [
    {
      provide: 'KeyCafeCredentialsRepository',
      useClass: KeyCafeCredentialsFireStoreRepository,
    },
    {
      inject: ['KeyCafeCredentialsRepository'],
      provide: KeyCafeCredentialsService,
      useFactory: (firestore: KeyCafeCredentialsRepositoryInterface) => {
        return new KeyCafeCredentialsService(firestore);
      },
    },
  ],
  exports: [KeyCafeCredentialsService],
})
export class KeyCafeCredentialsModule {}
