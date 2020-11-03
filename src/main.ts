import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import compression from 'fastify-compress';
import helmet from 'fastify-helmet';
import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true })
  );

  const options = new DocumentBuilder()
    .setTitle('PeakD Hivemind Plugin')
    .setDescription('A Node.js appplication to add additional API to Hive/Hivemind nodes')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.register(compression);
  app.register(helmet);
  app.enableCors();

  const configService = app.get(ConfigService);
  await app.listen(configService.get('port'), '0.0.0.0');

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
