import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth';
import { BoxesModule } from './modules/smart_boxes';
import { ConfigurationModule } from './modules/adapters/configuration/configuration.module';
import { FirestoreModule } from './modules/adapters/fire-store-db/fire-store-db.module';

@Module({
  imports: [ConfigurationModule, AuthModule, BoxesModule, FirestoreModule],
})
export class AppModule {}
