import Link from 'next/link';
import { openDb } from '@/lib/db';

export default async function Home() {
  const db = await openDb();
  const posts = await db.all('SELECT * FROM posts ORDER BY id DESC LIMIT 3');
  
  const settingsRaw = await db.all('SELECT * FROM settings WHERE key IN ("hero_title", "hero_subtitle")');
  const settings = settingsRaw.reduce((acc, row) => ({ ...acc, [row.key]: row.value }), {});

  return (
    <>
      <section id="home" className="hero">
        <div className="hero-content">
          <h1 className="eb-hero">{settings.hero_title || 'Crafting Digital Experiences.'}</h1>
          <p className="eb-body" style={{ marginTop: '1.5rem', marginBottom: '2.5rem', maxWidth: '80%' }}>
            {settings.hero_subtitle || "Hi, I'm Dennis. I build modern, interactive, and beautiful web applications."}
          </p>
          <div className="hero-actions">
            <Link href="/blog" className="btn btn-primary">Read My Blog</Link>
            <Link href="/contact" className="btn btn-secondary">Get In Touch</Link>
          </div>
        </div>
        <div className="hero-image-container">
          <img src="/assets/profile.png" alt="Profile" style={{ width: '300px', height: '400px', objectFit: 'cover', borderRadius: 'var(--eb-radius-md)' }} />
        </div>
      </section>

      <section id="blog" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div style={{ marginBottom: '3rem' }}>
          <h2 className="eb-section-h">Latest <span style={{ color: 'var(--eb-light-brown)' }}>Writings</span></h2>
          <p className="eb-body">Thoughts on engineering, design, and life.</p>
        </div>
        
        <div className="blog-grid">
          {posts.map((post, index) => (
            <article className="blog-card" key={post.id}>
              <Link href={`/blog/${post.id}`} style={{ display: 'block', overflow: 'hidden', borderRadius: 'var(--eb-radius-sm)', height: '200px', marginBottom: '1rem' }}>
                {post.imageUrl ? (
                  <img src={post.imageUrl} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: 'var(--eb-light-pink)' }}></div>
                )}
              </Link>
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span className="eb-tag">{post.tag || 'General'}</span>
                  <span className="eb-micro">{post.date}</span>
                </div>
                <Link href={`/blog/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h3 className="eb-card-title" style={{ marginBottom: '0.75rem' }}>{post.title}</h3>
                </Link>
                <div className="eb-body" dangerouslySetInnerHTML={{ __html: post.content.substring(0, 100) + '...' }} style={{ marginBottom: '1.5rem', flex: 1 }} />
                <Link href={`/blog/${post.id}`} className="eb-nav" style={{ textDecoration: 'none', color: 'var(--eb-fg1)', textDecorationLine: 'underline' }}>Read Article</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
