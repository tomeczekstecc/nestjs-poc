import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';

@Controller('users')
export class UsersController {
    /*
    /users (GET)
    /users/:id (GET)
    /users (POST)
    /users/:id (PATCH)
    /users/:id (DELETE)
    */

    @Get() // /users (GET)
    findAll(@Query('role') role?: 'INTERN' | 'USER' | 'ADMIN') {
        if (role) {
            return `This action returns all ${role}s`;
        }
        return 'This action returns all users';
    }

    @Get('interns') // /users/interns (GET)
    findInterns() {
        return 'This action returns all interns';
    }


    @Get(':id') // /users/:id (GET)
    findOne(@Param('id') id: string) {
        return {id};
    }

    @Post() // /users (POST)
    create(@Body() user: {}) {
        return 'This action adds a new user';
    }


    @Patch(':id') // /users/:id (PATCH)
    update(@Param('id') id: string, @Body() userUpdate: {}) {
        return {id, ...userUpdate};
    }


    @Delete(':id') // /users/:id (DELETE)
    delete(@Param('id') id: string) {
        return 'This action removes a user';
    }

}
