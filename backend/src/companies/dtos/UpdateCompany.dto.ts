import { PartialType } from '@nestjs/mapped-types';
import { CreateCompany } from './CreateCompany.dto';

export class UpdateCompany extends PartialType(CreateCompany) {}
