'use client';

import { useState } from 'react';

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate sending an email/message
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      e.target.reset();
    }, 1500);
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
    <section style={{ padding: '8rem 5% 5rem', maxWidth: '600px', margin: '0 auto', minHeight: '80vh' }}>
      <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2>Get In <span className="text-gradient">Touch</span></h2>
        <p>Have a question or want to work together? Leave a message.</p>
      </div>

      {success ? (
        <div style={{ padding: '2rem', background: 'rgba(45, 212, 191, 0.1)', border: '1px solid #2dd4bf', borderRadius: '16px', textAlign: 'center' }}>
          <h3 style={{ color: '#2dd4bf', marginBottom: '1rem' }}>Message Sent!</h3>
          <p>Thank you for reaching out. I'll get back to you as soon as possible.</p>
          <button onClick={() => setSuccess(false)} className="btn btn-secondary" style={{ marginTop: '1.5rem' }}>Send Another</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ background: 'var(--bg-secondary)', padding: '2.5rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Name</label>
            <input type="text" required style={inputStyle} placeholder="Your Name" />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Email</label>
            <input type="email" required style={inputStyle} placeholder="your.email@example.com" />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Message</label>
            <textarea required style={{ ...inputStyle, minHeight: '150px', resize: 'vertical' }} placeholder="How can I help you?"></textarea>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}>
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      )}
    </section>
  );
}
