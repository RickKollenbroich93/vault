import {
  addCredential,
  deleteCredential,
  getCredential,
  readCredentials,
  updateCredential,
} from './utils/credentials';
import express from 'express';
import { Credential } from './types';
import { validateMasterPassword } from './utils/valid';
import dotenv from 'dotenv';
dotenv.config();
import { connectDatabase } from './utils/database';

if (!process.env.MONGODB_URL) {
  throw new Error('No MONGODB_URL dotenv variable');
}

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.patch('/api/credentials/:service', async (request, response) => {
  const { service } = request.params;
  const credential: Credential = request.body;
  const masterPassword = request.headers.authorization;
  if (!masterPassword) {
    response.status(400).send('Authorization header missing');
    return;
  } else if (!(await validateMasterPassword(masterPassword))) {
    response.status(401).send('Unauthorized request');
    return;
  }
  try {
    await updateCredential(service, credential, masterPassword);
    response.status(200).json(credential);
  } catch (error) {
    console.error(error);
    response.status(404).send(`Service: ${service} Not Found`);
  }
});

app.delete('/api/credentials/:service', async (request, response) => {
  const { service } = request.params;
  const masterPassword = request.headers.authorization;
  if (!masterPassword) {
    response.status(400).send('Authorization header missing');
    return;
  } else if (!(await validateMasterPassword(masterPassword))) {
    response.status(401).send('Unauthorized request');
    return;
  }
  await deleteCredential(service);
  response.status(200);
});

app.post('/api/credentials', async (request, response) => {
  const credential: Credential = request.body;
  const masterPassword = request.headers.authorization;
  if (!masterPassword) {
    response.status(400).send('Authorization header missing');
    return;
  } else if (!(await validateMasterPassword(masterPassword))) {
    response.status(401).send('Unauthorized request');
    return;
  }
  await addCredential(credential, masterPassword);
  return response.status(200).send(credential);
});

app.get('/api/credentials/:service', async (request, response) => {
  const { service } = request.params;
  const masterPassword = request.headers.authorization;
  if (!masterPassword) {
    response.status(400).send('Authorization header missing');
    return;
  } else if (!(await validateMasterPassword(masterPassword))) {
    response.status(401).send('Unauthorized request');
    return;
  }
  try {
    const credential = await getCredential(service, masterPassword);
    response.status(200).send(credential);
  } catch (error) {
    console.error(error);
    response.status(404).send(`Service: ${service} Not Found`);
  }
});

app.get('/api/credentials', async (req, res) => {
  const masterPassword = req.headers.authorization;
  if (!masterPassword) {
    res.status(400).send('Authorization header missing');
    return;
  } else if (!(await validateMasterPassword(masterPassword))) {
    res.status(401).send('Unauthorized request');
    return;
  }
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

connectDatabase(process.env.MONGODB_URL).then(() => {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}! 🚀`);
  });
});
