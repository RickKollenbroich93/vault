import React from 'react';
import styles from './Forgot.module.css';

export default function Forgot(): JSX.Element {
  return (
    <main className={styles.container}>
      <h1>Pech gehabt!!!</h1>
      <p className={styles.text}>😢 Du bekommst kein neues MasterPassword 😢</p>
    </main>
  );
}
