import React, { useState } from 'react';
import styles from './AddPage.module.css';
import BackButton from '../../components/BackButton/BackButton';

export default function AddPage(): JSX.Element {
  const [masterPassword, setMasterPassword] = useState('');
  const [newService, setNewService] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  async function addCredential() {
    const newCredential = {
      service: newService,
      username: newUsername,
      password: newPassword,
    };

    const response = await fetch('/api/credentials/', {
      method: 'POST',
      headers: {
        Authorization: masterPassword,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCredential),
    });
    console.log(await response.json());
  }

  return (
    <main className={styles.container}>
      <h1>ADD new Credential</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          addCredential();
        }}
      >
        <div className={styles.contentWrapper}>
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
        </div>
        <div className={styles.actionWrapper}>
          <BackButton />
          <input
            type="password"
            placeholder="MasterPassword"
            onChange={(event) => setMasterPassword(event.target.value)}
          />

          <button type="submit" className={styles.subBtn}>
            Submit
          </button>
        </div>
      </form>
    </main>
  );
}
