import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from './dataSource';

@Module({
  imports: [TypeOrmModule.forRoot({ ...dataSource.options })]
})
export class DatabaseModule {}
