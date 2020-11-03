import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Badge extends Model<Badge> {
  @Column
  name: string;
}
