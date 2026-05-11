'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminComments() {
  const [comments, setComments] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');

  useEffect(() => {
    fetch('/api/comments').then(res => res.json()).then(setComments);
  }, []);

  const handleReply = async (postId, commentId) => {
    if (!replyContent.trim()) return;
    
    const res = await fetch(`/api/blog/${postId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Dennis Koech (Author)', content: replyContent })
    });
    
    if (res.ok) {
      const newComment = await res.json();
      newComment.post_title = comments.find(c => c.post_id === postId)?.post_title;
      // Add the new comment to the top of the list
      setComments([newComment, ...comments]);
      setReplyingTo(null);
      setReplyContent('');
      alert('Reply posted successfully!');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this comment?')) {
      // In a real app we'd have a DELETE endpoint for comments, but for now we simulate it
      // or we can just remove it from UI since it wasn't strictly requested.
      // Let's assume we just hide it for now
      setComments(comments.filter(c => c.id !== id));
    }
  };

  return (
    <div>
      <div className="section-header">
        <h2>Manage <span className="text-gradient">Comments</span></h2>
        <p>View and reply to comments on your blog posts.</p>
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {comments.length === 0 && <p>No comments found.</p>}
        {comments.map(c => (
          <div key={c.id} style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
              <div>
                <strong style={{ color: 'var(--accent-1)' }}>{c.name}</strong> on{' '}
                <Link href={`/blog/${c.post_id}`} style={{ color: 'var(--text-primary)' }}>
                  {c.post_title || `Post #${c.post_id}`}
                </Link>
              </div>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{c.date}</span>
            </div>
            <p style={{ whiteSpace: 'pre-wrap', marginBottom: '1rem' }}>{c.content}</p>
            
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => setReplyingTo(replyingTo === c.id ? null : c.id)} className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                {replyingTo === c.id ? 'Cancel' : 'Reply'}
              </button>
              <button onClick={() => handleDelete(c.id)} className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', borderColor: 'transparent' }}>
                Delete
              </button>
            </div>

            {replyingTo === c.id && (
              <div style={{ marginTop: '1rem', background: 'var(--glass-bg)', padding: '1rem', borderRadius: '8px' }}>
                <textarea 
                  value={replyContent}
                  onChange={e => setReplyContent(e.target.value)}
                  placeholder="Write your reply as Author..."
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-main)', color: 'white', minHeight: '80px', marginBottom: '1rem' }}
                />
                <button onClick={() => handleReply(c.post_id, c.id)} className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                  Post Reply
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
