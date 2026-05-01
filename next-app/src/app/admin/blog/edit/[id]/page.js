'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import QuillEditor from '@/components/QuillEditor';

export default function BlogEditor() {
  const router = useRouter();
  const params = useParams();
  const isNew = params.id === 'new';
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ title: '', tag: '', imageUrl: '', content: '' });

  useEffect(() => {
    if (!isNew) {
      fetch(`/api/blog/${params.id}`)
        .then(res => res.json())
        .then(data => {
          if (data) setFormData(data);
        });
    }
  }, [params.id, isNew]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...formData, date: formData.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) };
      const res = await fetch(isNew ? '/api/blog' : `/api/blog/${params.id}`, {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) router.push('/admin/blog');
    } catch (err) {
      console.error(err);
      alert('Error saving post');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = { width: '100%', padding: '0.75rem 1rem', marginBottom: '1rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: 'white', fontFamily: 'inherit', outline: 'none' };

  return (
    <div>
      <h2>{isNew ? 'Create' : 'Edit'} <span className="text-gradient">Post</span></h2>
      <form onSubmit={handleSubmit} style={{ marginTop: '2rem', background: 'var(--bg-secondary)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
        <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required style={inputStyle} placeholder="Post Title" />
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input type="text" value={formData.tag} onChange={e => setFormData({...formData, tag: e.target.value})} style={{...inputStyle, flex: 1}} placeholder="Tag (e.g. Design)" />
          <input type="text" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} style={{...inputStyle, flex: 1}} placeholder="Cover Image URL" />
        </div>
        <div style={{ background: '#fff', color: '#000', borderRadius: '8px', marginBottom: '1rem', overflow: 'hidden' }}>
          <QuillEditor value={formData.content} onChange={val => setFormData({...formData, content: val})} style={{ height: '400px' }} />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', marginTop: '3rem' }}>
          {loading ? 'Saving...' : 'Save Post'}
        </button>
      </form>
    </div>
  );
}
