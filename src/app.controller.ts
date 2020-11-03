import { Controller, Get } from '@nestjs/common';

const { name, version } = require('../package.json');

@Controller()
export class AppController {
  @Get()
  getVersion(): Object {
    return { name, version };
  }
}
