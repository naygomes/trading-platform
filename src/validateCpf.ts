const VALID_LENGHT = 11;

export function validateCpf(cpf: string) {
  if (!cpf) return false;
  cpf = cleanCpf(cpf);
  if (cpf.length !== VALID_LENGHT) return false;
  if (hasAllDigitsEqual(cpf)) return false;
  const dg1 = calculateCheckDigits(cpf, 10);
  const dg2 = calculateCheckDigits(cpf, 11);
  return extractCheckDigits(cpf) === `${dg1}${dg2}`;
}

function cleanCpf(cpf: string): string {
  return cpf.replace(/\D/g, '');
}

function hasAllDigitsEqual(cpf: string): boolean {
  const [firstDigit] = cpf;
  return cpf.split('').every((digit) => digit === firstDigit);
}

function calculateCheckDigits(cpf: string, factor: number): number {
  let total = 0;
  for (const digit of cpf) {
    if (factor > 1) total += parseInt(digit) * factor--;
  }
  const rest = total % 11;

  return rest < 2 ? 0 : 11 - rest;
}

function extractCheckDigits(cpf: string): string {
  return cpf.slice(9);
}
