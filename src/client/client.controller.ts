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
  Res
} from '@nestjs/common';
import { CreateClientDTO } from './dto/CreateClientDTO';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClientService } from './client.service';
import { Response } from 'express';
import { GetClientsParamsDTO } from './dto/GetClientsParamsDTO';
import { UpdateClientRequestDTO } from './dto/UpdateClientRequestDTO';

@Controller('client')
@ApiTags('clients')
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
    type: CreateClientDTO
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    example: {
      statusCode: 409,
      message: 'User with this email or phone is already registered'
    }
  })
  async createClient(@Body() body: CreateClientDTO, @Res() res: Response) {
    const newClient = await this.clientService.createClient(body);
    res.status(HttpStatus.CREATED).send(newClient);
  }

  @Get('')
  @ApiOperation({ summary: 'Get all clients' })
  @ApiResponse({ status: HttpStatus.OK, type: [CreateClientDTO] })
  async getAllClients(
    @Res() res: Response,
    @Query() params: GetClientsParamsDTO
  ) {
    const clients = await this.clientService.getAllClients(params);
    res.status(HttpStatus.CREATED).send(clients);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get client by id' })
  @ApiResponse({ status: HttpStatus.OK, type: CreateClientDTO })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    example: {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'There are no clients with this id: 2'
    }
  })
  async getClient(
    @Res() res: Response,
    @Param('id', new ParseIntPipe()) clientId: number
  ) {
    const client = await this.clientService.getClientById(clientId);
    res.status(HttpStatus.OK).send(client);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update client by id' })
  @ApiResponse({ status: HttpStatus.OK, type: CreateClientDTO })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    example: {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'There are no clients with this id: 2'
    }
  })
  async updateClient(
    @Res() res: Response,
    @Body() body: UpdateClientRequestDTO,
    @Param('id', new ParseIntPipe()) clientId: number
  ) {
    const updatedClient = await this.clientService.updateClientById(
      clientId,
      body
    );
    res.status(HttpStatus.OK).send(updatedClient);
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
  async deleteClient(
    @Res() res: Response,
    @Param('id', new ParseIntPipe()) clientId: number
  ) {
    await this.clientService.deleteClientById(clientId);
    res.status(HttpStatus.NO_CONTENT).send();
  }
}
