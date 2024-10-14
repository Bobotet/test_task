import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import { ClientModule } from '../client/client.module';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, ClientModule, TaskModule],
  controllers: [],
  providers: []
})
export class AppModule {}
