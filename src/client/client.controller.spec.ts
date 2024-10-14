import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateClientResponseDTO } from './dto/CreateClientResponseDTO';
import { CreateClientRequestDTO } from './dto/CreateClientRequestDTO';
import { LoggerModule } from '../logger/logger.module';

describe('ClientController', () => {
  let controller: ClientController;

  const createClientResponseExample: CreateClientResponseDTO = {
    id: 1,
    name: 'Kale',
    email: 'Kalsad4322341e1@mail.ru',
    phone: '79224213500',
    created_at: new Date(),
    updated_at: new Date()
  };
  const createClientRequestExample: CreateClientRequestDTO = {
    name: 'Kale',
    email: 'Kalsad4322341e1@mail.ru',
    phone: '79224213500'
  };

  const getAllClientsResponseExample: CreateClientResponseDTO[] = [
    {
      id: 1,
      name: 'Kale',
      email: 'Kalsad4322341e1@mail.ru',
      phone: '79224213500',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 2,
      name: 'Dima',
      email: 'asdf@mail.ru',
      phone: '79224313500',
      created_at: new Date(),
      updated_at: new Date()
    }
  ];

  const clientServiceMock = {
    createClient: jest.fn(),
    getAllClients: jest.fn(),
    getClientById: jest.fn(),
    updateClientById: jest.fn(),
    deleteClientById: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule],
      controllers: [ClientController],
      providers: [{ provide: ClientService, useValue: clientServiceMock }]
    }).compile();

    controller = module.get<ClientController>(ClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('CreateClient', () => {
    it('should create new user', async () => {
      clientServiceMock.createClient = jest
        .fn()
        .mockResolvedValue(createClientResponseExample);
      const createdUser = await controller.createClient(
        createClientRequestExample
      );
      expect(createdUser).toEqual(createClientResponseExample);
    });

    it('should return 409 error', async () => {
      clientServiceMock.createClient = jest
        .fn()
        .mockRejectedValue(
          new HttpException(
            'User with this email or phone is already registered',
            HttpStatus.CONFLICT
          )
        );
      await expect(
        controller.createClient(createClientRequestExample)
      ).rejects.toThrow(HttpException);

      await expect(
        controller.createClient(createClientRequestExample)
      ).rejects.toMatchObject({
        status: HttpStatus.CONFLICT
      });
    });
  });

  describe('GetAllClients', () => {
    it('should return all clients', async () => {
      clientServiceMock.getAllClients = jest
        .fn()
        .mockResolvedValue(getAllClientsResponseExample);
      const responseAllClients = await controller.getAllClients({});
      expect(responseAllClients).toEqual(getAllClientsResponseExample);
    });
  });

  describe('GetClient', () => {
    it('should return client', async () => {
      clientServiceMock.getClientById = jest
        .fn()
        .mockResolvedValue(createClientResponseExample);
      const responseGetClient = await controller.getClient(
        createClientResponseExample.id
      );
      expect(responseGetClient).toEqual(createClientResponseExample);
    });

    it('should return 404 error', async () => {
      clientServiceMock.getClientById = jest
        .fn()
        .mockRejectedValue(
          new HttpException(
            `There are no clients with this id: ${createClientResponseExample.id}`,
            HttpStatus.NOT_FOUND
          )
        );
      await expect(
        controller.getClient(createClientResponseExample.id)
      ).rejects.toThrow(HttpException);

      await expect(
        controller.getClient(createClientResponseExample.id)
      ).rejects.toMatchObject({
        status: HttpStatus.NOT_FOUND
      });
    });
  });

  describe('UpdateClient', () => {
    it('should return updated user', async () => {
      clientServiceMock.updateClientById = jest
        .fn()
        .mockResolvedValue(createClientResponseExample);
      const responseUpdateClient = await controller.updateClient(
        createClientRequestExample,
        createClientResponseExample.id
      );
      expect(responseUpdateClient).toEqual(createClientResponseExample);
    });
    it('should return 404 error', async () => {
      clientServiceMock.updateClientById = jest
        .fn()
        .mockRejectedValue(
          new HttpException(
            `There are no clients with this id: ${createClientResponseExample.id}`,
            HttpStatus.NOT_FOUND
          )
        );
      await expect(
        controller.updateClient(
          createClientRequestExample,
          createClientResponseExample.id
        )
      ).rejects.toThrow(HttpException);

      await expect(
        controller.updateClient(
          createClientRequestExample,
          createClientResponseExample.id
        )
      ).rejects.toMatchObject({
        status: HttpStatus.NOT_FOUND
      });
    });
  });
  describe('DeleteClient', () => {
    it('should return null', async () => {
      clientServiceMock.deleteClientById = jest
        .fn()
        .mockResolvedValue(createClientResponseExample);
      const responseDeleteClient = await controller.deleteClient(
        createClientResponseExample.id
      );
      expect(responseDeleteClient).toEqual(undefined);
    });
    it('should return 404 error', async () => {
      clientServiceMock.deleteClientById = jest
        .fn()
        .mockRejectedValue(
          new HttpException(
            `There are no clients with this id: ${createClientResponseExample.id}`,
            HttpStatus.NOT_FOUND
          )
        );
      await expect(
        controller.deleteClient(createClientResponseExample.id)
      ).rejects.toThrow(HttpException);

      await expect(
        controller.deleteClient(createClientResponseExample.id)
      ).rejects.toMatchObject({
        status: HttpStatus.NOT_FOUND
      });
    });
  });
});
