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
    borderRadius: '8px',
    border: '1px solid var(--glass-border)',
    background: 'var(--glass-bg)',
    color: 'white',
    fontFamily: 'inherit',
    outline: 'none'
  };

  return (
    <section style={{ maxWidth: '800px', margin: '0 auto', minHeight: '80vh', padding: '4rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 className="eb-section-h">Get In <span style={{ color: 'var(--eb-light-brown)' }}>Touch</span></h2>
        <p className="eb-body" style={{ marginTop: '0.5rem' }}>Have a question or want to work together? Leave a message.</p>
      </div>

      {success ? (
        <div style={{ background: 'rgba(26, 156, 67, 0.1)', padding: '3rem', borderRadius: 'var(--eb-radius-md)', textAlign: 'center', border: '1px solid var(--eb-success)' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✨</div>
          <h3 className="eb-section-h" style={{ marginBottom: '1rem' }}>Message Sent!</h3>
          <p className="eb-body" style={{ marginBottom: '2rem' }}>Thanks for reaching out. I'll get back to you as soon as possible.</p>
          <button onClick={() => setSuccess(false)} className="btn btn-primary">Send Another Message</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ background: 'var(--eb-white)', padding: '2.5rem', borderRadius: 'var(--eb-radius-md)', border: '1px solid var(--eb-border)' }}>
          <div>
            <label className="eb-nav" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--eb-fg1)' }}>Name</label>
            <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={inputStyle} placeholder="Your Name" />
          </div>
          
          <div>
            <label className="eb-nav" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--eb-fg1)' }}>Email</label>
            <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={inputStyle} placeholder="your.email@example.com" />
          </div>

          <div>
            <label className="eb-nav" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--eb-fg1)' }}>Message</label>
            <textarea required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} style={{ ...inputStyle, minHeight: '150px', resize: 'vertical' }} placeholder="How can I help you?"></textarea>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', marginTop: '1rem' }}>
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      )}
    </section>
  );
}
