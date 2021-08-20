import React from 'react';
import styles from './SearchPage.module.css';

export default function AddPage(): JSX.Element {
  return (
    <main className={styles.container}>
      <h1>Search for Service</h1>
      <form>
        <h4>Enter Service</h4>
        <input type="text" placeholder="Service" />
        <h4>Enter MasterPassword</h4>
        <input type="password" placeholder="MasterPassword" />

        <button type="submit" className={styles.subBtn}>
          Submit
        </button>
      </form>
    </main>
  );
}
