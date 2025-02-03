import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ required: true, default: 'username' })
  @IsString()
  username: string;

  @ApiProperty({ required: true, default: 'test@test.com' })
  @IsEmail()
  email: string;
}
