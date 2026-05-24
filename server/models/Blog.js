const pool = require('../config/db');
const User = require('./User');

class Blog {
  constructor(data) {
    if (data) {
      this._id = data.id || data._id;
      this.id = data.id || data._id;
      this.title = data.title;
      this.description = data.description;
      this.category = data.category;
      this.image = data.image || '';
      this.author = data.authorId || data.author; // ID or populated User object
      this.createdAt = data.createdAt;
    }
  }

  async populate(path, select) {
    if (path === 'author') {
      const authorId = typeof this.author === 'object' && this.author !== null ? this.author._id : this.author;
      const user = await User.findById(authorId);
      if (user) {
        this.author = {
          _id: user._id,
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        };
      }
    }
    return this;
  }

  static async find(filter = {}) {
    let sql = `
      SELECT b.*, u.name as author_name, u.email as author_email, u.role as author_role
      FROM blogs b
      JOIN users u ON b.authorId = u.id
    `;
    let values = [];
    if (filter.category && filter.category !== 'All') {
      sql += ' WHERE b.category = ?';
      values.push(filter.category);
    }
    sql += ' ORDER BY b.createdAt DESC';

    const [rows] = await pool.query(sql, values);
    
    const blogs = rows.map(row => {
      return new Blog({
        id: row.id,
        title: row.title,
        description: row.description,
        category: row.category,
        image: row.image,
        author: {
          _id: row.authorId,
          id: row.authorId,
          name: row.author_name,
          email: row.author_email,
          role: row.author_role
        },
        createdAt: row.createdAt
      });
    });

    // We build a fully chainable mock object that matches the promise chain returned by Mongoose
    const chain = {
      populate: function() { return this; },
      sort: function() { return this; },
      then: function(resolve, reject) { 
        if (resolve) {
          try {
            resolve(blogs);
          } catch (e) {
            if (reject) reject(e);
          }
        }
        return Promise.resolve(blogs);
      },
      catch: function(reject) { 
        return Promise.resolve(blogs); 
      }
    };

    // To allow `await Blog.find(...)` directly, we make the returned array a thenable too!
    blogs.then = function(resolve, reject) {
      if (resolve) resolve(blogs);
      return Promise.resolve(blogs);
    };
    blogs.populate = () => chain;
    blogs.sort = () => chain;

    return blogs;
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM blogs WHERE id = ?', [id]);
    if (rows.length === 0) return null;
    return new Blog(rows[0]);
  }

  static async create(data) {
    const { title, description, category, image, author } = data;
    // author can be a User instance or an ID
    const authorId = typeof author === 'object' && author !== null ? author._id : author;
    const [result] = await pool.query(
      'INSERT INTO blogs (title, description, category, image, authorId) VALUES (?, ?, ?, ?, ?)',
      [title, description, category, image || '', authorId]
    );
    const insertId = result.insertId;
    return this.findById(insertId);
  }

  async save() {
    await pool.query(
      'UPDATE blogs SET title = ?, description = ?, category = ?, image = ? WHERE id = ?',
      [this.title, this.description, this.category, this.image, this._id]
    );
    return this;
  }

  static async findByIdAndDelete(id) {
    const [result] = await pool.query('DELETE FROM blogs WHERE id = ?', [id]);
    return result;
  }

  static async countDocuments() {
    const [rows] = await pool.query('SELECT COUNT(*) as count FROM blogs');
    return rows[0].count;
  }

  static async insertMany(blogsList) {
    for (const blogData of blogsList) {
      await this.create(blogData);
    }
  }
}

module.exports = Blog;
