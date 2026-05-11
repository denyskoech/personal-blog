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

  // Create tables
  await db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      tag TEXT,
      date TEXT,
      imageUrl TEXT
    );
    
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT
    );

    CREATE TABLE IF NOT EXISTS social_links (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      platform TEXT,
      url TEXT,
      icon TEXT
    );

    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      message TEXT,
      date TEXT
    );

    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      post_id INTEGER,
      name TEXT,
      content TEXT,
      date TEXT,
      FOREIGN KEY(post_id) REFERENCES posts(id) ON DELETE CASCADE
    );
  `);

  // Seed default settings if empty
  const settingsCount = await db.get('SELECT COUNT(*) as count FROM settings');
  if (settingsCount.count === 0) {
    await db.exec(`
      INSERT INTO settings (key, value) VALUES
      ('site_title', 'Dennis Koech | Personal Blog'),
      ('hero_title', 'Crafting Digital Experiences.'),
      ('hero_subtitle', 'Hi, I''m Dennis. I build modern, interactive, and beautiful web applications.'),
      ('about_content', 'I am a passionate software developer and UI/UX designer dedicated to crafting beautiful, functional, and user-centered digital experiences.<br/><br/>My journey started when I built my first website back in college. Since then, I''ve had the privilege of working with startups, agencies, and large corporations to build software that scales and delights users.<br/><br/>When I''m not coding, you can find me exploring the outdoors, reading sci-fi novels, or experimenting with new design trends.'),
      ('color_bg_main', '#0a0a0f'),
      ('color_bg_secondary', '#12121a'),
      ('color_accent_1', '#6366f1'),
      ('color_accent_2', '#ec4899')
    `);
    
    await db.exec(`
      INSERT INTO social_links (platform, url, icon) VALUES
      ('Twitter', 'https://twitter.com', '𝕏'),
      ('GitHub', 'https://github.com', '🐙'),
      ('LinkedIn', 'https://linkedin.com', '💼')
    `);
  }

  // Seed data if posts empty
  const count = await db.get('SELECT COUNT(*) as count FROM posts');
  if (count.count === 0) {
    await db.run(`
      INSERT INTO posts (title, content, tag, date, imageUrl) 
      VALUES 
      ('The Power of Micro-Animations in Modern Web', '<p>Explore how subtle movements can drastically improve user experience and bring your interfaces to life.</p>', 'Design', 'Oct 24, 2023', '/assets/blog_cover.png'),
      ('Architecting Scalable Frontend Applications', '<p>A deep dive into state management, module federation, and maintaining a clean architecture as your app grows.</p>', 'Engineering', 'Oct 12, 2023', ''),
      ('My Developer Workspace Setup', '<p>The tools, themes, and physical gear I use daily to maximize flow state and minimize distractions.</p>', 'Productivity', 'Sep 28, 2023', '')
    `);
  }

  return db;
}
