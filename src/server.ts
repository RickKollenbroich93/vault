import {
  addCredential,
  deleteCredential,
  getCredential,
  readCredentials,
  updateCredential,
} from './utils/credentials';
import express, { response } from 'express';
import { Credential } from './types';

const app = express();
const port = 3000;

app.use(express.json());

app.put('/api/credentials/:service', async (request, response) => {
  const { service } = request.params;
  const credential: Credential = request.body;
  try {
    updateCredential(service, credential);
    response.status(200).json(credential);
  } catch (error) {
    console.error(error);
    response.status(404).send(`Service: ${service} Not Found`);
  }
});

app.delete('/api/credentials/:service', async (request, response) => {
  const { service } = request.params;
  await deleteCredential(service);
  response.status(200);
});

app.post('/api/credentials', async (request, response) => {
  const credential: Credential = request.body;
  await addCredential(credential);
  response.status(200);
});

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
