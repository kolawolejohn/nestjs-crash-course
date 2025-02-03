import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterUserQueryDto {
  @ApiProperty({
    required: false,
    description: 'Optional username to filter users',
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({
    required: false,
    description: 'Optional email to filter users',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    required: false,
    description: 'Optional user ID to filter users',
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  id?: number;
}
