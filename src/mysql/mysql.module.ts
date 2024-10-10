import { Global, Module } from '@nestjs/common';
import { MysqlModule } from 'nest-mysql';
import * as process from 'node:process';

@Global()
@Module({
  imports: [
    MysqlModule.forRootAsync({
      useFactory: () => ({
        host: process.env.MYSQL_HOST,
        database: process.env.MYSQL_DATABASE,
        password: process.env.MYSQL_ROOT_PASSWORD,
        user: process.env.MYSQL_ROOT_USER,
        port: +process.env.MYSQL_PORT
      })
    })
  ]
})
export class MySqlModule {}
