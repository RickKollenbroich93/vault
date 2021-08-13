import { readFile } from 'fs/promises';
import CryptoJS from 'crypto-js';
export async function validateMasterPassword(
  password: string
): Promise<boolean> {
  const hashedMasterPassword = await readFile('.password', 'utf8');

  const hashedPassword = CryptoJS.SHA256(password).toString();

  return hashedPassword === hashedMasterPassword;
}
