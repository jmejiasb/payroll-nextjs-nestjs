import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './companies.entity';
import { CreateCompany } from './dtos/CreateCompany.dto';
import { UpdateCompany } from './dtos/UpdateCompany.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly repo: Repository<Company>,
  ) {}

  async create(dto: CreateCompany): Promise<Company> {
    await this.ensureRutUnique(dto.rut);

    const company = this.repo.create({
      rut: dto.rut,
      name: dto.name,
    });

    return this.repo.save(company);
  }

  async findAll(): Promise<Company[]> {
    const data = await this.repo.find({
      relations: ['employees'],
    });

    return data;
  }

  async findOne(id: string): Promise<Company> {
    const company = await this.repo.findOne({
      where: { id },
      relations: ['employees'],
    });
    if (!company) throw new NotFoundException('Empresa no encontrada.');

    return company;
  }

  async findByRut(rut: string): Promise<Company> {
    const company = await this.repo.findOne({
      where: { rut },
      relations: ['employees'],
    });
    if (!company) throw new NotFoundException('Empresa no encontrada.');

    return company;
  }

  async update(id: string, dto: UpdateCompany): Promise<Company> {
    const existingCompany = await this.findOne(id);

    if (!existingCompany) throw new NotFoundException('Empresa no encontrada.');

    if (dto.rut && dto.rut !== existingCompany.rut) {
      await this.ensureRutUnique(dto.rut);
    }

    const updatedEmployee = this.repo.merge(existingCompany, dto);

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
