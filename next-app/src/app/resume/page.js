'use client';

export default function ResumePage() {
  return (
    <section className="section-padding" style={{ maxWidth: '800px', margin: '0 auto' }}>
      
      {/* Header and Download Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '2rem' }}>
        <div>
          <h1 className="text-hero" style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>Dennis Koech</h1>
          <p className="text-h3" style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Senior Software Engineer</p>
          <div className="text-small mono" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="mailto:hello@example.com">hello@example.com</a>
            <span>•</span>
            <a href="https://github.com/denniskoech" target="_blank" rel="noreferrer">github.com/denniskoech</a>
            <span>•</span>
            <a href="https://linkedin.com/in/denniskoech" target="_blank" rel="noreferrer">linkedin.com/in/denniskoech</a>
          </div>
        </div>
        <button 
          className="btn btn-primary no-print" 
          onClick={() => window.print()}
          style={{ padding: '0.75rem 1.5rem' }}
        >
          Download PDF
        </button>
      </div>

      {/* Summary */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 className="text-h2" style={{ marginBottom: '1rem' }}>Summary</h2>
        <p className="text-body" style={{ color: 'var(--text-primary)', fontSize: '1rem', lineHeight: '1.7' }}>
          Product-minded software engineer with 6+ years of experience building scalable web applications and distributed systems. 
          Passionate about developer experience, performance optimization, and minimalist design architectures.
        </p>
      </div>

      {/* Experience */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 className="text-h2" style={{ marginBottom: '1.5rem' }}>Experience</h2>
        
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
            <h3 className="text-h3" style={{ color: 'var(--text-primary)' }}>Senior Software Engineer <span style={{ color: 'var(--text-secondary)', fontWeight: 400 }}>at Acme Corp</span></h3>
            <span className="text-small mono">2021 – Present</span>
          </div>
          <ul className="text-body" style={{ paddingLeft: '1.5rem', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li>Led the migration of a legacy monolithic architecture to a modern Next.js/Node.js microservices stack, reducing load times by 45%.</li>
            <li>Architected and implemented a real-time collaborative editor using WebSockets and CRDTs.</li>
            <li>Mentored 4 junior engineers and established new CI/CD standards using GitHub Actions.</li>
          </ul>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
            <h3 className="text-h3" style={{ color: 'var(--text-primary)' }}>Full Stack Developer <span style={{ color: 'var(--text-secondary)', fontWeight: 400 }}>at TechNova</span></h3>
            <span className="text-small mono">2018 – 2021</span>
          </div>
          <ul className="text-body" style={{ paddingLeft: '1.5rem', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li>Developed and maintained a fleet of e-commerce storefronts using React and Shopify Plus.</li>
            <li>Built an internal analytics dashboard using Vue.js and Python/Django that increased sales conversion visibility by 30%.</li>
            <li>Integrated payment gateways (Stripe, PayPal) handling over $2M in monthly transaction volume.</li>
          </ul>
        </div>
      </div>

      {/* Skills */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 className="text-h2" style={{ marginBottom: '1.5rem' }}>Technical Skills</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
          <strong className="text-body" style={{ color: 'var(--text-primary)' }}>Languages</strong>
          <span className="text-body" style={{ color: 'var(--text-secondary)' }}>JavaScript, TypeScript, Python, Go, HTML/CSS</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
          <strong className="text-body" style={{ color: 'var(--text-primary)' }}>Frameworks</strong>
          <span className="text-body" style={{ color: 'var(--text-secondary)' }}>React, Next.js, Node.js, Express, Vue.js, TailwindCSS</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
          <strong className="text-body" style={{ color: 'var(--text-primary)' }}>Tools & Infra</strong>
          <span className="text-body" style={{ color: 'var(--text-secondary)' }}>Git, Docker, AWS, Vercel, PostgreSQL, Redis, Figma</span>
        </div>
      </div>

      {/* Education */}
      <div>
        <h2 className="text-h2" style={{ marginBottom: '1.5rem' }}>Education</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div>
            <h3 className="text-h3" style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>B.S. in Computer Science</h3>
            <p className="text-body">State University</p>
          </div>
          <span className="text-small mono">2014 – 2018</span>
        </div>
      </div>

    </section>
  );
}
