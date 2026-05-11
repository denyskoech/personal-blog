'use client';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div>
      <div style={{ marginBottom: '3rem' }}>
        <h2 className="text-h1">Admin Dashboard</h2>
        <p className="text-body">Welcome to your control panel.</p>
      </div>

      <div className="card-grid">
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
    <Link href={link} className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{icon}</div>
      <h3 className="text-h3" style={{ marginBottom: '0.5rem' }}>{title}</h3>
      <p className="text-small">{desc}</p>
    </Link>
  );
}
