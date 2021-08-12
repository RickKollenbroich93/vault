import CryptoJS from 'crypto-js';
import { Credential } from '../types';

export function deCrypt(credential: Credential): Credential {
  const deCryptPassword = CryptoJS.TripleDES.decrypt(
    credential.password,
    'HASHcookie'
  ).toString(CryptoJS.enc.Utf8);
  const partiallyDeCryptedCredential = {
    ...credential,
    password: deCryptPassword,
  };
  return partiallyDeCryptedCredential;
}

export function enCript(credential: Credential): Credential {
  const cryptoPassword = CryptoJS.TripleDES.encrypt(
    credential.password,
    'HASHcookie'
  ).toString();
  const partiallyEncryptedCredential = {
    ...credential,
    password: cryptoPassword,
  };
  return partiallyEncryptedCredential;
}
