import { openDb } from '@/lib/db';

export default async function About() {
  const db = await openDb();
  const setting = await db.get('SELECT value FROM settings WHERE key = ?', ['about_content']);
  const aboutContent = setting?.value || '<p>Default about me content...</p>';

  return (
    <section style={{ padding: '8rem 5% 5rem', maxWidth: '900px', margin: '0 auto', minHeight: '80vh' }}>
      <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2>About <span className="text-gradient">Me</span></h2>
        <p>A little bit about who I am and what I do.</p>
      </div>

      <div style={{ display: 'flex', gap: '4rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 300px' }}>
          <img src="/assets/profile.png" alt="Profile" style={{ width: '100%', borderRadius: '24px', border: '1px solid var(--glass-border)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }} />
        </div>
        
        <div style={{ flex: '2 1 400px', color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>
          <div className="quill-content" dangerouslySetInnerHTML={{ __html: aboutContent }} />
        </div>
      </div>
    </section>
  );
}
