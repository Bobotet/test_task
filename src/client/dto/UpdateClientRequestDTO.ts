import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateClientRequestDTO {
  @ApiProperty({
    title: 'Client name',
    description: 'The name of the client',
    example: 'Dima'
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    title: 'Client email',
    description: 'The email of the client',
    example: 'Dima@gmail.com'
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    title: 'Client phone number',
    description: 'The phone number of the client (only for russian)',
    example: '79221110500'
  })
  @IsOptional()
  @IsPhoneNumber('RU')
  phone?: string;
}
