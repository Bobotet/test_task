import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator';
import { TaskStatusEnum } from '../enums/taskStatusEnum';

export class CreateTaskRequestDTO {
  @ApiProperty({
    title: 'Client id',
    description: 'Id of the client on which the task hangs',
    example: 2
  })
  @IsNotEmpty()
  @IsInt()
  user_id: number;

  @ApiProperty({
    title: 'Task title',
    description: 'Title of the task',
    example: 'HELLO WORLD'
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    title: 'Task description',
    description: 'The description of the task',
    example: 'I need to write hello world program on php'
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    title: 'Task status',
    description: 'The status of the task',
    enum: TaskStatusEnum,
    example: TaskStatusEnum.PENDING,
    default: TaskStatusEnum.PENDING
  })
  @IsOptional()
  @IsEnum(TaskStatusEnum)
  status?: TaskStatusEnum = TaskStatusEnum.PENDING;
}
