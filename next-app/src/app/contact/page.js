'use client';

import { useState } from 'react';

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    marginBottom: '1.5rem',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--border-subtle)',
    background: 'var(--bg-main)',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-mono)',
    outline: 'none'
  };

  return (
    <section className="section-padding">
      <div className="container" style={{ maxWidth: '600px' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="text-h1">Get In Touch</h2>
          <p className="text-body" style={{ marginTop: '0.5rem' }}>Have a question or want to work together? Leave a message.</p>
        </div>

        {success ? (
          <div className="card" style={{ textAlign: 'center', border: '1px solid var(--accent)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
            <h3 className="text-h2" style={{ marginBottom: '1rem' }}>Message Sent</h3>
            <p className="text-body" style={{ marginBottom: '2rem' }}>Thanks for reaching out. I'll get back to you as soon as possible.</p>
            <button onClick={() => setSuccess(false)} className="btn btn-primary">Send Another Message</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="card">
            <div>
              <label className="text-small mono" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Name</label>
              <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={inputStyle} placeholder="Your Name" />
            </div>
            
            <div>
              <label className="text-small mono" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Email</label>
              <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={inputStyle} placeholder="your.email@example.com" />
            </div>

            <div>
              <label className="text-small mono" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Message</label>
              <textarea required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} style={{ ...inputStyle, minHeight: '150px', resize: 'vertical' }} placeholder="How can I help you?"></textarea>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', padding: '1rem', marginTop: '1rem' }}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
