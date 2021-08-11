import { getCredential, readCredentials } from './utils/credentials';

// console.log('Hello server !!!!!!');

// readCredentials();
import express from 'express';
import { DB } from './types';

const app = express();
const port = 3000;

app.get('/api/credentials/:service', async (request, response) => {
  const { service } = request.params;
  try {
    const credential = await getCredential(service);
    response.status(200).send(credential);
  } catch (error) {
    console.error(error);
    response.status(404).send(`Service: ${service} Not Found`);
  }
});

app.get('/api/credentials', async (_req, res) => {
  try {
    const passwords = await readCredentials();
    res.status(200).send(passwords);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server Error');
  }
});

app.get('/', (_req, res) => {
  res.send('Hello World! Was geht ich bin dein SERVER!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
