import CryptoJS from 'crypto-js';
import { Credential } from '../types';

export function decryptCredential(
  credential: Credential,
  key: string
): Credential {
  const deCryptPassword = CryptoJS.TripleDES.decrypt(
    credential.password,
    key
  ).toString(CryptoJS.enc.Utf8);
  const partiallyDeCryptedCredential = {
    ...credential,
    password: deCryptPassword,
  };
  return partiallyDeCryptedCredential;
}

export function encryptCredential(
  credential: Credential,
  key: string
): Credential {
  const cryptoPassword = CryptoJS.TripleDES.encrypt(
    credential.password,
    key
  ).toString();
  const partiallyEncryptedCredential = {
    ...credential,
    password: cryptoPassword,
  };
  return partiallyEncryptedCredential;
}
