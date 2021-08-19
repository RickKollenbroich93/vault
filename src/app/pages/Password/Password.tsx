import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './Password.module.css';

export default function Forgot(): JSX.Element {
  const { service } = useParams<{ service: string }>();
  return (
    <main className={styles.container}>
      <p className={styles.text}>Password: {service}</p>
    </main>
  );
}
