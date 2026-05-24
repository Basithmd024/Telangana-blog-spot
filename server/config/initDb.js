const mysql = require('mysql2/promise');
const pool = require('./db');

async function initDb() {
  // 1. Ensure the database exists
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    port: parseInt(process.env.MYSQL_PORT || '3306', 10)
  });
  
  const dbName = process.env.MYSQL_DATABASE || 'telangana_tourism';
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
  await connection.end();
  
  // 2. Now initialize tables using the connection pool
  console.log('🌱 Creating database tables if they do not exist...');
  
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255),
      googleId VARCHAR(255) UNIQUE DEFAULT NULL,
      role ENUM('user', 'admin') DEFAULT 'user',
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `;
  
  const createBlogsTable = `
    CREATE TABLE IF NOT EXISTS blogs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      category VARCHAR(255) NOT NULL,
      image VARCHAR(255) DEFAULT '',
      authorId INT NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (authorId) REFERENCES users(id) ON DELETE CASCADE
    );
  `;
  
  const createCommentsTable = `
    CREATE TABLE IF NOT EXISTS comments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userId INT NOT NULL,
      blogId INT NOT NULL,
      comment TEXT NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (blogId) REFERENCES blogs(id) ON DELETE CASCADE
    );
  `;
  
  await pool.query(createUsersTable);
  await pool.query(createBlogsTable);
  await pool.query(createCommentsTable);
  
  console.log('✅ Database tables initialized successfully');
}

module.exports = initDb;
