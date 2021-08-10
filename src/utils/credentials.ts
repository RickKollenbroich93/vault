import { readFile } from 'fs/promises';
import { DB } from '../types';

export async function readCredentials(): Promise<DB[]> {
  const response = await readFile('src/db.json', 'utf-8');
  const db = JSON.parse(response);
  const credentials = db.credentials;
  console.log(credentials);
  return credentials;
}
