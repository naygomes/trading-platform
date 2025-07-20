import { validateCpf } from '../src/validateCpf';

test.each(['974.563.215-58', '71428793860', '877482488-00'])(
  'Should test a valid CPF: %s',
  (cpf: string) => {
    const isValid = validateCpf(cpf);
    expect(isValid).toBe(true);
  }
);

test.each([null, undefined, '11111111111', '111', '1111111111111111'])(
  'Should test an invalid CPF: %s',
  (cpf: any) => {
    const isValid = validateCpf(cpf);
    expect(isValid).toBe(false);
  }
);
