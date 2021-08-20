import React, { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';
import { Link } from 'react-router-dom';
import type { Credential } from '../../../types';
import CredentialCard from '../../components/CredentialCard/CredentialCard';
import Buttons from '../../components/Buttons/Buttons';

export default function Dashboard(): JSX.Element {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [masterPassword, setMasterPassword] = useState('');

  async function fetchCredentials() {
    const response = await fetch('/api/credentials', {
      headers: {
        Authorization: masterPassword,
      },
    });
    const credentials = await response.json();
    setCredentials(credentials);
  }

  useEffect(() => {
    if (!masterPassword) {
      setCredentials([]);
    }
  }, [masterPassword]);

  return (
    <main className={styles.container}>
      <div className={styles.h1Wrapper}>
        <h1 className={styles.header}>Your Password Vault</h1>
      </div>
      <form
        className={styles.actionWrapper}
        onSubmit={(event) => {
          event.preventDefault();
          fetchCredentials();
        }}
      >
        <input
          placeholder="MasterPassword"
          type="password"
          className={styles.inputfield}
          onChange={(event) => setMasterPassword(event.target.value)}
        ></input>
        {credentials &&
          credentials.forEach((credential) => console.log(credential))}

        <button type="submit" className={styles.subBtn}>
          Submit
        </button>
      </form>
      <Link className={styles.link} to="/Forgot">
        Passwort vergessen ?
      </Link>
      <Link className={styles.link} to="/Password/service">
        Password Controll Center
      </Link>
      <div className={styles.cardWrapper}>
        {credentials.length !== 0 &&
          credentials.map((credential) => (
            <CredentialCard credentialData={credential} />
          ))}
      </div>
      <Buttons />
    </main>
  );
}
