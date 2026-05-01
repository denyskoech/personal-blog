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

  const cssVariables = `
    :root {
      --bg-main: ${settings.color_bg_main || '#0a0a0f'};
      --bg-secondary: ${settings.color_bg_secondary || '#12121a'};
      --accent-1: ${settings.color_accent_1 || '#6366f1'};
      --accent-2: ${settings.color_accent_2 || '#ec4899'};
      --accent-3: #8b5cf6;
    }
  `;

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: cssVariables }} />
      </head>
      <body>
        <div id="app">
          <div className="bg-gradient-1"></div>
          <div className="bg-gradient-2"></div>
          
          <nav className="navbar">
            <div className="logo">
              <Link href="/" style={{textDecoration: 'none', color: 'inherit'}}>{settings.site_title?.split(' ')[0] || 'AC.'}</Link>
            </div>
            <ul className="nav-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/admin">Admin</Link></li>
            </ul>
          </nav>

          <main>
            {children}
          </main>
          
          <footer>
            <div className="footer-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="logo">{settings.site_title?.split(' ')[0] || 'AC.'}</div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {socialLinks.map(link => (
                  <a key={link.id} href={link.url} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '1.2rem' }}>
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
