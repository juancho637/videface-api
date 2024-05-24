import { Module } from '@nestjs/common';
import { ExampleModule } from './modules/example';
import { AuthModule } from './modules/auth';

@Module({
  imports: [ExampleModule, AuthModule],
})
export class AppModule {}
