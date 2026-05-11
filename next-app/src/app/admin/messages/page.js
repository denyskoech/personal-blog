'use client';
import { useState, useEffect } from 'react';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch('/api/messages').then(res => res.json()).then(setMessages);
  }, []);

  return (
    <div>
      <h2 className="text-h2">Contact Messages</h2>
      <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {messages.length === 0 && <p className="text-body">No messages found.</p>}
        {messages.map(msg => (
          <div key={msg.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>{msg.name}</strong> <span style={{ color: 'var(--text-secondary)' }}>({msg.email})</span>
              </div>
              <span className="text-small mono">{new Date(msg.date).toLocaleString()}</span>
            </div>
            <p className="text-body" style={{ whiteSpace: 'pre-wrap', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>{msg.message}</p>
            <div style={{ textAlign: 'right' }}>
              <a href={`mailto:${msg.email}?subject=Reply to your message on Dennis Koech Blog&body=Hi ${msg.name},%0D%0A%0D%0AReplying to your message: "${msg.message.substring(0, 50)}..."%0D%0A%0D%0A`} className="btn btn-secondary">
                Reply via Email ✉️
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
