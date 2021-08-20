import React from 'react';
import styles from './AddPage.module.css';

export default function AddPage(): JSX.Element {
  return (
    <main className={styles.container}>
      <h1>ADD new Credential</h1>
      <form>
        <h4>Enter Service</h4>
        <input type="text" placeholder="Service" />
        <h4>Enter Username</h4>
        <input type="text" placeholder="Username" />
        <h4>Enter Password</h4>
        <input type="text" placeholder="Password" />
        <h4>Enter MasterPassword</h4>
        <input type="password" placeholder="MasterPassword" />

        <button type="submit" className={styles.subBtn}>
          Submit
        </button>
      </form>
    </main>
  );
}
