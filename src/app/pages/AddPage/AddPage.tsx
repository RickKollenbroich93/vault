import React, { useState } from 'react';
import styles from './AddPage.module.css';
import BackButton from '../../components/BackButton/BackButton';
import GlitchHeader from '../../components/GlitchHeader/AddHeader';
import { useHistory } from 'react-router';

export default function AddPage(): JSX.Element {
  const history = useHistory();

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
    history.push('/');
  }

  return (
    <main className={styles.container}>
      <GlitchHeader />
      <div className={styles.pageWrapper}>
        <BackButton />
        <form
          onSubmit={(event) => {
            event.preventDefault();
            addCredential();
          }}
        >
          <h4>Enter Service</h4>
          <input
            type="text"
            placeholder="Service"
            value={newService}
            onChange={(event) => setNewService(event.target.value)}
            required
          />
          <h4>Enter Username</h4>
          <input
            type="text"
            placeholder="Username"
            value={newUsername}
            onChange={(event) => setNewUsername(event.target.value)}
            required
          />
          <h4>Enter Password</h4>
          <input
            type="text"
            placeholder="Password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            required
          />

          <h4>Enter MasterPassword</h4>

          <div className={styles.actionWrapper}>
            <input
              type="password"
              placeholder="MasterPassword"
              value={masterPassword}
              onChange={(event) => setMasterPassword(event.target.value)}
              required
            />

            <button type="submit" className={styles.subBtn}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
