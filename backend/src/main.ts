import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prefix = process.env.GLOBAL_PREFIX ?? 'api';

  app.setGlobalPrefix(prefix);

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization, Accept, X-Requested-With',
  });

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
