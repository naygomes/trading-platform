import { validatePassword } from '../src/validatePassword';

test.each(['Senha123@'])('Should test a valid password: %s', (name: string) => {
  const isValid = validatePassword(name);
  expect(isValid).toBe(true);
});

test.each([
  null,
  undefined,
  '',
  'S3nh@',
  'senha123@',
  'SENHA123@',
  'Senha!zE',
  'Senh@ 123',
])('Should test an invalid password: %s', (name: any) => {
  const isValid = validatePassword(name);
  expect(isValid).toBe(false);
});
