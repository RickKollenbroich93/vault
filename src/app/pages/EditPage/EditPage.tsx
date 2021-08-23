import React, { useState } from 'react';
import styles from './EditPage.module.css';
import { useHistory, useParams } from 'react-router';

export default function EditPage(): JSX.Element {
  const history = useHistory();
  const { service: serviceParam }: { service: string } = useParams();
  const [masterPassword, setMasterPassword] = useState('');
  const [newService, setNewService] = useState(serviceParam);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  async function EditCredential() {
    const newCredential = {
      service: newService,
      username: newUsername,
      password: newPassword,
    };

    const response = await fetch(`/api/credentials/${newCredential.service}`, {
      method: 'PATCH',
      headers: {
        Authorization: masterPassword,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCredential),
    });
    history.push('/');
    console.log(await response.json());
  }

  return (
    <main className={styles.container}>
      <h1>Edit your Credential</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          EditCredential();
        }}
      >
        <h4>Enter Service you want to Edit</h4>
        <input
          type="text"
          placeholder="Service"
          value={newService}
          onChange={(event) => setNewService(event.target.value)}
        />
        <h4>Enter new Username</h4>
        <input
          type="text"
          placeholder="Username"
          value={newUsername}
          onChange={(event) => setNewUsername(event.target.value)}
        />
        <h4>Enter new Password</h4>
        <input
          type="password"
          placeholder="Password"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
        />
        <h4>Enter MasterPassword</h4>
        <input
          type="password"
          placeholder="MasterPassword"
          value={masterPassword}
          onChange={(event) => setMasterPassword(event.target.value)}
        />

        <button type="submit" className={styles.subBtn}>
          Submit
        </button>
      </form>
    </main>
  );
}
