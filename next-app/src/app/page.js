import Link from 'next/link';
import { openDb } from '@/lib/db';
import ImageWithFallback from '@/components/ImageWithFallback';

export default async function Home() {
  const db = await openDb();
  const posts = await db.all('SELECT * FROM posts ORDER BY id DESC LIMIT 3');
  
  const settingsRaw = await db.all('SELECT * FROM settings WHERE key IN ("hero_title", "hero_subtitle")');
  const settings = settingsRaw.reduce((acc, row) => ({ ...acc, [row.key]: row.value }), {});

  return (
    <>
      <section id="home" className="section-padding" style={{ display: 'flex', alignItems: 'center', gap: '4rem', flexWrap: 'wrap-reverse' }}>
        <div style={{ flex: 1 }}>
          <h1 className="text-hero text-gradient-wow" style={{ marginBottom: '1.5rem', paddingBottom: '0.5rem' }}>
            {settings.hero_title || 'Crafting Digital Experiences.'}
          </h1>
          <p className="text-body" style={{ fontSize: '1.25rem', marginBottom: '2.5rem', maxWidth: '90%' }}>
            {settings.hero_subtitle || "Hi, I'm Dennis. I build modern, interactive, and beautiful web applications."}
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link href="/blog" className="btn btn-primary">Read My Blog</Link>
            <Link href="/contact" className="btn btn-secondary">Get In Touch</Link>
          </div>
        </div>
        <div>
          <ImageWithFallback src="/assets/profile.png" alt="Profile" style={{ width: '300px', height: '400px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }} />
        </div>
      </section>

      <section id="blog" className="section-padding">
        <div style={{ marginBottom: '3rem' }}>
          <h2 className="text-h2">Latest Writings</h2>
          <p className="text-body">Thoughts on engineering, design, and life.</p>
        </div>
        
        <div className="card-grid">
          {posts.map((post, index) => (
            <article className="card" key={post.id} style={{ display: 'flex', flexDirection: 'column' }}>
              <Link href={`/blog/${post.id}`} style={{ display: 'block', overflow: 'hidden', borderRadius: 'var(--radius-sm)', height: '180px', marginBottom: '1.5rem', background: 'var(--bg-elevated)' }}>
                {post.imageUrl?.trim() ? (
                  <ImageWithFallback src={post.imageUrl} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : null}
              </Link>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
                <span className="tag">{post.tag || 'General'}</span>
                <span className="text-micro">{post.date}</span>
              </div>
              <Link href={`/blog/${post.id}`}>
                <h3 className="text-h3" style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>{post.title}</h3>
              </Link>
              <div className="text-body" style={{ marginBottom: '1.5rem', flex: 1, fontSize: '0.875rem' }}>
                {post.content.replace(/<[^>]*>?/gm, '').substring(0, 100)}...
              </div>
              <Link href={`/blog/${post.id}`} className="text-small" style={{ color: 'var(--accent)', fontWeight: 500 }}>
                Read Article &rarr;
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
