export default function About() {
  return (
    <section style={{ padding: '8rem 5% 5rem', maxWidth: '900px', margin: '0 auto', minHeight: '80vh' }}>
      <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2>About <span className="text-gradient">Me</span></h2>
        <p>A little bit about who I am and what I do.</p>
      </div>

      <div style={{ display: 'flex', gap: '4rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 300px' }}>
          <img src="/assets/profile.png" alt="Alex Carter" style={{ width: '100%', borderRadius: '24px', border: '1px solid var(--glass-border)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }} />
        </div>
        
        <div style={{ flex: '2 1 400px', color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Hi, I'm Alex Carter</h3>
          <p style={{ marginBottom: '1.5rem' }}>
            I am a passionate software developer and UI/UX designer dedicated to crafting beautiful, functional, and user-centered digital experiences. With a background in both engineering and design, I bridge the gap between aesthetics and performance.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            My journey started when I built my first website back in college. Since then, I've had the privilege of working with startups, agencies, and large corporations to build software that scales and delights users.
          </p>
          <p style={{ marginBottom: '2rem' }}>
            When I'm not coding, you can find me exploring the outdoors, reading sci-fi novels, or experimenting with new design trends.
          </p>
          
          <div style={{ display: 'flex', gap: '2rem' }}>
            <div>
              <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Skills</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li>React & Next.js</li>
                <li>UI/UX Design</li>
                <li>Node.js & Databases</li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Experience</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li>5+ Years Dev</li>
                <li>3+ Years Design</li>
                <li>Freelancer</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
