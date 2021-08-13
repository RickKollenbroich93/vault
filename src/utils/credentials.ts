import { Credential, DB } from '../types';
import { readFile, writeFile } from 'fs/promises';
import { deCrypt, enCript } from './crypto';

export async function readCredentials(key: string): Promise<Credential[]> {
  const response = await readFile('src/db.json', 'utf-8');
  const db: DB = JSON.parse(response);
  const credentials: Credential[] = db.credentials;
  const deCryptCredentials = credentials.map((credential) =>
    deCrypt(credential, key)
  );
  return deCryptCredentials;
}
export async function getCredential(
  service: string,
  key: string
): Promise<Credential> {
  const credentials = await readCredentials(key);
  const credential = credentials.find(
    (credential) => credential.service.toLowerCase() === service.toLowerCase()
  );

  if (!credential) {
    throw new Error(`ERROR, NO such Service WuuuUHahaHA !!!: ${service}`);
  }
  //   const deCryptCredential = deCrypt(credential, key);
  return credential;
}
export async function deleteCredential(
  service: string,
  key: string
): Promise<void> {
  const credentials = await readCredentials(key);
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
  const credentials = await readCredentials(key);
  const filteredCredential = credentials.filter(
    (credential) => credential.service.toLowerCase() !== service.toLowerCase()
  );
  const newDB: DB = {
    credentials: [...filteredCredential, enCript(credential, key)],
  };
  await overWriteDB(newDB);
}
export async function addCredential(
  credential: Credential,
  key: string
): Promise<void> {
  const response = await readFile('src/db.json', 'utf-8');
  const db: DB = JSON.parse(response);
  db.credentials = [...db.credentials, enCript(credential, key)];
  overWriteDB(db);
}
