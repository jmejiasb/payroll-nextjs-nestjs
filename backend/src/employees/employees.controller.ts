import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { UpdateEmployee } from './dtos/UpdateEmployee.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  async getEmployees() {
    return this.employeesService.findAll();
  }

  @Get('/by-id/:id')
  async getEmployeeById(@Param('id') id: string) {
    return this.employeesService.findOne(id);
  }

  @Get('/by-rut/:rut')
  async getEmployeeByRut(@Param('rut') rut: string) {
    return this.employeesService.findByRut(rut);
  }

  @Post()
  async createEmployee(@Param('id') id: string, @Body() dto: UpdateEmployee) {
    return this.employeesService.update(id, dto);
  }

  @Put(':id')
  async updateEmployee(@Param('id') id: string, @Body() dto: UpdateEmployee) {
    return this.employeesService.update(id, dto);
  }

  @Delete(':id')
  async deleteEmployee(@Param('id') id: string) {
    return this.employeesService.remove(id);
  }
}
