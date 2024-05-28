import { Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigurationService } from '../configuration/configuration.service';
import { ConfigService } from '@nestjs/config';
import { ConfigurationType } from '../configuration/types/configuration.type';
import { FirebaseConfigType } from '../configuration/types/firebase-config.type';

@Module({
  providers: [
    {
      provide: 'FIRESTORE',
      inject: [ConfigurationService],
      useFactory: (configService: ConfigService<ConfigurationType>) => {
        const adminConfig = {
          credential: admin.credential.cert({
            projectId:
              configService.get<FirebaseConfigType>('firebase')
                .firebaseProjectId,
            clientEmail:
              configService.get<FirebaseConfigType>('firebase')
                .firebaseClientEmail,
            privateKey: configService
              .get<FirebaseConfigType>('firebase')
              .firebasePrivateKey.replace(/\\n/g, '\n'),
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
