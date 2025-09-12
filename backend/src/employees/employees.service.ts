import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employees.entity';
import { CreateEmployee } from './dtos/CreateEmployee.dto';
import { UpdateEmployee } from './dtos/UpdateEmployee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly repo: Repository<Employee>,
  ) {}

  async create(dto: CreateEmployee): Promise<Employee> {
    await this.ensureRutUnique(dto.rut);

    const employee = this.repo.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      rut: dto.rut,
      dateBirth: dto.dateBirth,
      nationality: dto.nationality,
      address: dto.address,
      position: dto.position,
      contractDate: dto.contractDate,
      contractType: dto.contractType,
      afp: dto.afp,
      prevision: dto.prevision,
      previsionUf: dto.previsionUf ?? 0,
    });

    return this.repo.save(employee);
  }

  async findAll(): Promise<Employee[]> {
    const data = await this.repo.find();

    return data;
  }

  async findOne(id: string): Promise<Employee> {
    const employee = await this.repo.findOne({ where: { id } });
    if (!employee) throw new NotFoundException('Empleado no encontrado.');

    return employee;
  }

  async findByRut(rut: string): Promise<Employee> {
    const employee = await this.repo.findOne({ where: { rut } });
    if (!employee) throw new NotFoundException('Empleado no encontrado.');

    return employee;
  }

  async update(id: string, dto: UpdateEmployee): Promise<Employee> {
    const existingEmployee = await this.findOne(id);

    if (dto.rut && dto.rut !== existingEmployee.rut) {
      await this.ensureRutUnique(dto.rut);
    }

    const updatedEmployee = this.repo.merge(existingEmployee, dto);

    return this.repo.save(updatedEmployee);
  }

  async remove(id: string): Promise<void> {
    const res = await this.repo.delete(id);
    if (!res.affected) throw new NotFoundException('Empleado no encontrado.');
  }

  private async ensureRutUnique(rut: string) {
    const existing = await this.repo.findOne({ where: { rut } });
    if (existing) throw new ConflictException('El RUT ya está registrado.');
  }
}
