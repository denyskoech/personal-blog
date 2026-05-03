'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Blog Posts', path: '/admin/blog' },
    { name: 'Site Settings', path: '/admin/settings' },
    { name: 'Social Links', path: '/admin/social' },
    { name: 'Comments', path: '/admin/comments' },
    { name: 'Messages', path: '/admin/messages' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '80vh', marginTop: '4rem' }}>
      <aside style={{ width: '250px', background: 'var(--bg-secondary)', borderRight: '1px solid var(--glass-border)', padding: '2rem 1rem' }}>
        <h3 style={{ marginBottom: '2rem', paddingLeft: '1rem', color: 'var(--text-primary)' }}>Admin Panel</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {navItems.map(item => (
            <li key={item.path} style={{ marginBottom: '0.5rem' }}>
              <Link 
                href={item.path}
                style={{
                  display: 'block',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: pathname === item.path ? 'var(--accent-1)' : 'var(--text-secondary)',
                  background: pathname === item.path ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                  fontWeight: pathname === item.path ? 600 : 400
                }}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <main style={{ flex: 1, padding: '2rem 5%' }}>
        {children}
      </main>
    </div>
  );
}
