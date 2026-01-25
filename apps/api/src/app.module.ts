import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobsController } from './jobs.controller';

@Module({
  imports: [],
  controllers: [AppController, JobsController],
  providers: [AppService],
})
export class AppModule {}
