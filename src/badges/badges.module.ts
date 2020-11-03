import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Badge } from './models/badge.model';
import { BadgesController } from './badges.controller';
import { BadgesService } from './badges.service';

@Module({
  imports: [SequelizeModule.forFeature([Badge])],
  providers: [BadgesService],
  controllers: [BadgesController],
})
export class BadgesModule {}
