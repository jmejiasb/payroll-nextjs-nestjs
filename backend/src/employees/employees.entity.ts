import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Company } from 'src/companies/companies.entity';

@Entity({ name: 'employees' })
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ unique: true })
  rut: string;

  @Column({ name: 'date_birth' })
  dateBirth: string;

  @Column()
  nationality: string;

  @Column()
  address: string;

  @Column()
  position: string;

  @Column({ name: 'contract_date' })
  contractDate: string;

  @Column({ name: 'contract_type' })
  contractType: string;

  @Column()
  afp: string;

  @Column()
  prevision: string;

  @Column('numeric', { precision: 5, scale: 2, default: 0, nullable: true })
  previsionUf?: number;

  @Column('numeric', { precision: 12, scale: 0, default: 0 })
  salary: number;

  @ManyToOne(() => Company, (company) => company.employees, {
    eager: false,
  })
  @JoinColumn({ name: 'company_id' })
  company: Company;
}
