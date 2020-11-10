import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class HivePost extends Model<HivePost> {
  @Column
  author: string;

  @Column
  permlink: string;
}
