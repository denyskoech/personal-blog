import { openDb } from '@/lib/db';
import Link from 'next/link';
import ImageWithFallback from '@/components/ImageWithFallback';

export default async function BlogPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const db = await openDb();
  const query = resolvedSearchParams?.q || '';
  
  let posts = [];
  if (query) {
    posts = await db.all('SELECT * FROM posts WHERE title LIKE ? OR content LIKE ? ORDER BY id DESC', [`%${query}%`, `%${query}%`]);
  } else {
    posts = await db.all('SELECT * FROM posts ORDER BY id DESC');
  }

  return (
    <section className="section-padding">
      <div style={{ maxWidth: '800px', margin: '0 auto', minHeight: '80vh' }}>
        <div style={{ marginBottom: '3rem' }}>
          <h1 className="text-h1" style={{ marginBottom: '0.5rem' }}>The Blog</h1>
          <p className="text-body">Insights, tutorials, and stories.</p>
        </div>

        <div style={{ marginBottom: '3rem' }}>
          <form action="/blog" method="GET" style={{ display: 'flex', gap: '1rem' }}>
            <input 
              type="text" 
              name="q" 
              defaultValue={query} 
              placeholder="Search articles..." 
              style={{ flex: 1 }}
            />
            <button type="submit" className="btn btn-primary">Search</button>
          </form>
        </div>
        
        {posts.length === 0 ? (
          <p className="text-body">No articles found for "{query}".</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {posts.map((post) => (
            <article key={post.id} className="card" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              {post.imageUrl?.trim() && (
                <div style={{ flex: '0 0 200px', height: '150px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', background: 'var(--bg-elevated)' }}>
                  <ImageWithFallback src={post.imageUrl} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem', alignItems: 'center' }}>
                  <span className="tag">{post.tag || 'General'}</span>
                  <span className="text-micro">{post.date}</span>
                </div>
                <Link href={`/blog/${post.id}`}>
                  <h3 className="text-h3" style={{ marginBottom: '0.75rem', color: 'var(--text-primary)' }}>{post.title}</h3>
                </Link>
                <div className="text-body" style={{ marginBottom: '1rem', fontSize: '0.875rem' }}>
                  {post.content.replace(/<[^>]*>?/gm, '').substring(0, 150)}...
                </div>
                <Link href={`/blog/${post.id}`} className="text-small mono" style={{ color: 'var(--accent)', fontWeight: 500 }}>
                  READ ARTICLE
                </Link>
              </div>
            </article>
          ))}
        </div>
        )}
      </div>
    </section>
  );
}
