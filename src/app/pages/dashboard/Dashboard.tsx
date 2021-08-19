import React from 'react';
import styles from './Dashboard.module.css';
import { Link } from 'react-router-dom';

export default function Dashboard(): JSX.Element {
  return (
    <main className={styles.container}>
      <h1 className={styles.header}>Your Password Vault</h1>
      <div className={styles.actionWrapper}>
        <input
          placeholder="MasterPassword"
          className={styles.inputfield}
        ></input>

        <button className={styles.subBtn}>Submit</button>
      </div>
      <Link className={styles.link} to="/Forgot">
        Passwort vergessen ?
      </Link>
    </main>
  );
}
