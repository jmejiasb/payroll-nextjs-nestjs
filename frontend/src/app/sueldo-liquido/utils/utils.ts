export function calculateUniqueTax(impSalary: number, utm: number) {
  const b = impSalary;
  const u = utm;

  // if inputs invalid, return 0 (matches the Excel logic's final else)
  if (!isFinite(b) || !isFinite(u) || u <= 0) return 0;

  let result;

  if (b > 150 * u) result = b * 0.4 * u;
  else if (b > 120 * u) result = b * 0.35 * u;
  else if (b > 90 * u) result = b * 0.304 - 17.8 * u;
  else if (b > 70 * u) result = b * 0.23 - 11.14 * u;
  else if (b > 50 * u) result = b * 0.135 - 4.49 * u;
  else if (b > 30 * u) result = b * 0.08 - 1.74 * u;
  else if (b > 13.5 * u) result = b * 0.04 - 0.54 * u;
  else result = 0;

  return Math.round(result);
}