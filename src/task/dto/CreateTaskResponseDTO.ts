import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { TaskStatusEnum } from '../enums/taskStatusEnum';

export class CreateTaskResponseDTO {
  @ApiProperty({
    title: 'Task id',
    description: 'The id of the task',
    example: 2
  })
  @IsNotEmpty()
  @IsInt()
  id: number;

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
  @IsNotEmpty()
  @IsEnum(TaskStatusEnum)
  status: TaskStatusEnum;

  @ApiProperty({
    title: 'Client create at date',
    description: 'Time of creation of a record in the database',
    example: new Date()
  })
  @IsNotEmpty()
  @IsDate()
  updated_at: Date;

  @ApiProperty({
    title: 'Client update at date',
    description: 'Time of updating of a record in the database',
    example: new Date()
  })
  @IsNotEmpty()
  @IsDate()
  created_at: Date;
}
