import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { Suggestion } from './models/suggestion.model';

@Module({
  imports: [SequelizeModule.forFeature([Suggestion])],
  providers: [AccountsService],
  controllers: [AccountsController],
})
export class AccountsModule {}
