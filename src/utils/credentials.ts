import { Credential, DB } from '../types';
import { readFile, writeFile } from 'fs/promises';
import CryptoJS from 'crypto-js';

export async function readCredentials(): Promise<Credential[]> {
  const response = await readFile('src/db.json', 'utf-8');
  const db: DB = JSON.parse(response);
  const credentials = db.credentials;
  return credentials;
}
export async function getCredential(service: string): Promise<Credential> {
  const credentials = await readCredentials();
  const credential = credentials.find(
    (credential) => credential.service.toLowerCase() === service.toLowerCase()
  );
  if (!credential) {
    throw new Error(`ERROR, NO such Service WuuuUHahaHA !!!: ${service}`);
  }
  return credential;
}
export async function deleteCredential(service: string): Promise<void> {
  const credentials = await readCredentials();
  const filteredCredentials = credentials.filter(
    (credential) => credential.service.toLowerCase() !== service.toLowerCase()
  );
  const db: DB = { credentials: filteredCredentials };
  overWriteDB(db);
}

export async function addCredential(credential: Credential): Promise<void> {
  const response = await readFile('src/db.json', 'utf-8');
  const cryptoPassword = CryptoJS.TripleDES.encrypt(
    credential.password,
    'HASHcookie'
  ).toString();
  console.log(cryptoPassword);
  credential.password = cryptoPassword;
  const db: DB = JSON.parse(response);
  db.credentials = [...db.credentials, credential];
  overWriteDB(db);
}
async function overWriteDB(db: DB) {
  const dbString = JSON.stringify(db, null, 2);
  await writeFile('src/db.json', dbString);
}

export async function updateCredential(
  service: string,
  credential: Credential
): Promise<void> {
  const credentials = await readCredentials();
  const filteredCredential = credentials.filter(
    (credential) => credential.service.toLowerCase() !== service.toLowerCase()
  );
  const newDB: DB = { credentials: [...filteredCredential, credential] };
  await overWriteDB(newDB);
}
