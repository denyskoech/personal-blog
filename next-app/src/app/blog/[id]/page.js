import { openDb } from '@/lib/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CommentsSection from './CommentsSection';
import ShareButtons from '@/components/ShareButtons';
import ImageWithFallback from '@/components/ImageWithFallback';

export default async function BlogPost({ params }) {
  const { id } = await params;
  const db = await openDb();
  const post = await db.get('SELECT * FROM posts WHERE id = ?', [id]);
  const comments = await db.all('SELECT * FROM comments WHERE post_id = ? ORDER BY id ASC', [id]);

  if (!post) {
    notFound();
  }

  // Define full absolute URL for sharing
  const postUrl = `http://localhost:3000/blog/${id}`;
  const encodedTitle = encodeURIComponent(post.title);
  const encodedUrl = encodeURIComponent(postUrl);

  return (
    <article className="section-padding" style={{ maxWidth: '800px', margin: '0 auto', minHeight: '80vh', paddingBottom: '5rem' }}>
      <Link href="/blog" className="text-small mono" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'inline-block', marginBottom: '3rem' }}>
        ← Back to Blog
      </Link>
      
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="text-small" style={{ color: 'var(--text-secondary)' }}>By</span>
            <span className="text-small mono" style={{ color: 'var(--text-primary)' }}>Dennis Koech</span>
          </div>
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--border-subtle)' }}></div>
          <span className="tag">{post.tag || 'General'}</span>
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--border-subtle)' }}></div>
          <span className="text-micro">{post.date}</span>
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--border-subtle)' }}></div>
          <span className="text-micro">{Math.max(1, Math.ceil(post.content.split(' ').length / 200))} min read</span>
        </div>
        <h1 className="text-h1" style={{ marginBottom: '2rem', fontSize: '3rem', lineHeight: 1.2 }}>
          {post.title}
        </h1>
        {post.imageUrl?.trim() && (
          <ImageWithFallback src={post.imageUrl} alt={post.title} style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }} />
        )}
      </div>

      <div className="quill-content text-body" dangerouslySetInnerHTML={{ __html: post.content }} style={{ color: 'var(--text-primary)', fontSize: '1.125rem', lineHeight: 1.8 }}>
      </div>

      {/* Share Section */}
      <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
        <strong className="text-small mono" style={{ color: 'var(--text-primary)' }}>SHARE THIS POST</strong>
        <ShareButtons postUrl={postUrl} encodedTitle={encodedTitle} encodedUrl={encodedUrl} />
      </div>

      <CommentsSection postId={id} initialComments={comments} />
    </article>
  );
}
