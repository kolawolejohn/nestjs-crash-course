import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { FilterUserQueryDto } from './dto/fiter-user-query.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({ type: User, isArray: true, description: 'Fetch all users' })
  @Get('')
  @ApiQuery({
    name: 'username',
    required: false,
    description: 'Optional username to filter users',
  })
  @ApiQuery({
    name: 'email',
    required: false,
    description: 'Optional email to filter users',
  })
  @ApiQuery({
    name: 'id',
    required: false,
    description: 'Optional user ID to filter users',
  })
  @Get('')
  async getUsers(@Query() query: FilterUserQueryDto): Promise<User[]> {
    return await this.usersService.getAllUsers(query);
  }

  @ApiOkResponse({ type: User, description: 'Fetch user by id' })
  @ApiNotFoundResponse()
  @Get(':id')
  async getUsersById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.usersService.getUsersById(id);
  }

  @ApiCreatedResponse({ type: User, description: 'Create a new user' })
  @Post('')
  async createUser(@Body() body: CreateUserDto): Promise<User> {
    return await this.usersService.createUser(body);
  }
}
