import { openDb } from '@/lib/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CommentsSection from './CommentsSection';

export default async function BlogPost({ params }) {
  const { id } = await params;
  const db = await openDb();
  const post = await db.get('SELECT * FROM posts WHERE id = ?', [id]);
  const comments = await db.all('SELECT * FROM comments WHERE post_id = ? ORDER BY id ASC', [id]);

  if (!post) {
    notFound();
  }

  return (
    <article style={{ maxWidth: '800px', margin: '0 auto', minHeight: '80vh', paddingBottom: '5rem' }}>
      <Link href="/blog" className="eb-nav" style={{ color: 'var(--eb-fg2)', textDecoration: 'none', display: 'inline-block', marginBottom: '2rem' }}>
        ← Back to Blog
      </Link>
      
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="eb-body">By</span>
            <span className="eb-step" style={{ color: 'var(--eb-fg1)' }}>Dennis Koech</span>
          </div>
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--eb-border)' }}></div>
          <span className="eb-tag">{post.tag || 'General'}</span>
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--eb-border)' }}></div>
          <span className="eb-micro">{post.date}</span>
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--eb-border)' }}></div>
          <span className="eb-micro">{Math.max(1, Math.ceil(post.content.split(' ').length / 200))} min read</span>
        </div>
        <h1 className="eb-section-h" style={{ marginBottom: '2rem' }}>
          {post.title}
        </h1>
        {post.imageUrl && (
          <img src={post.imageUrl} alt={post.title} style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: 'var(--eb-radius-lg)', border: '1px solid var(--eb-border)' }} />
        )}
      </div>

      <div className="quill-content eb-body" dangerouslySetInnerHTML={{ __html: post.content }}>
      </div>

      <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <strong style={{ color: 'var(--text-primary)' }}>Share this post:</strong>
        <a href={`https://twitter.com/intent/tweet?text=Check out this post: ${encodeURIComponent(post.title)}&url=http://localhost:3000/blog/${id}`} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', textDecoration: 'none' }}>
          𝕏 Twitter
        </a>
        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=http://localhost:3000/blog/${id}`} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', textDecoration: 'none' }}>
          💼 LinkedIn
        </a>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=http://localhost:3000/blog/${id}`} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', textDecoration: 'none' }}>
          📘 Facebook
        </a>
      </div>

      <CommentsSection postId={id} initialComments={comments} />
    </article>
  );
}
