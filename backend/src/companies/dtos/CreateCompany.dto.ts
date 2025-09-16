import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCompany {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  rut: string;
}
