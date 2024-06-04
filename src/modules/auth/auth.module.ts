import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { KeyCafeCredentialsModule } from '../keycafe-credentials/keycafe-credentials.module';

@Module({
  imports: [KeyCafeCredentialsModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
