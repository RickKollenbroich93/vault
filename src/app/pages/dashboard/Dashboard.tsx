import React from 'react';
import styles from './Dashboard.module.css';

export default function Dashboard(): JSX.Element {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Your Password Vault</h1>
      <div className={styles.actionWrapper}>
        <input
          placeholder="MasterPassword"
          className={styles.inputfield}
        ></input>

        <button className={styles.subBtn}>Submit</button>
      </div>
    </div>
  );
}
