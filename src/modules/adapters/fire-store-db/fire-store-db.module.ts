import { Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigurationModule, ConfigurationService } from '../configuration';

@Module({
  imports: [ConfigurationModule],
  providers: [
    {
      provide: 'FIRESTORE',
      inject: [ConfigurationService],
      useFactory: async (configurationService: ConfigurationService) => {
        const firebaseConfig = configurationService.getConfig().firebase;

        const adminConfig = {
          credential: admin.credential.cert({
            projectId: firebaseConfig.firebaseProjectId,
            clientEmail: firebaseConfig.firebaseClientEmail,
            privateKey: firebaseConfig.firebasePrivateKey.replace(/\\n/g, '\n'),
          }),
        };

        admin.initializeApp(adminConfig);

        return admin.firestore();
      },
    },
  ],
  exports: ['FIRESTORE'],
})
export class FirestoreModule {}
