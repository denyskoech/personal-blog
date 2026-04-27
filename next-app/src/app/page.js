import Link from 'next/link';
import { openDb } from '@/lib/db';

export default async function Home() {
  const db = await openDb();
  const posts = await db.all('SELECT * FROM posts ORDER BY id DESC LIMIT 3');

  return (
    <>
      <section id="home" className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Crafting <span className="text-gradient">Digital</span> Experiences.</h1>
          <p className="hero-subtitle">Hi, I'm Alex. I build modern, interactive, and beautiful web applications.</p>
          <div className="hero-actions">
            <Link href="/blog" className="btn btn-primary">Read My Blog</Link>
            <Link href="/contact" className="btn btn-secondary">Get In Touch</Link>
          </div>
        </div>
        <div className="hero-image-container">
          <img src="/assets/profile.png" alt="Alex Carter" className="profile-image" />
          <div className="glass-card floating-card-1">
            <span className="icon">✨</span> Creative UI
          </div>
          <div className="glass-card floating-card-2">
            <span className="icon">⚡</span> Performance
          </div>
        </div>
      </section>

      <section id="blog" className="blog-section">
        <div className="section-header">
          <h2>Latest <span className="text-gradient">Writings</span></h2>
          <p>Thoughts on engineering, design, and life.</p>
        </div>
        
        <div className="blog-grid">
          {posts.map((post, index) => (
            <article className="blog-card" key={post.id} style={{ opacity: 1, transform: 'translateY(0)' }}>
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
      </section>
    </>
  );
}
