'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminBlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this post?')) {
      await fetch(`/api/blog/${id}`, { method: 'DELETE' });
      setPosts(posts.filter(p => p.id !== id));
    }
  };

  if (loading) return <p>Loading posts...</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Manage <span className="text-gradient">Blog Posts</span></h2>
        <Link href="/admin/blog/edit/new" className="btn btn-primary">Create New Post</Link>
      </div>

      <div style={{ background: 'var(--bg-secondary)', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
              <th style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)' }}>Title</th>
              <th style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)' }}>Date</th>
              <th style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)' }}>Tag</th>
              <th style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                <td style={{ padding: '1rem' }}>{post.title}</td>
                <td style={{ padding: '1rem' }}>{post.date}</td>
                <td style={{ padding: '1rem' }}><span className="tag">{post.tag}</span></td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <Link href={`/admin/blog/edit/${post.id}`} className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', marginRight: '0.5rem' }}>Edit</Link>
                  <button onClick={() => handleDelete(post.id)} className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', background: 'rgba(239, 68, 68, 0.2)', borderColor: 'rgba(239, 68, 68, 0.5)', color: '#ef4444' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {posts.length === 0 && <p style={{ padding: '2rem', textAlign: 'center' }}>No posts found.</p>}
      </div>
    </div>
  );
}
