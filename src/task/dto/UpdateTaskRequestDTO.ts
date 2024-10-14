import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatusEnum } from '../enums/taskStatusEnum';

export class UpdateTaskRequestDTO {
  @ApiProperty({
    title: 'Task title',
    description: 'Title of the task',
    example: 'HELLO WORLD'
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    title: 'Task description',
    description: 'The description of the task',
    example: 'I need to write hello world program on php'
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    title: 'Task status',
    description: 'The status of the task',
    enum: TaskStatusEnum,
    example: TaskStatusEnum.PENDING,
    default: TaskStatusEnum.PENDING
  })
  @IsOptional()
  @IsEnum(TaskStatusEnum)
  status?: TaskStatusEnum;
}
