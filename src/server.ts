console.log('Hello server !!!!!!');

import { readFile } from 'fs/promises';

async function readingPassword() {
  const promise = await readFile('src/db.json', 'utf-8');

  console.log(promise);
  return promise;
}
readingPassword();
