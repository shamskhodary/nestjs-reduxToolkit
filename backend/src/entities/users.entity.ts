import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Post } from './posts.entity';

@Table
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.ENUM,
    values: ['male', 'female'],
    allowNull: false,
  })
  gender: string;

  @Column({
    type: DataType.TEXT,
    defaultValue: 'https://i.stack.imgur.com/l60Hf.png',
    allowNull: true,
  })
  image: string;

  @HasMany(() => Post)
  posts: Post[];
}
