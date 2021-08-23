import React from 'react';
import styles from './Buttons.module.css';
import { Link } from 'react-router-dom';

export default function Buttons(): JSX.Element {
  return (
    <div className={styles.buttonWrapper}>
      <Link to="/Search">
        <button className={styles.searchBtn}>🔎</button>
      </Link>
      <Link to="/Add">
        <button className={styles.addBtn}>+</button>
      </Link>
    </div>
  );
}
