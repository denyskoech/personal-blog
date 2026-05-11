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

  if (loading) return <p className="text-body">Loading posts...</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 className="text-h2">Manage Blog Posts</h2>
        <Link href="/admin/blog/edit/new" className="btn btn-primary">Create New Post</Link>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--bg-elevated)' }}>
              <th className="text-small mono" style={{ padding: '1rem', borderBottom: '1px solid var(--border-subtle)' }}>Title</th>
              <th className="text-small mono" style={{ padding: '1rem', borderBottom: '1px solid var(--border-subtle)' }}>Date</th>
              <th className="text-small mono" style={{ padding: '1rem', borderBottom: '1px solid var(--border-subtle)' }}>Tag</th>
              <th className="text-small mono" style={{ padding: '1rem', borderBottom: '1px solid var(--border-subtle)', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td className="text-body" style={{ padding: '1rem', color: 'var(--text-primary)' }}>{post.title}</td>
                <td className="text-small" style={{ padding: '1rem' }}>{post.date}</td>
                <td style={{ padding: '1rem' }}><span className="tag">{post.tag}</span></td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <Link href={`/admin/blog/edit/${post.id}`} className="btn btn-secondary" style={{ marginRight: '0.5rem' }}>Edit</Link>
                  <button onClick={() => handleDelete(post.id)} className="btn btn-secondary" style={{ color: 'var(--error)' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {posts.length === 0 && <p className="text-body" style={{ padding: '2rem', textAlign: 'center' }}>No posts found.</p>}
      </div>
    </div>
  );
}
