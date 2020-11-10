import { Controller, Get, Param } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { Suggestion } from './models/suggestion.model';

@Controller()
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get('/suggestions/:account')
  async getSuggestionsByAccount(@Param('account') account): Promise<Suggestion[]> {
    return await this.accountsService.suggestionsByAccount(account);
  }
}
