import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { TransformInterceptor } from './transform.interceptor';
import setupSwagger from './swagger';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: '*',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());

  setupSwagger(app);

  const port = process.env.PORT;
  await app.listen(port);

  logger.log(`Application listening on port ${port}`);
}
bootstrap();
