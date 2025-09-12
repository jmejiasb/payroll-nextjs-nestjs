export interface AFPRate {
  name: string;
  worker: number;
  employer: number;
  total: number;
  independent: number;
}

export interface FamilyAllowance {
  bracket: string;
  amount: number;
  minSalary: number;
  maxSalary: number;
}

export interface UnemploymentContractType {
  type: string;
  worker: number;
  employer: number;
}

export interface PayrollRates {
  period: string;
  uf: number;
  utm: number;
  uta: number;

  minSalary: number;

  afp: AFPRate[];

  healthInsurance: {
    fonasa: number;
    ccaf: number;
  };

  unemploymentInsurance: UnemploymentContractType[];

  lifeExpectancy: number;

  salaryLimits: {
    afp: number;
    inp: number;
    afc: number;
  };

  familyAllowances: FamilyAllowance[];
}
