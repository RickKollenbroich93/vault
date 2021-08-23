import React from 'react';
import { Credential } from '../../../types';
import styles from './CredentialCard.module.css';
import { Link } from 'react-router-dom';

type CredentialCardProps = {
  credentialData: Credential;
  onDeleteClick: (service: string) => void;
};
export default function CredentialCard({
  credentialData,
  onDeleteClick,
}: CredentialCardProps): JSX.Element {
  return (
    <div className={styles.usercard}>
      <p>Service: {credentialData.service}</p>
      <p>Username: {credentialData.username}</p>
      <p>Password: {credentialData.password}</p>
      <div className={styles.buttonWrapper}>
        <button
          onClick={() => onDeleteClick(credentialData.service)}
          className={styles.cardDeleteBtn}
        >
          🗑️
        </button>
        <Link to="/Edit">
          <button className={styles.cardEditBtn}>🖊️</button>
        </Link>
      </div>
    </div>
  );
}
