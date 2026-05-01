'use client';
import { useState, useEffect } from 'react';

export default function AdminSocial() {
  const [links, setLinks] = useState([]);
  const [formData, setFormData] = useState({ platform: '', url: '', icon: '' });

  useEffect(() => {
    fetch('/api/social').then(res => res.json()).then(setLinks);
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/social', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (res.ok) {
      const newLink = await res.json();
      setLinks([...links, newLink]);
      setFormData({ platform: '', url: '', icon: '' });
    }
  };

  const handleDelete = async (id) => {
    await fetch(`/api/social/${id}`, { method: 'DELETE' });
    setLinks(links.filter(l => l.id !== id));
  };

  const inputStyle = { width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: 'white', outline: 'none' };

  return (
    <div>
      <h2>Manage <span className="text-gradient">Social Links</span></h2>
      
      <form onSubmit={handleAdd} style={{ display: 'flex', gap: '1rem', marginTop: '2rem', background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '16px' }}>
        <input type="text" value={formData.platform} onChange={e => setFormData({...formData, platform: e.target.value})} placeholder="Platform (e.g. Twitter)" required style={inputStyle} />
        <input type="url" value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} placeholder="URL" required style={inputStyle} />
        <input type="text" value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} placeholder="Icon (emoji or text)" required style={inputStyle} />
        <button type="submit" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>Add Link</button>
      </form>

      <div style={{ marginTop: '2rem', background: 'var(--bg-secondary)', borderRadius: '16px', padding: '1rem' }}>
        {links.map(link => (
          <div key={link.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid var(--glass-border)' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <span style={{ fontSize: '1.5rem' }}>{link.icon}</span>
              <strong>{link.platform}</strong>
              <a href={link.url} target="_blank" style={{ color: 'var(--accent-1)' }}>{link.url}</a>
            </div>
            <button onClick={() => handleDelete(link.id)} className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', borderColor: 'transparent' }}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}
