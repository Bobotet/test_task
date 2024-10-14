import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsPhoneNumber,
  IsString
} from 'class-validator';

export class CreateClientResponseDTO {
  @ApiProperty({
    title: 'Client id',
    description: 'The id of the client',
    example: 1
  })
  @IsNotEmpty()
  @IsInt()
  id: number;

  @ApiProperty({
    title: 'Client name',
    description: 'The name of the client',
    example: 'Dima'
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    title: 'Client email',
    description: 'The email of the client',
    example: 'Dima@gmail.com'
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    title: 'Client phone number',
    description: 'The phone number of the client (only for russian)',
    example: '79221110500'
  })
  @IsNotEmpty()
  @IsPhoneNumber('RU')
  phone: string;

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
