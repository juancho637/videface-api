import { Module } from '@nestjs/common';
import { BoxesController } from './boxes.controller';
import { BoxesService } from './boxes.service';

@Module({
  imports: [],
  controllers: [BoxesController],
  providers: [BoxesService],
})
export class BoxesModule {}
