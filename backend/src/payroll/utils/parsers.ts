import type { AFPRate, FamilyAllowance } from './types';

export function parseCommaNumber(value: string): string {
  if (typeof value !== 'string') return value;

  const s = value.trim();
  if (s.length === 0) return value;

  const cleaned = s.replace(/,/g, '.');

  return cleaned;
}

export function parseAfpFields(
  data: Record<string, string | number>,
): AFPRate[] {
  const groups: Record<string, AFPRate> = {};

  const re = /^AFP(.+?)Tasa(.+)$/i;

  for (const [key, val] of Object.entries(data)) {
    const m = key.match(re);
    if (!m) continue;

    const rawName = m[1];
    const tail = m[2];
    const name = rawName.trim().toLowerCase();

    // ensure group exists
    if (!groups[name])
      groups[name] = {
        name,
        worker: 0,
        employer: 0,
        total: 0,
        independent: 0,
      };

    // map suffixes to fields you want
    const tailNormalized = tail.toLowerCase();

    if (/(deptrab|depact)$/.test(tailNormalized)) {
      groups[name].worker = Number(val ?? 0);
    } else if (/(depapagar|deppens)$/.test(tailNormalized)) {
      groups[name].total = Number(val ?? 0);
    } else if (/(ind|tasaind)$/.test(tailNormalized)) {
      groups[name].independent = Number(val ?? 0);
    }

    groups[name].employer = Number(
      (groups[name].total - groups[name].worker).toFixed(2),
    );
  }

  return Object.values(groups);
}

export function parseFamilyAllowanceFields(
  data: Record<string, string | number>,
): FamilyAllowance[] {
  const groups: Record<string, FamilyAllowance> = {};

  const re = /^AFamTramo([A-Za-z0-9]+)(Monto|Desde|Hasta)$/i;

  for (const [key, val] of Object.entries(data)) {
    const m = key.match(re);
    if (!m) continue;

    const bracket = m[1].toUpperCase();
    const field = m[2].toLowerCase();

    if (!groups[bracket])
      groups[bracket] = {
        bracket,
        amount: 0,
        minSalary: 0,
        maxSalary: 0,
      };

    if (field === 'monto') {
      groups[bracket].amount = Number(val);
    } else if (field === 'desde') {
      groups[bracket].minSalary = Number(val);
    } else if (field === 'hasta') {
      groups[bracket].maxSalary = Number(val);
    }
  }

  return Object.values(groups);
}
