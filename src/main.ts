import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // app.setGlobalPrefix('v1');
  app.useGlobalPipes(new ValidationPipe());
  // app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
  // app.use(express.static(path.join(__dirname, '..', 'public', 'dist')));
  app.use(bodyParser.urlencoded({ extended: true }));
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');






  const config = new DocumentBuilder()
    .setTitle('Consulting API documentation')
    .setDescription('Documentación detallada de la API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);


  await app.listen(port || 3000);
}
bootstrap();
