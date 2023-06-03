import React from 'react';

export default function Unauthorized() {
  return (
    <div style={{ background: 'white', textAlign: 'center', color: 'grey', paddingTop: '20px', marginTop: '100px' }}>
      <h1 style={{ fontSize: '1em', fontWeight: 'bold' }}>ACCESS DENIED. YOU DON'T HAVE THE AUTHORIZATION</h1>
    </div>
  );
}
