'use client';
import { useState, useEffect } from 'react';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch('/api/messages').then(res => res.json()).then(setMessages);
  }, []);

  return (
    <div>
      <h2>Contact <span className="text-gradient">Messages</span></h2>
      <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {messages.length === 0 && <p>No messages found.</p>}
        {messages.map(msg => (
          <div key={msg.id} style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
              <div>
                <strong>{msg.name}</strong> <span style={{ color: 'var(--text-secondary)' }}>({msg.email})</span>
              </div>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{new Date(msg.date).toLocaleString()}</span>
            </div>
            <p style={{ whiteSpace: 'pre-wrap', marginBottom: '1.5rem' }}>{msg.message}</p>
            <div style={{ textAlign: 'right' }}>
              <a href={`mailto:${msg.email}?subject=Reply to your message on Dennis Koech Blog&body=Hi ${msg.name},%0D%0A%0D%0AReplying to your message: "${msg.message.substring(0, 50)}..."%0D%0A%0D%0A`} className="btn btn-secondary" style={{ textDecoration: 'none', padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}>
                Reply via Email ✉️
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
