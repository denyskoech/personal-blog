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
      <form onSubmit={handleLogin} className="card" style={{ width: '100%', maxWidth: '400px', textAlign: 'center', padding: '3rem 2rem' }}>
        <h2 className="text-h2" style={{ marginBottom: '1rem' }}>Admin Login</h2>
        <p className="text-body" style={{ marginBottom: '2rem' }}>Enter the master password to continue</p>
        
        {error && <p className="text-small" style={{ color: 'var(--error)', marginBottom: '1rem', fontWeight: 500 }}>{error}</p>}
        
        <input 
          type="password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          placeholder="Password (admin123)" 
          required 
          style={{ marginBottom: '1.5rem', textAlign: 'center' }} 
        />
        
        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>Login</button>
      </form>
    </div>
  );
}
