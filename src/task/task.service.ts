import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateTaskRequestDTO } from './dto/CreateTaskRequestDTO';
import { SqlErrorCodeEnum } from '../database/enums/sqlErrorCodesEnum';
import { GetTasksParamsDTO } from './dto/GetTasksParamsDTO';
import { UpdateTaskRequestDTO } from './dto/UpdateTaskRequestDTO';

@Injectable()
export class TaskService {
  constructor(private readonly dataSource: DataSource) {}
  async createTask(body: CreateTaskRequestDTO) {
    try {
      const createTaskQuery = await this.dataSource.query(
        'INSERT INTO tasks (title, description, user_id, status) VALUES (?, ?, ?, ?)',
        [body.title, body.description, body.user_id, body.status]
      );

      const createdTask = await this.dataSource.query(
        'SELECT * FROM tasks WHERE id = ?',
        [createTaskQuery.insertId]
      );

      return createdTask;
    } catch (error) {
      switch (error.errno) {
        case SqlErrorCodeEnum.FOREIGN_KEY_ERROR:
          throw new HttpException(
            `There are no clients with this id: ${body.user_id}`,
            HttpStatus.NOT_FOUND
          );
        default:
          throw error;
      }
    }
  }

  async getAllTasks(params: GetTasksParamsDTO) {
    const getTasksQuery = params.status
      ? 'SELECT * FROM tasks WHERE status = ?'
      : 'SELECT * FROM tasks';
    const tasks = await this.dataSource.query(getTasksQuery, [params.status]);

    return tasks;
  }

  async getTaskById(taskId: number) {
    const getTaskQuery = await this.dataSource.query(
      'SELECT * FROM tasks WHERE id = ?',
      [taskId]
    );
    if (getTaskQuery.length === 0) {
      throw new HttpException(
        `There are no tasks with this id: ${taskId}`,
        HttpStatus.NOT_FOUND
      );
    }
    return getTaskQuery[0];
  }

  async updateTaskById(taskId: number, updateTaskData: UpdateTaskRequestDTO) {
    const updatedFields: string[] = [];
    const values: string[] = [];

    if (updateTaskData.title) {
      updatedFields.push('title = ?');
      values.push(updateTaskData.title);
    }
    if (updateTaskData.description) {
      updatedFields.push('description = ?');
      values.push(updateTaskData.description);
    }
    if (updateTaskData.status) {
      updatedFields.push('status = ?');
      values.push(updateTaskData.status);
    }

    await this.dataSource.query(
      `UPDATE tasks SET ${updatedFields.join(', ')} WHERE id = ?`,
      [...values, taskId]
    );

    const updateClientQuery = await this.dataSource.query(
      'SELECT * FROM tasks WHERE id = ?',
      [taskId]
    );

    if (updateClientQuery.length === 0) {
      throw new HttpException(
        `There are no tasks with this id: ${taskId}`,
        HttpStatus.NOT_FOUND
      );
    }

    return updateClientQuery[0];
  }

  async deleteTaskById(taskId: number) {
    const deleteQuery = await this.dataSource.query(
      'DELETE FROM tasks WHERE id = ?',
      [taskId]
    );

    if (deleteQuery.affectedRows === 0) {
      throw new HttpException(
        `There are no tasks with this id: ${taskId}`,
        HttpStatus.NOT_FOUND
      );
    }
  }
}
