import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  /**
   * Global CORS
   */
  app.enableCors()

  /**
   * Register ValidationPipe as global
   */
  app.useGlobalPipes(new ValidationPipe())

  /**
   * Swagger Configuration
   */
  const options = new DocumentBuilder()
    .setTitle('Studying Nest.js')
    .setDescription('Studying Nestj.js API description')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)

  await app.listen(3000)
}

bootstrap()
