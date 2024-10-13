import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClientDTO } from './dto/CreateClientDTO';
import { DataSource } from 'typeorm';
import { GetClientsParamsDTO } from './dto/GetClientsParamsDTO';
import { SqlErrorCodeEnum } from '../database/enums/sqlErrorCodesEnum';
import { UpdateClientRequestDTO } from './dto/UpdateClientRequestDTO';

@Injectable()
export class ClientService {
  constructor(private readonly dataSource: DataSource) {}
  async createClient(body: CreateClientDTO) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.query('START TRANSACTION');
      const insertResult = await queryRunner.query(
        'INSERT INTO clients (name, phone, email) VALUES (?, ?, ?);',
        [body.name, body.phone, body.email]
      );

      const insertedId = insertResult.insertId;

      const newClient = await queryRunner.query(
        'SELECT * FROM clients WHERE id = ?',
        [insertedId]
      );
      await queryRunner.query('COMMIT');
      return newClient;
    } catch (error) {
      await queryRunner.query('ROLLBACK');
      switch (error.code) {
        case SqlErrorCodeEnum.ER_DUP_ENTRY:
          throw new HttpException(
            'User with this email or phone is already registered',
            HttpStatus.CONFLICT
          );
        default:
          throw error;
      }
    } finally {
      await queryRunner.release();
    }
  }

  async getAllClients(params: GetClientsParamsDTO) {
    const offset: number = params.perPage * (params.page - 1);
    const limit: number = params.perPage;

    const clients = await this.dataSource.query(
      'SELECT * FROM clients LIMIT ? OFFSET ?',
      [limit, offset]
    );
    return clients;
  }

  async getClientById(clientId: number) {
    const getClientQuery = await this.dataSource.query(
      'SELECT * FROM clients WHERE id = ?',
      [clientId]
    );
    if (getClientQuery.length === 0) {
      throw new HttpException(
        `There are no clients with this id: ${clientId}`,
        HttpStatus.NOT_FOUND
      );
    }
    return getClientQuery[0];
  }

  async updateClientById(
    clientId: number,
    updateClientData: UpdateClientRequestDTO
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.query('START TRANSACTION');

      const updatedFields: string[] = [];
      const values: string[] = [];

      if (updateClientData.name) {
        updatedFields.push('name = ?');
        values.push(updateClientData.name);
      }
      if (updateClientData.email) {
        updatedFields.push('email = ?');
        values.push(updateClientData.email);
      }
      if (updateClientData.phone) {
        updatedFields.push('phone = ?');
        values.push(updateClientData.phone);
      }

      await queryRunner.query(
        `UPDATE clients SET ${updatedFields.join(', ')} WHERE id = ?`,
        [...values, clientId]
      );

      const updateClientQuery = await queryRunner.query(
        'SELECT * FROM clients WHERE id = ?',
        [clientId]
      );

      await queryRunner.query('COMMIT');
      if (updateClientQuery.length === 0) {
        throw new HttpException(
          `There are no clients with this id: ${clientId}`,
          HttpStatus.NOT_FOUND
        );
      }

      return updateClientQuery[0];
    } catch (error) {
      await queryRunner.query('ROLLBACK');
      switch (error.code) {
        case SqlErrorCodeEnum.ER_DUP_ENTRY:
          throw new HttpException(
            'User with this email or phone is already registered',
            HttpStatus.CONFLICT
          );
        default:
          throw error;
      }
    } finally {
      await queryRunner.release();
    }
  }

  async deleteClientById(clientId: number) {
    const deleteQuery = await this.dataSource.query(
      'DELETE FROM clients WHERE id = ?',
      [clientId]
    );

    if (deleteQuery.affectedRows === 0) {
      throw new HttpException(
        `There are no clients with this id: ${clientId}`,
        HttpStatus.NOT_FOUND
      );
    }
  }
}
