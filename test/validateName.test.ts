import { validateName } from '../src/validateName';

test.each([
  'Ben',
  ' Alcione Dias Nazareth',
  'Jessé Gomes da Silva Filho Zeca Pagodinho',
  'Beth Carvalho ',
])('Deve testar um nome válido: %s', (name: string) => {
  const isValid = validateName(name);
  expect(isValid).toBe(true);
});

test.each([
  null,
  undefined,
  '',
  'Jo',
  'Ivone Lara da Silva Souza Oliveira dos Santos Pereira',
  'João Nogu3ir4',
  'Jorg& Ar@gã0',
])('Deve testar um nome inválido: %s', (name: any) => {
  const isValid = validateName(name);
  expect(isValid).toBe(false);
});
