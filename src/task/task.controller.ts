import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseInterceptors
} from '@nestjs/common';
import { TaskService } from './task.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTaskRequestDTO } from './dto/CreateTaskRequestDTO';
import { CreateTaskResponseDTO } from './dto/CreateTaskResponseDTO';
import { GetTasksParamsDTO } from './dto/GetTasksParamsDTO';
import { UpdateTaskRequestDTO } from './dto/UpdateTaskRequestDTO';
import { LoggingInterceptor } from '../logger/logger.interceptor';

@UseInterceptors(LoggingInterceptor)
@Controller('task')
@ApiTags('task')
@ApiResponse({
  status: HttpStatus.BAD_REQUEST,
  example: {
    message: ['some field is incorrect'],
    error: 'Bad Request',
    statusCode: 400
  }
})
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('')
  @ApiOperation({ summary: 'Create task' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CreateTaskResponseDTO
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    example: {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'There are no clients with this id: 2'
    }
  })
  async createTask(@Body() body: CreateTaskRequestDTO) {
    const newTask = await this.taskService.createTask(body);
    return newTask;
  }

  @Get('')
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: HttpStatus.OK, type: [CreateTaskResponseDTO] })
  async getAllTasks(@Query() params: GetTasksParamsDTO) {
    const tasks = await this.taskService.getAllTasks(params);
    return tasks;
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get task by id' })
  @ApiResponse({ status: HttpStatus.OK, type: CreateTaskResponseDTO })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    example: {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'There are no tasks with this id: 2'
    }
  })
  async getTask(@Param('id', new ParseIntPipe()) taskId: number) {
    const client = await this.taskService.getTaskById(taskId);
    return client;
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update task by id' })
  @ApiResponse({ status: HttpStatus.OK, type: CreateTaskResponseDTO })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    example: {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'There are no tasks with this id: 2'
    }
  })
  async updateTask(
    @Body() body: UpdateTaskRequestDTO,
    @Param('id', new ParseIntPipe()) taskId: number
  ) {
    const updatedClient = await this.taskService.updateTaskById(taskId, body);
    return updatedClient;
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete task by id' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    example: {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'There are no tasks with this id: 2'
    }
  })
  async deleteTask(@Param('id', new ParseIntPipe()) taskId: number) {
    await this.taskService.deleteTaskById(taskId);
    return;
  }
}
