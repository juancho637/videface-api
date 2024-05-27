import { Module } from '@nestjs/common';
import { ExampleModule } from './modules/example';
import { AuthModule } from './modules/auth';
import { BoxesModule } from './modules/smart_boxes';

@Module({
  imports: [ExampleModule, AuthModule, BoxesModule],
})
export class AppModule {}
