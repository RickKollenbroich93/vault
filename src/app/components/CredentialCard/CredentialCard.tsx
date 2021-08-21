import React from 'react';
import { Credential } from '../../../types';
import styles from './CredentialCard.module.css';
import { Link } from 'react-router-dom';

type CredentialCardProps = {
  credentialData: Credential;
};
export default function CredentialCard({
  credentialData,
}: CredentialCardProps): JSX.Element {
  async function deleteCredential() {
    const response = await fetch(`/api/credentials/${credentialData.service}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'HASHcookie',
      },
    });
    console.log(await response.json());
  }

  return (
    <div className={styles.usercard}>
      <p>Service: {credentialData.service}</p>
      <p>Username: {credentialData.username}</p>
      <p>Password: {credentialData.password}</p>
      <div className={styles.buttonWrapper}>
        <button onClick={deleteCredential} className={styles.cardDeleteBtn}>
          🗑️
        </button>
        <Link to="/Edit">
          <button className={styles.cardEditBtn}>🖊️</button>
        </Link>
      </div>
    </div>
  );
}
