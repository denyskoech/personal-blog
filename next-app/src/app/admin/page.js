'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminEditor() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    tag: '',
    imageUrl: '',
    content: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        })
      });
      
      if (res.ok) {
        const data = await res.json();
        router.push(`/blog/${data.id}`);
      } else {
        alert('Failed to create post');
      }
    } catch (err) {
      console.error(err);
      alert('Error creating post');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    marginBottom: '1rem',
    borderRadius: '8px',
    border: '1px solid var(--glass-border)',
    background: 'var(--glass-bg)',
    color: 'white',
    fontFamily: 'inherit',
    outline: 'none'
  };

  return (
    <section style={{ padding: '8rem 5% 5rem', maxWidth: '800px', margin: '0 auto', minHeight: '80vh' }}>
      <div className="section-header">
        <h2>Write a <span className="text-gradient">New Post</span></h2>
        <p>Create and publish a new article to your blog.</p>
      </div>

      <form onSubmit={handleSubmit} style={{ background: 'var(--bg-secondary)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Title</label>
          <input type="text" name="title" required value={formData.title} onChange={handleChange} style={inputStyle} placeholder="Post Title" />
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Tag / Category</label>
            <input type="text" name="tag" required value={formData.tag} onChange={handleChange} style={inputStyle} placeholder="e.g. Design, Engineering" />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Cover Image URL (Optional)</label>
            <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} style={inputStyle} placeholder="/assets/image.png" />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Content</label>
          <textarea name="content" required value={formData.content} onChange={handleChange} style={{ ...inputStyle, minHeight: '300px', resize: 'vertical' }} placeholder="Write your post content here... (Markdown not fully supported yet, plain text with line breaks)"></textarea>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}>
          {loading ? 'Publishing...' : 'Publish Post'}
        </button>
      </form>
    </section>
  );
}
