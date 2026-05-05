'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });

    if (res.ok) {
      router.push('/admin');
      router.refresh();
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', marginTop: '4rem' }}>
      <form onSubmit={handleLogin} style={{ background: 'var(--eb-white)', padding: '3rem', borderRadius: 'var(--eb-radius-md)', border: '1px solid var(--eb-border)', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <h2 className="eb-section-h" style={{ marginBottom: '1rem' }}>Admin <span style={{ color: 'var(--eb-light-brown)' }}>Login</span></h2>
        <p className="eb-body" style={{ marginBottom: '2rem' }}>Enter the master password to continue</p>
        
        {error && <p className="eb-micro" style={{ color: 'var(--eb-success)', marginBottom: '1rem' }}>{error}</p>}
        
        <input 
          type="password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          placeholder="Password (admin123)" 
          required 
          style={{ width: '100%', padding: '1rem', marginBottom: '1.5rem', borderRadius: 'var(--eb-radius-sm)', border: '1px solid var(--eb-border)', background: 'var(--eb-white)', color: 'var(--eb-fg1)', outline: 'none', fontFamily: 'var(--eb-font-mono)' }} 
        />
        
        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>Login</button>
      </form>
    </div>
  );
}
