import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { FilterUserQueryDto } from './dto/fiter-user-query.dto';

@Injectable()
export class UsersService {
  constructor() {}

  private users: User[] = [
    {
      id: 1,
      username: 'kolawole',
      email: 'kolawolegmail.com',
    },
    {
      id: 2,
      username: 'olayemi',
      email: 'olayemi@gmail.com',
    },
    {
      id: 3,
      username: 'test',
      email: 'olayemi@test.com',
    },
  ];

  async getAllUsersSimple(username?: string): Promise<User[]> {
    if (username) {
      return this.users.filter(
        (user) => user.username.toLowerCase() === username.toLowerCase(),
      );
    } else {
      return this.users;
    }
  }

  async getAllUsers({
    username,
    email,
    id,
  }: FilterUserQueryDto): Promise<User[]> {
    if (username || email || id !== undefined) {
      return this.users.filter(
        (user) =>
          (!username ||
            user.username.toLowerCase() === username.toLowerCase()) &&
          (!email || user.email.toLowerCase() === email.toLowerCase()) &&
          (!id || user.id === id),
      );
    } else {
      return this.users;
    }
  }

  async getUsersById(id: number): Promise<User> {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException();
    return user ? user : null;
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = {
      id: Date.now(),
      ...dto,
    };

    this.users.push(user);

    return user;
  }
}
