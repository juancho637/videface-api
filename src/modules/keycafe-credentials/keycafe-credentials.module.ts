import { Module } from '@nestjs/common';
import { FirestoreModule } from '../adapters/fire-store-db';
import { KeyCafeCredentialsController } from './keycafe-credentials.controller';
import { KeyCafeCredentialsService } from './keycafe-credentials.service';
import { KeyCafeCredentialsRepositoryInterface } from './interfaces';
import { KeyCafeCredentialsFireStoreRepository } from './keycafe-credentials-firestore.repository';

@Module({
  imports: [FirestoreModule],
  controllers: [KeyCafeCredentialsController],
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
})
export class KeyCafeCredentialsModule {}
