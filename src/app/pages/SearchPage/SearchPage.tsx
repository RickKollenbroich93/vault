import React, { useState, useEffect } from 'react';
import type { Credential } from '../../../types';
import CredentialCard from '../../components/CredentialCard/CredentialCard';
import styles from './SearchPage.module.css';

export default function AddPage(): JSX.Element {
  const [credential, setCredential] = useState<Credential | null>();
  const [masterPassword, setMasterPassword] = useState('');
  const [searchService, setSearchService] = useState('');

  async function findCredential() {
    const response = await fetch(`/api/credentials/${searchService}`, {
      headers: {
        Authorization: masterPassword,
      },
    });
    const credential = await response.json();
    setCredential(credential);
  }

  useEffect(() => {
    if (!masterPassword) {
      setCredential(null);
    }
  }, [masterPassword]);

  return (
    <main className={styles.container}>
      <h1>Search for Service</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          findCredential();
        }}
      >
        <h4>Enter Service</h4>
        <input
          type="text"
          placeholder="Service"
          onChange={(event) => setSearchService(event.target.value)}
        />
        <h4>Enter MasterPassword</h4>
        <input
          type="password"
          placeholder="MasterPassword"
          onChange={(event) => setMasterPassword(event.target.value)}
        />

        <button type="submit" className={styles.subBtn}>
          Search
        </button>
      </form>
      <div className={styles.cardWrapper}>
        {credential && <CredentialCard credentialData={credential} />}
      </div>
    </main>
  );
}
