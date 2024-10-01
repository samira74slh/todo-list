import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerConfig } from './shared/config/swagger-config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const port = config.get('port');
  const origin = config.get('origin');
  // const logger = app.get(Logger);

  app.enableCors({
    allowedHeaders: ['content-type', '*'],
    origin: origin,
    credentials: true
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
        enableCircularCheck: true
      }
    })
  );

  app.setGlobalPrefix('api');

  SwaggerConfig(app);

  await app.listen(+port, async () => {
    console.log(`Application is running on: ${await app.getUrl()}`, 'listener');
  });
}
bootstrap();
