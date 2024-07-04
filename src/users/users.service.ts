import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";

@Injectable()
export class UsersService {
    private users = [
        {id: 1, name: 'John', role: 'ADMIN', email: 'john@mail.com'},
        {id: 2, name: 'Doe', role: 'USER', email: 'doe@mail.com'},
        {id: 3, name: 'Smith', role: 'INTERN', email: 'smith@mail.com'},
        {id: 4, name: 'Jane', role: 'USER', email: 'jane@mail.com'},
        {id: 5, name: 'Alice', role: 'ADMIN', email: 'alice@mail.com'},
    ];

    findAll(role?: 'INTERN' | 'USER' | 'ADMIN') {
        if (role) {
            return this.users.filter((user) => user.role === role);
        }
        return this.users;
    }


    findOne(id: number) {

        const user = this.users.find((user) => user.id === id);

        if (!user) throw new NotFoundException('Użytkownika nie ma')

        return user
    }

    create(createUserDto: CreateUserDto) {
        const newUser = {id: this.users.length + 1, ...createUserDto};
        this.users.push(newUser);
        return newUser;
    }

    update(id: number, userUpdateDto: UpdateUserDto) {
        const userIndex = this.users.findIndex((user) => user.id === id);
        this.users[userIndex] = {...this.users[userIndex], ...userUpdateDto};
        return this.users[userIndex];
    }

    delete(id: number) {
        const userIndex = this.users.findIndex((user) => user.id === id);
        const deletedUser = this.users[userIndex];
        this.users = this.users.filter((user) => user.id !== id);
        return deletedUser;
    }


}
