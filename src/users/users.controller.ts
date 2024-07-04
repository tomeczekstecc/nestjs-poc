import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    ParseIntPipe,
    ValidationPipe
} from '@nestjs/common';

import {UsersService} from './users.service';
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";

@Controller('users')
export class UsersController {
    /*
      /users (GET)
      /users/:id (GET)
      /users (POST)
      /users/:id (PATCH)
      /users/:id (DELETE)
      */

    constructor(private readonly usersService: UsersService) {
    }


    @Get() // /users (GET)
    findAll(@Query('role') role?: 'INTERN' | 'USER' | 'ADMIN') {
        if (role) {
            return this.usersService.findAll(role);
        }
        return this.usersService.findAll()
    }

    @Get(':id') // /users/:id (GET)
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id);
    }

    @Post() // /users (POST)
    create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto)
    }

    @Patch(':id') // /users/:id (PATCH)
    update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto)
    }

    @Delete(':id') // /users/:id (DELETE)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.delete(id)
    }
}
