'use client';
import { useState } from 'react';

export default function CommentsSection({ postId, initialComments }) {
  const [comments, setComments] = useState(initialComments || []);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    setLoading(true);
    const res = await fetch(`/api/blog/${postId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, content })
    });
    
    if (res.ok) {
      const newComment = await res.json();
      setComments([...comments, newComment]);
      setName('');
      setContent('');
    }
    setLoading(false);
  };

  const inputStyle = { width: '100%', padding: '0.75rem 1rem', marginBottom: '1rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: 'white', outline: 'none' };

  return (
    <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--glass-border)' }}>
      <h3 style={{ marginBottom: '2rem', fontSize: '1.8rem' }}>Comments ({comments.length})</h3>
      
      <div style={{ marginBottom: '3rem' }}>
        {comments.map(c => (
          <div key={c.id} style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px', marginBottom: '1rem', border: '1px solid var(--glass-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <strong style={{ color: 'var(--accent-1)' }}>{c.name}</strong>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{c.date}</span>
            </div>
            <p style={{ color: 'var(--text-primary)', lineHeight: 1.6 }}>{c.content}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} style={{ background: 'var(--bg-secondary)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
        <h4 style={{ marginBottom: '1.5rem' }}>Leave a comment</h4>
        <input 
          type="text" 
          placeholder="Name (optional)" 
          value={name} 
          onChange={e => setName(e.target.value)} 
          style={inputStyle} 
        />
        <textarea 
          required 
          placeholder="Your comment..." 
          value={content} 
          onChange={e => setContent(e.target.value)} 
          style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
        />
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Posting...' : 'Post Comment'}
        </button>
      </form>
    </div>
  );
}
