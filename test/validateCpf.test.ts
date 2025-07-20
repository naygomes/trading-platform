import { validateCpf } from '../src/validateCpf';

test.each(['974.563.215-58', '714.287.938-60', '877.482.488-00'])(
  'Deve testar um cpf válido com formatação: %s',
  (cpf: string) => {
    const isValid = validateCpf(cpf);
    expect(isValid).toBe(true);
  }
);

test.each([null, undefined, '11111111111', '111', '1111111111111111'])(
  'Deve testar um cpf inválido: %s',
  (cpf: any) => {
    const isValid = validateCpf(cpf);
    expect(isValid).toBe(false);
  }
);
