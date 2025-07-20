import express, { Request, Response } from "express";
import crypto from "crypto";
import pgp from "pg-promise";
const app = express();
app.use(express.json());

const connection = pgp()("postgres://postgres:123456@db:5432/app");

app.post("/signup", async (req: Request, res: Response) => {
  const account = req.body;
  const accountId = crypto.randomUUID();
  await connection.query(
    "insert into trading_platform.account (account_id, name, email, document, password) values ($1, $2, $3, $4, $5)",
    [accountId, account.name, account.email, account.document, account.password]
  );
  res.json({
    accountId,
  });
});

app.get("/accounts", async (req: Request, res: Response) => {
  const [account] = await connection.query(
    "select * from trading_platform.account",
    []
  );
  res.json(account);
});

app.get("/accounts/:accountId", async (req: Request, res: Response) => {
  const accountId = req.params.accountId;
  const [account] = await connection.query(
    "select * from trading_platform.account where account_id = $1",
    [accountId]
  );
  res.json(account);
});

app.listen(3000);
