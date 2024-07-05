import {Controller, Get, Post, Body, Patch, Param, Delete, Ip, Query} from '@nestjs/common';
import {EmployeesService} from './employees.service';
import {Prisma, Role} from '@prisma/client';
import {Throttle, SkipThrottle} from "@nestjs/throttler";
import {MyloggerService} from "../mylogger/mylogger.service";

@SkipThrottle()
@Controller('employees')
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService) {
    }
    private readonly logger = new MyloggerService(EmployeesController.name);

    @Post()
    create(@Body() createEmployeeDto: Prisma.EmployeeCreateInput) {
        return this.employeesService.create(createEmployeeDto);
    }

    @SkipThrottle({default: false})
    @Get()
    findAll (@Ip() ip:string, @Query() role?: Role) {
        this.logger.log('Fetching all employees');
        if (role) {
            return this.employeesService.findAll(role);
        }
        return this.employeesService.findAll();
    }

    @Throttle({short: {ttl: 1000, limit: 1}})
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.employeesService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateEmployeeDto: Prisma.EmployeeUpdateInput) {
        return this.employeesService.update(+id, updateEmployeeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.employeesService.remove(+id);
    }
}
