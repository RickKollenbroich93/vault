import React from 'react';
import styles from './BackButton.module.css';
import { Link } from 'react-router-dom';

export default function Forgot(): JSX.Element {
  return (
    <Link to="/">
      <button className={styles.backBtn}>🔙</button>
    </Link>
  );
}
