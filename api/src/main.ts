import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    cors({
      // origin: 'http://localhost:3000',
      origin: '*',
      credentials: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    }),
  );

  const port = process.env.PORT || 3001;
  const host = '0.0.0.0';
  await app.listen(port, host);
}
bootstrap();
