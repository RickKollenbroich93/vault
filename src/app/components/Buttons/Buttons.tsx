import React from 'react';
import styles from './Buttons.module.css';

export default function Forgot(): JSX.Element {
  return (
    <div className={styles.buttonWrapper}>
      <button className={styles.searchBtn}>🔎</button>
      <button className={styles.addBtn}>+</button>
    </div>
  );
}
