const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

async function seed() {
  const db = await open({
    filename: './blog.db',
    driver: sqlite3.Database
  });

  await db.exec('DELETE FROM social_links');

  const links = [
    { platform: 'Twitter', url: 'https://twitter.com' },
    { platform: 'LinkedIn', url: 'https://linkedin.com' },
    { platform: 'GitHub', url: 'https://github.com' },
    { platform: 'Facebook', url: 'https://facebook.com' },
    { platform: 'Medium', url: 'https://medium.com' },
    { platform: 'Discord', url: 'https://discord.com' }
  ];

  for (const link of links) {
    await db.run('INSERT INTO social_links (platform, url, icon) VALUES (?, ?, ?)', [link.platform, link.url, '']);
  }
  
  console.log('Database seeded with social links.');
}

seed().catch(console.error);
