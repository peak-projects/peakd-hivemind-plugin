import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Suggestion extends Model<Suggestion> {
  @Column
  suggestion: string;
  @Column
  rank: number;
}
