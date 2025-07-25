import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

test('Should create an acount', async () => {
  // Given
  const input = {
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    document: '97456321558',
    password: 'asdQWE123@',
  };
  // When
  const responseSignup = await axios.post(`${BASE_URL}/signup`, input);
  const outputSignup = responseSignup.data;
  // Then
  expect(outputSignup.accountId).toBeDefined();

  const responseGetAccount = await axios.get(
    `${BASE_URL}/accounts/${outputSignup.accountId}`
  );
  const outputGetAccount = responseGetAccount.data;
  expect(outputGetAccount.name).toBe(input.name);
  expect(outputGetAccount.email).toBe(input.email);
  expect(outputGetAccount.document).toBe(input.document);
  expect(outputGetAccount.password).toBe(input.password);
});

test.each([
  [
    {
      name: 'John_Doe',
      email: 'john.doe@gmail.com',
      document: '97456321558',
      password: 'asdQWE123@',
    },
    'Invalid name',
  ],
  [
    {
      name: 'John Doe',
      email: 'john@gmail',
      document: '97456321558',
      password: 'asdQWE123@',
    },
    'Invalid email',
  ],
  [
    {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      document: '123',
      password: 'asdQWE123@',
    },
    'Invalid document',
  ],
  [
    {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      document: '97456321558',
      password: 'senha123',
    },
    'Invalid password',
  ],
])(
  'Should not create an account with invalid data: %p',
  async (input, expectedMessage: string) => {
    let responseError = {} as any;
    try {
      await axios.post(`${BASE_URL}/signup`, input);
    } catch (error: Error | any) {
      responseError = error.response;
    }
    expect(responseError.status).toBe(400);
    expect(responseError.data.message).toBe(expectedMessage);
  }
);
