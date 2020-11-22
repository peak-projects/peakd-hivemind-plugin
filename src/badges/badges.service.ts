import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { prepare } from 'src/utils/strings';
import { Badge } from './models/badge.model';

// retrieve the badge assigned to an account (following the account and not ignored)
const BADGES_BY_RECIPIENT = `select badge.name
  , badge.created_at
  , badge.reputation
  , badge.followers
  , badge."following"
  , (coalesce(nullif(trim(badge.posting_json_metadata), ''), trim(badge.json_metadata)))::json->'profile'->'name' as title
from hive_follows f
join hive_accounts badge on badge.id = f.follower
join hive_accounts account on account.id = f."following"
left join hive_follows i on i.follower = account.id and i."following" = badge.id and i.state = 2
where badge."name" like 'badge-%'
  and f.state = 1
  and i.follower is null
  and account."name" = '{account}'`;

// retrieve an account badge subscriptions (badges followed by an account)
const SUBSCRIPTIONS_BY_ACCOUNT = `select badge.name
	, badge.created_at
	, badge.reputation
	, badge.followers
	, badge."following"
	, (coalesce(nullif(trim(badge.posting_json_metadata), ''), trim(badge.json_metadata)))::json->'profile'->'name' as title
from hive_follows f
join hive_accounts account on account.id = f.follower
join hive_accounts badge on badge.id = f."following"
where badge."name" like 'badge-%'
  and f.state = 1
  and account."name" = '{account}'`;

@Injectable()
export class BadgesService {
  constructor(private sequelize: Sequelize, @InjectModel(Badge) private badgeModel: typeof Badge) {}

  async listByRecipient(account: string): Promise<Badge[]> {
    const query = prepare(BADGES_BY_RECIPIENT, { account: account });
    return await this.sequelize.query(query, {
      model: Badge
    });
  }

  async listSubscriptionsByAccount(account: string): Promise<Badge[]> {
    const query = prepare(SUBSCRIPTIONS_BY_ACCOUNT, { account: account });
    return await this.sequelize.query(query, {
      model: Badge
    });
  }
}
