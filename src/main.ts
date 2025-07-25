import express, { Request, Response } from 'express';
import crypto from 'crypto';
import pgp from 'pg-promise';
import { validateName } from './validateName';
import { validateEmail } from './validateEmail';
import { validateCpf } from './validateCpf';
import { validatePassword } from './validatePassword';
import { Signup } from './interfaces';
const app = express();
app.use(express.json());

const connection = pgp()('postgres://postgres:123456@db:5432/app');

function validateData(account: Signup): string | boolean {
  if (!validateName(account.name)) {
    return 'Invalid name';
  }
  if (!validateEmail(account.email)) {
    return 'Invalid email';
  }
  if (!validateCpf(account.document)) {
    return 'Invalid document';
  }
  if (!validatePassword(account.password)) {
    return 'Invalid password';
  }
  return true;
}

app.post('/signup', async (req: Request, res: Response) => {
  const account = req.body;
  const validationResult = validateData(account);
  if (typeof validationResult === 'string') {
    return res.status(400).json({ message: validationResult });
  }
  const accountId = crypto.randomUUID();
  await connection.query(
    'insert into trading_platform.account (account_id, name, email, document, password) values ($1, $2, $3, $4, $5)',
    [accountId, account.name, account.email, account.document, account.password]
  );
  res.json({
    accountId,
  });
});

app.get('/accounts', async (req: Request, res: Response) => {
  const [account] = await connection.query(
    'select * from trading_platform.account',
    []
  );
  res.json(account);
});

app.get('/accounts/:accountId', async (req: Request, res: Response) => {
  const accountId = req.params.accountId;
  const [account] = await connection.query(
    'select * from trading_platform.account where account_id = $1',
    [accountId]
  );
  res.json(account);
});

app.listen(3000);
