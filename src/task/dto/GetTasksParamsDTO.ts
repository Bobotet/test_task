import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatusEnum } from '../enums/taskStatusEnum';

export class GetTasksParamsDTO {
  @ApiProperty({
    title: 'Task status',
    description: 'The type of the status',
    enum: TaskStatusEnum,
    example: TaskStatusEnum.PENDING
  })
  @IsOptional()
  @IsEnum(TaskStatusEnum)
  status?: TaskStatusEnum;
}
