import { readCredentials } from './utils/credentials';

// console.log('Hello server !!!!!!');

// readCredentials();
import express from 'express';
import { DB } from './types';

const app = express();
const port = 3000;

app.get('/api/credentials', async (_req, res) => {
  const passwords = await readCredentials();
  res.status(200).send(passwords);
});

app.get('/', (_req, res) => {
  res.send('Hello World! Was geht ich bin dein SERVER!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
