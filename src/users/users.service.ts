import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'John', role: 'ADMIN', email: 'john@mail.com' },
    { id: 2, name: 'Doe', role: 'USER', email: 'doe@mail.com' },
    { id: 3, name: 'Smith', role: 'INTERN', email: 'smith@mail.com' },
    { id: 4, name: 'Jane', role: 'USER', email: 'jane@mail.com' },
    { id: 5, name: 'Alice', role: 'ADMIN', email: 'alice@mail.com' },
  ];

  findAll(role?: 'INTERN' | 'USER' | 'ADMIN') {
    return this.users;
  }
}
