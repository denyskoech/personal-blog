import { openDb } from '@/lib/db';
import Link from 'next/link';

export default async function BlogPage({ searchParams }) {
  const db = await openDb();
  const query = searchParams?.q || '';
  
  let posts = [];
  if (query) {
    posts = await db.all('SELECT * FROM posts WHERE title LIKE ? OR content LIKE ? ORDER BY id DESC', [`%${query}%`, `%${query}%`]);
  } else {
    posts = await db.all('SELECT * FROM posts ORDER BY id DESC');
  }

  return (
    <section className="blog-section" style={{ paddingTop: '8rem', minHeight: '80vh' }}>
      <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2>All <span className="text-gradient">Articles</span></h2>
          <p>Read my thoughts on various topics.</p>
        </div>
        <form action="/blog" method="GET" style={{ display: 'flex', gap: '0.5rem' }}>
          <input 
            type="text" 
            name="q" 
            defaultValue={query}
            placeholder="Search articles..." 
            style={{ padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: 'white', outline: 'none' }} 
          />
          <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>Search</button>
        </form>
      </div>
      
      {posts.length === 0 ? (
        <p style={{ color: 'var(--text-secondary)' }}>No articles found for "{query}".</p>
      ) : (
        <div className="blog-grid">
          {posts.map((post, index) => (
            <article className="blog-card" key={post.id}>
              <div className="blog-image">
                {post.imageUrl ? (
                  <img src={post.imageUrl} alt={post.title} />
                ) : (
                  <div className={`placeholder-img ${index % 2 === 0 ? 'bg-gradient-alt' : 'bg-gradient-dark'}`}></div>
                )}
              </div>
              <div className="blog-content">
                <div className="blog-meta">
                  <span className="tag">{post.tag || 'General'}</span>
                  <span className="date">{post.date}</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.content.substring(0, 100)}...</p>
                <Link href={`/blog/${post.id}`} className="read-more">Read Article →</Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
