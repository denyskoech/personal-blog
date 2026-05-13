import './globals.css';
import Link from 'next/link';
import { openDb } from '@/lib/db';
import SocialIcon from '@/components/SocialIcon';

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
      <body>
        <div className="container">
          <nav className="navbar">
            <div style={{ fontWeight: 700, fontSize: '1.25rem' }}>
              <Link href="/">{settings.site_title?.split(' ')[0] || 'DK.'}</Link>
            </div>
            <ul className="nav-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/resume">Resume</Link></li>
              <li><Link href="/projects">Projects</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </nav>

          <main style={{ minHeight: 'calc(100vh - 200px)' }}>
            {children}
          </main>
          
          <footer>
            <div>&copy; {new Date().getFullYear()} {settings.site_title?.split('|')[0]?.trim() || 'Dennis Koech'}. All rights reserved.</div>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {socialLinks.map(link => (
                <a key={link.id} href={link.url} target="_blank" rel="noreferrer" className="text-secondary hover:text-primary" style={{ fontSize: '1.25rem' }}>
                  <SocialIcon platform={link.platform} />
                </a>
              ))}
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
