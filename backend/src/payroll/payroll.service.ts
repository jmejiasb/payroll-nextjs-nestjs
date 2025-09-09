import { Injectable } from '@nestjs/common';
import rateLimit from 'axios-rate-limit';
import axios, { AxiosInstance } from 'axios';
import dayjs from 'dayjs';
import {
  parseCommaNumber,
  parseAfpFields,
  parseFamilyAllowanceFields,
} from './utils/parsers';
import type { PayrollRates } from './utils/types';

@Injectable()
export class PayrollService {
  private http: AxiosInstance;

  constructor() {
    this.http = rateLimit(
      axios.create({
        baseURL: 'https://api.gael.cloud/general/public',
        timeout: 10_000,
        headers: { Accept: 'application/json' },
      }),
      {
        maxRequests: 8,
        perMilliseconds: 10_000,
      },
    );
  }

  async getPeriodRates(month?: string, year?: string): Promise<PayrollRates> {
    if (!month || !year) {
      const now = dayjs().subtract(1, 'month');
      month = now.format('MM');
      year = now.format('YYYY');
    }
    const period = `${month}${year}`;

    const res = await this.http.get<Record<string, string>>(
      `/previred/${encodeURIComponent(period)}`,
    );

    const data = res.data;

    const normalized: Record<string, string | number> = {};
    for (const [k, v] of Object.entries(data)) {
      normalized[k] = parseCommaNumber(v) as string | number;
    }
    return {
      period,
      uf: Number(normalized.UFValPeriodo ?? 0),
      utm: Number(normalized.UTMVal ?? 0),
      uta: Number(normalized.UTAVal ?? 0),
      afp: parseAfpFields(normalized),
      healthInsurance: {
        fonasa: 7 - Number(normalized.Dist7PorcFonasa ?? 0),
        ccaf: Number(normalized.Dist7PorcFonasa ?? 0),
      },
      unemploymentInsurance: [
        {
          type: 'indefinido',
          worker: Number(normalized.AFCCpiTrabajador ?? 0),
          employer: Number(normalized.AFCCpiEmpleador ?? 0),
        },
      ],
      lifeExpectancy: Number(normalized.ExpVida ?? 0),
      salaryLimits: {
        afp: Number(normalized.RTIAfpPesos ?? 0),
        inp: Number(normalized.RTIIpsPesos ?? 0),
        afc: Number(normalized.RTISegCesPesos ?? 0),
      },
      familyAllowances: parseFamilyAllowanceFields(normalized),
    };
  }
}
