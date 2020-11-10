import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { prepare } from 'src/utils/strings';
import { Suggestion } from './models/suggestion.model';

// retrieve the badge assigned to an account (following the account and not ignored)
const SUGGESTIONS_BY_ACCOUNT = `
select suggested."name" as suggestion
     , main.score
     , (log(main.score * 100) + (0.5 * main.score)) * log(1500000 / suggested.followers) "rank"
from (
	select a."name"
		 , suggestion."following"
		 , count(*)::decimal / max(count(*)) OVER (PARTITION BY a."name") as score
	from hive_accounts a
	join hive_follows base on base.follower = a.id and base.state = 1
	join hive_follows suggestion on suggestion.follower = base."following" and suggestion.state = 1
	left join hive_follows excluded on excluded.follower = a.id and excluded."following" = suggestion."following" and excluded.state > 0
	where excluded."following" is null
	and a.id != suggestion."following"
	and a."name" = '{account}'
	group by a."name", suggestion."following"
) main
join hive_accounts suggested on suggested.id = main."following"
order by "rank" desc
limit {limit}
offset {offset}
`;

const SUGGESTIONS_PAGE_SIZE = 50;

@Injectable()
export class AccountsService {
  constructor(private sequelize: Sequelize, @InjectModel(Suggestion) private suggestionModel: typeof Suggestion) {}

  async suggestionsByAccount(account: string, page: number = 0): Promise<Suggestion[]> {
    const query = prepare(SUGGESTIONS_BY_ACCOUNT, {
      account: account,
      offset: page * SUGGESTIONS_PAGE_SIZE,
      limit: SUGGESTIONS_PAGE_SIZE
    });
    return await this.sequelize.query(query, {
      model: Suggestion
    });
  }
}
