import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Alex Carter | Personal Blog',
  description: 'Personal website and blog of Alex Carter, a software developer and designer.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div id="app">
          <div className="bg-gradient-1"></div>
          <div className="bg-gradient-2"></div>
          
          <nav className="navbar">
            <div className="logo">
              <Link href="/" style={{textDecoration: 'none', color: 'inherit'}}>AC.</Link>
            </div>
            <ul className="nav-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/admin">Editor</Link></li>
            </ul>
          </nav>

          <main>
            {children}
          </main>
          
          <footer>
            <div className="footer-content">
              <div className="logo">AC.</div>
              <p>&copy; {new Date().getFullYear()} Alex Carter. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
