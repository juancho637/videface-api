import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth';
import { BoxesModule } from './modules/smart_boxes';
import { ConfigurationModule } from './modules/adapters/configuration';
import { FirestoreModule } from './modules/adapters/fire-store-db';
import { KeyCafeCredentialsModule } from './modules/keycafe-credentials';

@Module({
  imports: [
    ConfigurationModule,
    FirestoreModule,
    AuthModule,
    BoxesModule,
    KeyCafeCredentialsModule,
  ],
})
export class AppModule {}
