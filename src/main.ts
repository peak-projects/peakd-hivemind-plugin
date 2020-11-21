import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import compression from 'fastify-compress';
import helmet from 'fastify-helmet';
import * as fs from 'fs';
import { AppModule } from './app.module';

const packageJson = require('../package.json');
const version = packageJson?.version || 'dev';

declare const module: any;

async function bootstrap() {
  const httpsOptions = fs.existsSync('./secrets/private.pem') && fs.existsSync('./secrets/public.pem')
    ? {
      https: {
        key: fs.readFileSync('./secrets/private.pem'),
        cert: fs.readFileSync('./secrets/public.pem'),
      }
    }
    : {}

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ ...httpsOptions, logger: true, maxParamLength: 2000 })
  );

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  const options = new DocumentBuilder()
    .setTitle('PeakD Hivemind Plugin')
    .setDescription('A Node.js appplication to add additional API to Hive/Hivemind nodes')
    .setVersion(version)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.register(compression);
  app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });
  app.enableCors();

  const configService = app.get(ConfigService);
  const port = configService.get('port') || 3000;

  await app.listen(port, '0.0.0.0');
}
bootstrap();
