import { Controller, Get, Param } from '@nestjs/common';
import { PayrollService } from './payroll.service';

@Controller('payroll')
export class PayrollController {
  constructor(private readonly payrollService: PayrollService) {}

  @Get('rates')
  async getCurrentRates() {
    return this.payrollService.getPeriodRates();
  }

  // explicit: GET /payroll/rates/08/2025
  @Get('rates/:year/:month')
  async getPeriodRates(
    @Param('month') month: string,
    @Param('year') year: string,
  ) {
    return this.payrollService.getPeriodRates(month, year);
  }
}
