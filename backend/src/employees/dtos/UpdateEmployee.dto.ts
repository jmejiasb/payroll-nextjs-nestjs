import { IsOptional, IsUUID } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployee } from './CreateEmployee.dto';

export class UpdateEmployee extends PartialType(CreateEmployee) {
  @IsOptional()
  @IsUUID()
  companyId?: string;
}
