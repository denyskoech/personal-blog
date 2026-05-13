const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

async function updateDB() {
  const db = await open({
    filename: './blog.db',
    driver: sqlite3.Database
  });

  await db.run('UPDATE social_links SET platform = ? WHERE platform = ?', ['X', 'Twitter']);
  
  console.log('Database updated: Twitter renamed to X.');
}

updateDB().catch(console.error);
