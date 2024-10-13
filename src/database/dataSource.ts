import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  password: process.env.MYSQL_ROOT_PASSWORD,
  username: process.env.MYSQL_ROOT_USER,
  port: +process.env.MYSQL_PORT,
  migrations: ['dist/migrations/*.js'],
  synchronize: false
});
