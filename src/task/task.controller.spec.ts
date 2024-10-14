import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateTaskResponseDTO } from './dto/CreateTaskResponseDTO';
import { CreateTaskRequestDTO } from './dto/CreateTaskRequestDTO';
import { TaskStatusEnum } from './enums/taskStatusEnum';

describe('TaskController', () => {
  let controller: TaskController;

  const createTaskResponseExample: CreateTaskResponseDTO = {
    id: 1,
    user_id: 2,
    title: 'task title',
    description: 'task description',
    status: TaskStatusEnum.PENDING,
    updated_at: new Date(),
    created_at: new Date()
  };
  const createTaskRequestExample: CreateTaskRequestDTO = {
    user_id: 2,
    title: 'Kale',
    description: 'Kalsad4322341e1@mail.ru',
    status: TaskStatusEnum.PENDING
  };

  const getAllTasksResponseExample: CreateTaskResponseDTO[] = [
    {
      id: 1,
      user_id: 2,
      title: 'task title',
      description: 'task description',
      status: TaskStatusEnum.PENDING,
      updated_at: new Date(),
      created_at: new Date()
    },
    {
      id: 2,
      user_id: 2,
      title: 'task title',
      description: 'task description',
      status: TaskStatusEnum.PENDING,
      updated_at: new Date(),
      created_at: new Date()
    }
  ];

  const taskServiceMock = {
    createTask: jest.fn(),
    getAllTasks: jest.fn(),
    getTaskById: jest.fn(),
    updateTaskById: jest.fn(),
    deleteTaskById: jest.fn()
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [{ provide: TaskService, useValue: taskServiceMock }]
    }).compile();

    controller = module.get<TaskController>(TaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('CreateTask', () => {
    it('should create new task', async () => {
      taskServiceMock.createTask = jest
        .fn()
        .mockResolvedValue(createTaskResponseExample);
      const createdUser = await controller.createTask(createTaskRequestExample);
      expect(createdUser).toEqual(createTaskResponseExample);
    });

    it('should return 404 error', async () => {
      taskServiceMock.createTask = jest
        .fn()
        .mockRejectedValue(
          new HttpException(
            `There are no tasks with this id: ${createTaskResponseExample.id}`,
            HttpStatus.NOT_FOUND
          )
        );
      await expect(
        controller.createTask(createTaskRequestExample)
      ).rejects.toThrow(HttpException);

      await expect(
        controller.createTask(createTaskRequestExample)
      ).rejects.toMatchObject({
        status: HttpStatus.NOT_FOUND
      });
    });
  });

  describe('GetAllTasks', () => {
    it('should return all tasks', async () => {
      taskServiceMock.getAllTasks = jest
        .fn()
        .mockResolvedValue(getAllTasksResponseExample);
      const responseAllTasks = await controller.getAllTasks({});
      expect(responseAllTasks).toEqual(getAllTasksResponseExample);
    });
  });

  describe('GetTask', () => {
    it('should return task', async () => {
      taskServiceMock.getTaskById = jest
        .fn()
        .mockResolvedValue(createTaskResponseExample);
      const responseGetTask = await controller.getTask(
        createTaskResponseExample.id
      );
      expect(responseGetTask).toEqual(createTaskResponseExample);
    });

    it('should return 404 error', async () => {
      taskServiceMock.getTaskById = jest
        .fn()
        .mockRejectedValue(
          new HttpException(
            `There are no tasks with this id: ${createTaskResponseExample.id}`,
            HttpStatus.NOT_FOUND
          )
        );
      await expect(
        controller.getTask(createTaskResponseExample.id)
      ).rejects.toThrow(HttpException);

      await expect(
        controller.getTask(createTaskResponseExample.id)
      ).rejects.toMatchObject({
        status: HttpStatus.NOT_FOUND
      });
    });
  });

  describe('UpdateTask', () => {
    it('should return updated task', async () => {
      taskServiceMock.updateTaskById = jest
        .fn()
        .mockResolvedValue(createTaskResponseExample);
      const responseUpdateTask = await controller.updateTask(
        createTaskRequestExample,
        createTaskResponseExample.id
      );
      expect(responseUpdateTask).toEqual(createTaskResponseExample);
    });
    it('should return 404 error', async () => {
      taskServiceMock.updateTaskById = jest
        .fn()
        .mockRejectedValue(
          new HttpException(
            `There are no tasks with this id: ${createTaskResponseExample.id}`,
            HttpStatus.NOT_FOUND
          )
        );
      await expect(
        controller.updateTask(
          createTaskRequestExample,
          createTaskResponseExample.id
        )
      ).rejects.toThrow(HttpException);

      await expect(
        controller.updateTask(
          createTaskRequestExample,
          createTaskResponseExample.id
        )
      ).rejects.toMatchObject({
        status: HttpStatus.NOT_FOUND
      });
    });
  });
  describe('DeleteTask', () => {
    it('should return null', async () => {
      taskServiceMock.deleteTaskById = jest
        .fn()
        .mockResolvedValue(createTaskResponseExample);
      const responseDeleteTask = await controller.deleteTask(
        createTaskResponseExample.id
      );
      expect(responseDeleteTask).toEqual(undefined);
    });
    it('should return 404 error', async () => {
      taskServiceMock.deleteTaskById = jest
        .fn()
        .mockRejectedValue(
          new HttpException(
            `There are no tasks with this id: ${createTaskResponseExample.id}`,
            HttpStatus.NOT_FOUND
          )
        );
      await expect(
        controller.deleteTask(createTaskResponseExample.id)
      ).rejects.toThrow(HttpException);

      await expect(
        controller.deleteTask(createTaskResponseExample.id)
      ).rejects.toMatchObject({
        status: HttpStatus.NOT_FOUND
      });
    });
  });
});
