import { NestFactory } from '@nestjs/core';
import { CommonModule } from './common.module';

async function bootstrap() {
  const app = await NestFactory.create(CommonModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
