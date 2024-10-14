import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateClientRequestDTO {
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
}
