'use client';
import { useState, useEffect } from 'react';
import SocialIcon from '@/components/SocialIcon';

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

  const inputStyle = { width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-main)', color: 'var(--text-primary)', outline: 'none' };

  return (
    <div>
      <h2 className="text-h2">Manage Social Links</h2>
      
      <form onSubmit={handleAdd} className="card" style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        <input type="text" value={formData.platform} onChange={e => setFormData({...formData, platform: e.target.value})} placeholder="Platform (e.g. Twitter)" required style={inputStyle} />
        <input type="url" value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} placeholder="URL" required style={inputStyle} />
        <input type="text" value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} placeholder="Icon (optional, mapped by platform)" style={inputStyle} />
        <button type="submit" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>Add Link</button>
      </form>

      <div className="card" style={{ marginTop: '2rem', padding: '1rem' }}>
        {links.map(link => (
          <div key={link.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <span style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center' }}>
                <SocialIcon platform={link.platform} />
              </span>
              <strong style={{ color: 'var(--text-primary)' }}>{link.platform}</strong>
              <a href={link.url} target="_blank" className="text-small" style={{ color: 'var(--text-secondary)' }}>{link.url}</a>
            </div>
            <button onClick={() => handleDelete(link.id)} className="btn btn-secondary" style={{ color: 'var(--error)' }}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}
