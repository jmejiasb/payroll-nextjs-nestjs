import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsPositive,
  IsDateString,
  IsUUID,
} from 'class-validator';

export class CreateEmployee {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  rut: string;

  @IsDateString()
  @IsNotEmpty()
  dateBirth: string;

  @IsString()
  @IsNotEmpty()
  nationality: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsString()
  @IsNotEmpty()
  contractDate: string;

  @IsString()
  @IsNotEmpty()
  contractType: string;

  @IsString()
  @IsNotEmpty()
  afp: string;

  @IsString()
  @IsNotEmpty()
  prevision: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  @IsPositive()
  previsionUf?: number;

  @IsNumber({ maxDecimalPlaces: 0 })
  @IsPositive()
  salary: number;

  @IsUUID()
  @IsNotEmpty()
  companyId: string;
}
