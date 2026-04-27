import { openDb } from '@/lib/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function BlogPost({ params }) {
  const db = await openDb();
  const post = await db.get('SELECT * FROM posts WHERE id = ?', [params.id]);

  if (!post) {
    notFound();
  }

  return (
    <article style={{ padding: '8rem 5% 5rem', maxWidth: '800px', margin: '0 auto', minHeight: '80vh' }}>
      <Link href="/blog" style={{ color: 'var(--accent-1)', textDecoration: 'none', display: 'inline-block', marginBottom: '2rem' }}>
        ← Back to Blog
      </Link>
      
      <div style={{ marginBottom: '2rem' }}>
        <div className="blog-meta" style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <span className="tag">{post.tag || 'General'}</span>
          <span className="date">{post.date}</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 800, marginBottom: '2rem', lineHeight: 1.2 }}>
          {post.title}
        </h1>
        {post.imageUrl && (
          <img src={post.imageUrl} alt={post.title} style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '16px', border: '1px solid var(--glass-border)' }} />
        )}
      </div>

      <div style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
        {post.content.split('\n').map((paragraph, i) => (
          <p key={i} style={{ marginBottom: '1.5rem' }}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
