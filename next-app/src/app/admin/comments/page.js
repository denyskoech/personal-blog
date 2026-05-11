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
      setComments([newComment, ...comments]);
      setReplyingTo(null);
      setReplyContent('');
      alert('Reply posted successfully!');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this comment?')) {
      setComments(comments.filter(c => c.id !== id));
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 className="text-h2">Manage Comments</h2>
        <p className="text-body">View and reply to comments on your blog posts.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {comments.length === 0 && <p className="text-body">No comments found.</p>}
        {comments.map(c => (
          <div key={c.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>{c.name}</strong> on{' '}
                <Link href={`/blog/${c.post_id}`} style={{ color: 'var(--text-secondary)', textDecoration: 'underline' }}>
                  {c.post_title || `Post #${c.post_id}`}
                </Link>
              </div>
              <span className="text-small mono">{c.date}</span>
            </div>
            <p className="text-body" style={{ whiteSpace: 'pre-wrap', marginBottom: '1rem', color: 'var(--text-primary)' }}>{c.content}</p>
            
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => setReplyingTo(replyingTo === c.id ? null : c.id)} className="btn btn-secondary">
                {replyingTo === c.id ? 'Cancel' : 'Reply'}
              </button>
              <button onClick={() => handleDelete(c.id)} className="btn btn-secondary" style={{ color: 'var(--error)' }}>
                Delete
              </button>
            </div>

            {replyingTo === c.id && (
              <div style={{ marginTop: '1rem', padding: '1rem', background: 'var(--bg-main)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <textarea 
                  value={replyContent}
                  onChange={e => setReplyContent(e.target.value)}
                  placeholder="Write your reply as Author..."
                  style={{ width: '100%', minHeight: '80px', marginBottom: '1rem' }}
                />
                <button onClick={() => handleReply(c.post_id, c.id)} className="btn btn-primary">
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
