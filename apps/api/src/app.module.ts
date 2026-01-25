import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobsController } from './jobs.controller';
import { RedisController } from './redis.controller';

@Module({
  imports: [],
  controllers: [AppController, JobsController, RedisController],
  providers: [AppService],
})
export class AppModule {}
