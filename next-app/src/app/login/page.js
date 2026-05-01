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
      <form onSubmit={handleLogin} style={{ background: 'var(--bg-secondary)', padding: '3rem', borderRadius: '16px', border: '1px solid var(--glass-border)', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '1rem' }}>Admin <span className="text-gradient">Login</span></h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Enter the master password to continue</p>
        
        {error && <p style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</p>}
        
        <input 
          type="password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          placeholder="Password (admin123)" 
          required 
          style={{ width: '100%', padding: '0.75rem 1rem', marginBottom: '1.5rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: 'white', outline: 'none' }} 
        />
        
        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem' }}>Login</button>
      </form>
    </div>
  );
}
