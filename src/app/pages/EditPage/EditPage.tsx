import React, { useState } from 'react';
import styles from './EditPage.module.css';

export default function AddPage(): JSX.Element {
  const [masterPassword, setMasterPassword] = useState('');
  const [newService, setNewService] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  return (
    <main className={styles.container}>
      <h1>Edit your Credential</h1>
      <form
      // onSubmit={(event) => {
      //   event.preventDefault();
      //   addCredential();
      // }}
      >
        <h4>Enter Service</h4>
        <input
          type="text"
          placeholder="Service"
          onChange={(event) => setNewService(event.target.value)}
        />
        <h4>Enter Username</h4>
        <input
          type="text"
          placeholder="Username"
          onChange={(event) => setNewUsername(event.target.value)}
        />
        <h4>Enter Password</h4>
        <input
          type="text"
          placeholder="Password"
          onChange={(event) => setNewPassword(event.target.value)}
        />
        <h4>Enter MasterPassword</h4>
        <input
          type="password"
          placeholder="MasterPassword"
          onChange={(event) => setMasterPassword(event.target.value)}
        />

        <button type="submit" className={styles.subBtn}>
          Submit
        </button>
      </form>
    </main>
  );
}
