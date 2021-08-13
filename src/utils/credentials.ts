import type { Credential, DB } from '../types';
import { readFile, writeFile } from 'fs/promises';
import { decryptCredential, encryptCredential } from './crypto';

export async function readCredentials(): Promise<Credential[]> {
  const response = await readFile('src/db.json', 'utf-8');
  const db: DB = JSON.parse(response);
  const credentials: Credential[] = db.credentials;

  return credentials;
}
export async function getCredential(
  service: string,
  key: string
): Promise<Credential> {
  const credentials = await readCredentials();
  const credential = credentials.find(
    (credential) => credential.service.toLowerCase() === service.toLowerCase()
  );

  if (!credential) {
    throw new Error(`ERROR, NO such Service WuuuUHahaHA !!!: ${service}`);
  }
  const decryptedCredential = decryptCredential(credential, key);
  return decryptedCredential;
}
export async function deleteCredential(service: string): Promise<void> {
  const credentials = await readCredentials();
  const filteredCredentials = credentials.filter(
    (credential) => credential.service.toLowerCase() !== service.toLowerCase()
  );
  const db: DB = { credentials: filteredCredentials };
  overWriteDB(db);
}
async function overWriteDB(db: DB) {
  const dbString = JSON.stringify(db, null, 2);
  await writeFile('src/db.json', dbString);
}
export async function updateCredential(
  service: string,
  credential: Credential,
  key: string
): Promise<void> {
  const credentials = await readCredentials();
  const filteredCredential = credentials.filter(
    (credential) => credential.service.toLowerCase() !== service.toLowerCase()
  );
  const newDB: DB = {
    credentials: [...filteredCredential, encryptCredential(credential, key)],
  };
  await overWriteDB(newDB);
}
export async function addCredential(
  credential: Credential,
  key: string
): Promise<void> {
  const credentials = await readCredentials();

  const db: DB = {
    credentials: [...credentials, encryptCredential(credential, key)],
  };

  await overWriteDB(db);
}
