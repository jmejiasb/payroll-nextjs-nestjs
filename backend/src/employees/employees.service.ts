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
import { Company } from 'src/companies/companies.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly repo: Repository<Employee>,
    @InjectRepository(Employee)
    private readonly companyRepo: Repository<Company>,
  ) {}

  async create(dto: CreateEmployee): Promise<Employee> {
    await this.ensureRutUnique(dto.rut);

    const company = await this.companyRepo.findOne({
      where: { id: dto.companyId },
    });

    if (!company) {
      throw new NotFoundException(`Company with ID ${dto.companyId} not found`);
    }

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
      company: company,
    });

    return this.repo.save(employee);
  }

  async findAll(): Promise<Employee[]> {
    const data = await this.repo.find({
      relations: ['company'],
      select: {
        id: true,
        firstName: true,
        lastName: true,
        rut: true,
        position: true,
        salary: true,
        company: {
          id: true,
          name: true,
        },
      },
    });

    return data;
  }

  async findOne(id: string): Promise<Employee> {
    const employee = await this.repo.findOne({
      where: { id },
      relations: ['company'],
    });
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

    if (!existingEmployee)
      throw new NotFoundException('Empleado no encontrado.');

    if (dto.rut && dto.rut !== existingEmployee.rut) {
      await this.ensureRutUnique(dto.rut);
    }

    if (dto.companyId && dto.companyId !== existingEmployee.company?.id) {
      const company = await this.companyRepo.findOne({
        where: { id: dto.companyId },
      });

      if (!company) {
        throw new NotFoundException(
          `Empresa con ID ${dto.companyId} no encontrada`,
        );
      }
    }

    const { companyId, ...updateData } = dto; // eslint-disable-line @typescript-eslint/no-unused-vars

    const updatedEmployee = this.repo.merge(existingEmployee, updateData);

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
