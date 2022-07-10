import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception.filter';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1');
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(cookieParser());
  app.use(
    cors({
      origin: true,
    }),
  );
  await app.listen(8024);
}
bootstrap();
