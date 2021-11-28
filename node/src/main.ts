import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidateInputPipe } from './core/validate.pipe';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = new DocumentBuilder()
    .setTitle('Project')
    .setDescription('API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer('/api/v1')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidateInputPipe());
  app.use(helmet());

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
