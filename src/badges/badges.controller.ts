import { Controller, Get, Param } from '@nestjs/common';
import { BadgesService } from './badges.service';
import { Badge } from './models/badge.model';

@Controller()
export class BadgesController {
  constructor(private readonly badgesService: BadgesService) {}

  @Get('/badges/:account')
  async getBadgesByAccount(@Param('account') account): Promise<Badge[]> {
    return await this.badgesService.listByRecipient(account);
  }

  @Get('/badges/:account/following')
  async getSubscriptionsByAccount(@Param('account') account): Promise<Badge[]> {
    return await this.badgesService.listSubscriptionsByAccount(account);
  }
}
