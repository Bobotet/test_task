import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MySqlModule } from './mysql/mysql.module';

@Module({
  imports: [ConfigModule.forRoot(), MySqlModule],
  controllers: [],
  providers: []
})
export class AppModule {}
