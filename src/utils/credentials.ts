import type { Credential } from '../types';
import { decryptCredential, encryptCredential } from './crypto';
import { getCredentialCollection } from './database';

export async function readCredentials(): Promise<Credential[]> {
  const collection = getCredentialCollection();
  const credentials = await collection.find().toArray();
  return credentials;
}
export async function getCredential(
  service: string,
  key: string
): Promise<Credential> {
  const collection = getCredentialCollection();
  const credential = await collection.findOne({ service });

  if (!credential) {
    throw new Error(`No credential found for service: ${service}`);
  }

  return decryptCredential(credential, key);
}
export async function deleteCredential(service: string): Promise<void> {
  const collection = getCredentialCollection();
  collection.findOneAndDelete({ service });
}
export async function updateCredential(
  service: string,
  credential: Credential,
  key: string
): Promise<void> {
  const encrptedCredential = encryptCredential(credential, key);
  const collection = getCredentialCollection();
  collection.findOneAndReplace({ service }, encrptedCredential);
}
export async function addCredential(
  credential: Credential,
  key: string
): Promise<void> {
  const collection = getCredentialCollection();
  const newCredential = encryptCredential(credential, key);
  collection.insertOne(newCredential);
}
