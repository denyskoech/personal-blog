'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function AdminSettings() {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    site_title: '',
    hero_title: '',
    hero_subtitle: '',
    about_content: '',
    favicon_url: '',
    color_bg_main: '#0a0a0f',
    color_bg_secondary: '#12121a',
    color_accent_1: '#6366f1',
    color_accent_2: '#ec4899'
  });

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => setSettings(prev => ({ ...prev, ...data })));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      alert('Settings saved successfully!');
    } catch (err) {
      alert('Error saving settings');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = { width: '100%', padding: '0.75rem 1rem', marginBottom: '1rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: 'white', fontFamily: 'inherit', outline: 'none' };
  const labelStyle = { display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-secondary)' };

  return (
    <div>
      <h2>Site <span className="text-gradient">Settings</span></h2>
      <form onSubmit={handleSubmit} style={{ marginTop: '2rem', background: 'var(--bg-secondary)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
        
        <h3 style={{ marginBottom: '1rem', color: 'var(--accent-1)' }}>Global Info</h3>
        <label style={labelStyle}>Site Title (also changes Favicon title)</label>
        <input type="text" value={settings.site_title} onChange={e => setSettings({...settings, site_title: e.target.value})} style={inputStyle} />
        
        <label style={labelStyle}>Favicon URL (Optional)</label>
        <input type="text" value={settings.favicon_url} onChange={e => setSettings({...settings, favicon_url: e.target.value})} style={inputStyle} placeholder="/favicon.ico or https://..." />
        
        <label style={labelStyle}>Hero Title</label>
        <input type="text" value={settings.hero_title} onChange={e => setSettings({...settings, hero_title: e.target.value})} style={inputStyle} />
        
        <label style={labelStyle}>Hero Subtitle</label>
        <input type="text" value={settings.hero_subtitle} onChange={e => setSettings({...settings, hero_subtitle: e.target.value})} style={inputStyle} />

        <h3 style={{ margin: '2rem 0 1rem', color: 'var(--accent-1)' }}>Colors</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={labelStyle}>Background Main</label>
            <input type="color" value={settings.color_bg_main} onChange={e => setSettings({...settings, color_bg_main: e.target.value})} style={{...inputStyle, padding: '0.2rem', height: '50px'}} />
          </div>
          <div>
            <label style={labelStyle}>Background Secondary</label>
            <input type="color" value={settings.color_bg_secondary} onChange={e => setSettings({...settings, color_bg_secondary: e.target.value})} style={{...inputStyle, padding: '0.2rem', height: '50px'}} />
          </div>
          <div>
            <label style={labelStyle}>Accent 1 (Gradient Start)</label>
            <input type="color" value={settings.color_accent_1} onChange={e => setSettings({...settings, color_accent_1: e.target.value})} style={{...inputStyle, padding: '0.2rem', height: '50px'}} />
          </div>
          <div>
            <label style={labelStyle}>Accent 2 (Gradient End)</label>
            <input type="color" value={settings.color_accent_2} onChange={e => setSettings({...settings, color_accent_2: e.target.value})} style={{...inputStyle, padding: '0.2rem', height: '50px'}} />
          </div>
        </div>

        <h3 style={{ margin: '2rem 0 1rem', color: 'var(--accent-1)' }}>About Page Content</h3>
        <div style={{ background: '#fff', color: '#000', borderRadius: '8px', marginBottom: '1rem', overflow: 'hidden' }}>
          <ReactQuill theme="snow" value={settings.about_content} onChange={val => setSettings({...settings, about_content: val})} style={{ height: '300px' }} />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', marginTop: '4rem' }}>
          {loading ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
}
