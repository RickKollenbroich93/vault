import React from 'react';
import { useParams } from 'react-router-dom';

export default function Forgot(): JSX.Element {
  const { service } = useParams<{ service: string }>();
  return (
    <main>
      <p>Password: {service}</p>
    </main>
  );
}
