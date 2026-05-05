import './globals.css';
import Link from 'next/link';
import { openDb } from '@/lib/db';

export async function generateMetadata() {
  const db = await openDb();
  const settingsRaw = await db.all('SELECT * FROM settings WHERE key IN ("site_title", "favicon_url")');
  const settings = settingsRaw.reduce((acc, row) => ({ ...acc, [row.key]: row.value }), {});
  
  return {
    title: settings.site_title || 'Personal Blog',
    icons: {
      icon: settings.favicon_url || '/favicon.ico',
    }
  };
}

export default async function RootLayout({ children }) {
  const db = await openDb();
  const settingsRaw = await db.all('SELECT * FROM settings');
  const settings = settingsRaw.reduce((acc, row) => ({ ...acc, [row.key]: row.value }), {});
  
  const socialLinks = await db.all('SELECT * FROM social_links');

  return (
    <html lang="en">
      <body className="eb-page">
        <div id="app">
          <nav className="navbar">
            <div className="logo">
              <Link href="/" style={{textDecoration: 'none', color: 'inherit'}}>{settings.site_title?.split(' ')[0] || 'AC.'}</Link>
            </div>
            <ul className="nav-links eb-nav">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/admin">Admin</Link></li>
            </ul>
          </nav>

          <main className="eb-viewport">
            {children}
          </main>
          
          <footer className="eb-micro">
            <div className="footer-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <div className="logo">{settings.site_title?.split(' ')[0] || 'AC.'}</div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {socialLinks.map(link => (
                  <a key={link.id} href={link.url} target="_blank" rel="noreferrer" style={{ color: 'var(--eb-fg2)', textDecoration: 'none', fontSize: '1.2rem' }}>
                    {link.icon}
                  </a>
                ))}
              </div>
              <p>&copy; {new Date().getFullYear()} {settings.site_title?.split('|')[0]?.trim() || 'Alex Carter'}. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
