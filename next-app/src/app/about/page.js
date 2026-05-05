import { openDb } from '@/lib/db';

export default async function About() {
  const db = await openDb();
  const setting = await db.get('SELECT value FROM settings WHERE key = ?', ['about_content']);
  const aboutContent = setting?.value || '<p>Default about me content...</p>';

  return (
    <section style={{ maxWidth: '900px', margin: '0 auto', minHeight: '80vh', padding: '4rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 className="eb-section-h">About <span style={{ color: 'var(--eb-light-brown)' }}>Me</span></h2>
        <p className="eb-body" style={{ marginTop: '0.5rem' }}>A little bit about who I am and what I do.</p>
      </div>

      <div style={{ display: 'flex', gap: '4rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 300px' }}>
          <img src="/assets/profile.png" alt="Profile" style={{ width: '100%', borderRadius: 'var(--eb-radius-md)', border: '1px solid var(--eb-border)', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
        </div>
        
        <div className="eb-body" style={{ flex: '2 1 400px' }}>
          <div className="quill-content" dangerouslySetInnerHTML={{ __html: aboutContent }} />
        </div>
      </div>
    </section>
  );
}
