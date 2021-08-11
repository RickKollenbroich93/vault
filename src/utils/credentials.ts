import { readFile } from 'fs/promises';
import { Credential, DB } from '../types';
import fs from 'fs';

export async function readCredentials(): Promise<Credential[]> {
  const response = await readFile('src/db.json', 'utf-8');
  const db: DB = JSON.parse(response);
  const credentials = db.credentials;
  console.log(credentials);
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
//const credentials = await readCredentials();
//const newCredentials=[...credentials,credential]
//const newDB:DB={credentials:newCredentials,}
//await writeFile('src/db.json', JSON.stringify(newDB, null, 2));

export async function addCredential(credential: Credential): Promise<void> {
  const response = await readFile('src/db.json', 'utf-8');
  const db: DB = JSON.parse(response);
  db.credentials = [...db.credentials, credential];
  overWriteDB(db);
}
function overWriteDB(db: DB) {
  const dbString = JSON.stringify(db, null, 2);
  fs.writeFile('src/db.json', dbString, (err) => {
    if (err) {
      console.error(err);
      return false;
    }
    return true;
  });
  return true;
}
