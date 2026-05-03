'use client';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div>
      <div className="section-header">
        <h2>Admin <span className="text-gradient">Dashboard</span></h2>
        <p>Welcome to your control panel.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
        <DashboardCard title="Blog Posts" desc="Manage your articles" link="/admin/blog" icon="📝" />
        <DashboardCard title="Site Settings" desc="Change title, colors, and about content" link="/admin/settings" icon="⚙️" />
        <DashboardCard title="Social Links" desc="Manage social media icons" link="/admin/social" icon="🌐" />
        <DashboardCard title="Comments" desc="Moderate and reply to blog comments" link="/admin/comments" icon="💬" />
        <DashboardCard title="Messages" desc="View contact form submissions" link="/admin/messages" icon="✉️" />
      </div>
    </div>
  );
}

function DashboardCard({ title, desc, link, icon }) {
  return (
    <Link href={link} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{ background: 'var(--bg-secondary)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', transition: 'transform 0.2s', cursor: 'pointer' }}
           onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'}
           onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{icon}</div>
        <h3 style={{ marginBottom: '0.5rem' }}>{title}</h3>
        <p style={{ color: 'var(--text-secondary)' }}>{desc}</p>
      </div>
    </Link>
  );
}
