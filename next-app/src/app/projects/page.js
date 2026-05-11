import Link from 'next/link';

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: 'NexGen E-Commerce',
      description: 'A high-performance headless e-commerce storefront built with Next.js 14, Shopify Storefront API, and TailwindCSS. Features a custom cart and edge-cached product pages.',
      tags: ['Next.js', 'React', 'Shopify', 'Tailwind'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 2,
      title: 'DevDash Analytics',
      description: 'A real-time analytics dashboard for developers. Ingests webhooks from GitHub, Vercel, and Sentry to provide a unified view of deployment health and application errors.',
      tags: ['TypeScript', 'Express', 'PostgreSQL', 'WebSockets'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 3,
      title: 'Minimalist Note-Taking CLI',
      description: 'A blazing fast command-line interface tool for taking markdown notes. Written in Go, featuring a built-in search and fuzzy-finder integration.',
      tags: ['Go', 'CLI', 'Markdown'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 4,
      title: 'Open Source UI Library',
      description: 'A collection of accessible, unstyled React components designed for building custom design systems. Used by over 500 projects globally.',
      tags: ['React', 'Radix UI', 'Storybook', 'NPM'],
      liveUrl: '#',
      githubUrl: '#'
    }
  ];

  return (
    <section className="section-padding">
      <div style={{ marginBottom: '4rem' }}>
        <h1 className="text-h1">Projects &amp; Work</h1>
        <p className="text-body" style={{ maxWidth: '600px', fontSize: '1.125rem' }}>
          A selection of personal projects, open-source contributions, and experimental ideas. Focused on performance, design, and developer experience.
        </p>
      </div>

      <div className="card-grid">
        {projects.map(project => (
          <article key={project.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 className="text-h3" style={{ marginBottom: '0.75rem', color: 'var(--text-primary)' }}>{project.title}</h3>
            <p className="text-body" style={{ flex: 1, marginBottom: '1.5rem', fontSize: '0.875rem' }}>{project.description}</p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {project.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-small mono" style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                [ Live Demo ]
              </a>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-small mono" style={{ color: 'var(--text-secondary)' }}>
                [ Source ]
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
