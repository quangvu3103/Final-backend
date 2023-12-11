/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes (new ValidationPipe())
  app.useWebSocketAdapter(new IoAdapter(app));  
  const config = new DocumentBuilder()
  .setTitle('MeLon Pet Shop')
  .setDescription('')
  .setVersion('1.0')
  .addTag('')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    },
    'Jwt-auth', 
  )
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors({
    allowedHeaders: '*',
    credentials: true,
    origin: '*',
  })
  await app.listen(4000);
}
bootstrap();
