import React, { useState, useEffect } from 'react';
import type { Credential } from '../../../types';
import CredentialCard from '../../components/CredentialCard/CredentialCard';
import styles from './SearchPage.module.css';
import GlitchHeader from '../../components/GlitchHeader/SearchHeader';
import { deleteCredential } from '../../utils/api';

export default function AddPage(): JSX.Element {
  const [credential, setCredential] = useState<Credential | null>();
  const [masterPassword, setMasterPassword] = useState('');
  const [searchService, setSearchService] = useState('');
  const [isError, setIsError] = useState<boolean>(false);

  async function findCredential() {
    const response = await fetch(`/api/credentials/${searchService}`, {
      headers: {
        Authorization: masterPassword,
      },
    });
    if (!response.ok) {
      setIsError(true);
      console.log('Credential not Found');
      return;
    }
    setIsError(false);
    const credential = await response.json();
    setCredential(credential);
  }
  async function handleDeleteClick(service: string) {
    await deleteCredential(service, masterPassword);
    setCredential(null);
    setIsError(false);
  }
  useEffect(() => {
    if (!masterPassword) {
      setCredential(null);
    }
  }, [masterPassword]);

  return (
    <main className={styles.container}>
      <GlitchHeader />
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
        <div className={styles.actioWrapper}>
          <input
            type="password"
            placeholder="MasterPassword"
            onChange={(event) => setMasterPassword(event.target.value)}
          />

          <button type="submit" className={styles.subBtn}>
            Search
          </button>
        </div>
      </form>
      <div className={styles.cardWrapper}>
        {credential && (
          <CredentialCard
            credentialData={credential}
            onDeleteClick={handleDeleteClick}
          />
        )}
      </div>
      {isError && <p>Something went wrong</p>}
    </main>
  );
}
