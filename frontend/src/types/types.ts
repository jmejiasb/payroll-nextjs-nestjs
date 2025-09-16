export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface Company {
  id: string
  name: string;
  rut: string;
  employees: [];
}