import { validateEmail } from '../src/validateEmail';

test.each([
  ' ben@gmail.com',
  'alcione_Dias@gmail.com.br',
  'ZECA.pagodinho71@hotmail.br',
  'beth.c4rv4lh0@icloud.com ',
])('Should test a valid email: %s', (email: string) => {
  const isValid = validateEmail(email);
  expect(isValid).toBe(true);
});

test.each([
  null,
  undefined,
  '',
  'Jo@g',
  'cartola@icloud',
  'martinho@da_vila@icloud.com',
  'jorge_aragao_hotmail.com',
  'arlindo cruz@gmail.com',
  'ivone_lara_silva_souza_santos_pereira25@sambista.com.br',
  'joão_nogueir4@samba.br',
])('Should test an invalid email: %s', (email: any) => {
  const isValid = validateEmail(email);
  expect(isValid).toBe(false);
});
