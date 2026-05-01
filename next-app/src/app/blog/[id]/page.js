import { openDb } from '@/lib/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function BlogPost({ params }) {
  const { id } = await params;
  const db = await openDb();
  const post = await db.get('SELECT * FROM posts WHERE id = ?', [id]);

  if (!post) {
    notFound();
  }

  return (
    <article style={{ padding: '8rem 5% 5rem', maxWidth: '800px', margin: '0 auto', minHeight: '80vh' }}>
      <Link href="/blog" style={{ color: 'var(--accent-1)', textDecoration: 'none', display: 'inline-block', marginBottom: '2rem' }}>
        ← Back to Blog
      </Link>
      
      <div style={{ marginBottom: '2rem' }}>
        <div className="blog-meta" style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>By</span>
            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Alex Carter</span>
          </div>
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--text-secondary)' }}></div>
          <span className="tag">{post.tag || 'General'}</span>
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--text-secondary)' }}></div>
          <span className="date">{post.date}</span>
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--text-secondary)' }}></div>
          <span style={{ color: 'var(--text-secondary)' }}>{Math.max(1, Math.ceil(post.content.split(' ').length / 200))} min read</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 800, marginBottom: '2rem', lineHeight: 1.2 }}>
          {post.title}
        </h1>
        {post.imageUrl && (
          <img src={post.imageUrl} alt={post.title} style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '16px', border: '1px solid var(--glass-border)' }} />
        )}
      </div>

      <div className="quill-content" style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-secondary)' }} dangerouslySetInnerHTML={{ __html: post.content }}>
      </div>
    </article>
  );
}
