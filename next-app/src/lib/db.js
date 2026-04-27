import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let db = null;

export async function openDb() {
  if (db) {
    return db;
  }
  
  db = await open({
    filename: './blog.db',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      tag TEXT,
      date TEXT,
      imageUrl TEXT
    );
  `);

  // Seed data if empty
  const count = await db.get('SELECT COUNT(*) as count FROM posts');
  if (count.count === 0) {
    await db.run(`
      INSERT INTO posts (title, content, tag, date, imageUrl) 
      VALUES 
      ('The Power of Micro-Animations in Modern Web', 'Explore how subtle movements can drastically improve user experience and bring your interfaces to life.', 'Design', 'Oct 24, 2023', '/assets/blog_cover.png'),
      ('Architecting Scalable Frontend Applications', 'A deep dive into state management, module federation, and maintaining a clean architecture as your app grows.', 'Engineering', 'Oct 12, 2023', ''),
      ('My Developer Workspace Setup', 'The tools, themes, and physical gear I use daily to maximize flow state and minimize distractions.', 'Productivity', 'Sep 28, 2023', '')
    `);
  }

  return db;
}
