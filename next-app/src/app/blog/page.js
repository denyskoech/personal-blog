import { openDb } from '@/lib/db';
import Link from 'next/link';

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
    <section className="blog-section">
      <div style={{ maxWidth: '800px', margin: '0 auto', minHeight: '80vh', paddingBottom: '4rem' }}>
        <div style={{ marginBottom: '3rem' }}>
          <h1 className="eb-hero-sector" style={{ marginBottom: '0.5rem' }}>The <span style={{ color: 'var(--eb-light-brown)' }}>Blog</span></h1>
          <p className="eb-body">Insights, tutorials, and stories.</p>
        </div>

        <div style={{ marginBottom: '3rem' }}>
          <form action="/blog" method="GET" style={{ display: 'flex', gap: '1rem' }}>
            <input 
              type="text" 
              name="q" 
              defaultValue={query} 
              placeholder="Search articles..." 
              style={{ flex: 1, padding: '1rem 1.5rem', borderRadius: 'var(--eb-radius-sm)', border: '1px solid var(--eb-border)', background: 'var(--eb-white)', color: 'var(--eb-fg1)', outline: 'none' }}
            />
            <button type="submit" className="btn btn-primary">Search</button>
          </form>
        </div>
        
        {posts.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)' }}>No articles found for "{query}".</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {posts.map((post) => (
            <article key={post.id} style={{ display: 'flex', gap: '2rem', padding: '1.5rem', background: 'var(--eb-white)', border: '1px solid var(--eb-border)', borderRadius: 'var(--eb-radius-md)', alignItems: 'center' }}>
              {post.imageUrl && (
                <div style={{ flex: '0 0 200px', height: '150px', borderRadius: 'var(--eb-radius-sm)', overflow: 'hidden' }}>
                  <img src={post.imageUrl} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem', alignItems: 'center' }}>
                  <span className="eb-tag">{post.tag || 'General'}</span>
                  <span className="eb-micro">{post.date}</span>
                </div>
                <Link href={`/blog/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h3 className="eb-card-title" style={{ marginBottom: '0.75rem', fontSize: '1.5rem' }}>{post.title}</h3>
                </Link>
                <div className="eb-body" dangerouslySetInnerHTML={{ __html: post.content.substring(0, 150) + '...' }} style={{ marginBottom: '1rem' }} />
                <Link href={`/blog/${post.id}`} className="eb-nav" style={{ textDecoration: 'none', color: 'var(--eb-fg1)', textDecorationLine: 'underline' }}>Read Article</Link>
              </div>
            </article>
          ))}
        </div>
        )}
      </div>
    </section>
  );
}
