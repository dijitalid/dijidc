<<<<<<< HEAD
import 'dotenv/config';
=======
import "dotenv/config";
>>>>>>> 9bf91524 (fix(api): stabilize local env + ignore build artifacts)
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
