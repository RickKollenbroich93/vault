import React, { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';
import { Link } from 'react-router-dom';

export default function Dashboard(): JSX.Element {
  const [credentials, setCredentials] = useState<Credential[]>([]);

  useEffect(() => {
    async function fetchCredentials() {
      const response = await fetch('/api/credentials', {
        headers: {
          Authorization: 'HASHcookie',
        },
      });
      const credentials = await response.json();
      setCredentials(credentials);
    }
    fetchCredentials();
  }, []);

  return (
    <main className={styles.container}>
      <h1 className={styles.header}>Your Password Vault</h1>
      <div className={styles.actionWrapper}>
        <input
          placeholder="MasterPassword"
          className={styles.inputfield}
        ></input>
        {credentials &&
          credentials.forEach((credential) => console.log(credential))}

        <button className={styles.subBtn}>Submit</button>
      </div>
      <Link className={styles.link} to="/Forgot">
        Passwort vergessen ?
      </Link>
      <Link className={styles.link} to="/Password/service">
        Password Controll Center
      </Link>
    </main>
  );
}
