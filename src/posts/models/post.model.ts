import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Post extends Model<Post> {
  @Column
  author: string;

  @Column
  permlink: string;
}
