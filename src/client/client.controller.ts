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
import { CreateClientRequestDTO } from './dto/CreateClientRequestDTO';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClientService } from './client.service';
import { GetClientsParamsDTO } from './dto/GetClientsParamsDTO';
import { UpdateClientRequestDTO } from './dto/UpdateClientRequestDTO';
import { CreateClientResponseDTO } from './dto/CreateClientResponseDTO';
import { LoggingInterceptor } from '../logger/logger.interceptor';

@UseInterceptors(LoggingInterceptor)
@Controller('client')
@ApiTags('client')
@ApiResponse({
  status: HttpStatus.BAD_REQUEST,
  example: {
    message: ['some field is incorrect'],
    error: 'Bad Request',
    statusCode: 400
  }
})
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('')
  @ApiOperation({ summary: 'Create client' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CreateClientResponseDTO
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    example: {
      statusCode: HttpStatus.CONFLICT,
      message: 'User with this email or phone is already registered'
    }
  })
  async createClient(@Body() body: CreateClientRequestDTO) {
    const newClient = await this.clientService.createClient(body);
    return newClient;
  }

  @Get('')
  @ApiOperation({ summary: 'Get all clients' })
  @ApiResponse({ status: HttpStatus.OK, type: [CreateClientResponseDTO] })
  async getAllClients(@Query() params: GetClientsParamsDTO) {
    const clients = await this.clientService.getAllClients(params);
    return clients;
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get client by id' })
  @ApiResponse({ status: HttpStatus.OK, type: CreateClientResponseDTO })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    example: {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'There are no clients with this id: 2'
    }
  })
  async getClient(@Param('id', new ParseIntPipe()) clientId: number) {
    const client = await this.clientService.getClientById(clientId);
    return client;
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update client by id' })
  @ApiResponse({ status: HttpStatus.OK, type: CreateClientResponseDTO })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    example: {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'There are no clients with this id: 2'
    }
  })
  async updateClient(
    @Body() body: UpdateClientRequestDTO,
    @Param('id', new ParseIntPipe()) clientId: number
  ) {
    const updatedClient = await this.clientService.updateClientById(
      clientId,
      body
    );
    return updatedClient;
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete client by id' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    example: {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'There are no clients with this id: 2'
    }
  })
  async deleteClient(@Param('id', new ParseIntPipe()) clientId: number) {
    await this.clientService.deleteClientById(clientId);
    return;
  }
}
