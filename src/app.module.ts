import { Module } from '@nestjs/common';
import { ExampleModule } from './modules/example';

@Module({
  imports: [ExampleModule],
})
export class AppModule {}
