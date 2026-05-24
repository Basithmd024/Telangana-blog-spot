const pool = require('../config/db');
const User = require('./User');

class Comment {
  constructor(data) {
    if (data) {
      this._id = data.id || data._id;
      this.id = data.id || data._id;
      this.user = data.userId || data.user; // ID or populated User object
      this.blogId = data.blogId;
      this.comment = data.comment;
      this.createdAt = data.createdAt;
    }
  }

  async populate(path, select) {
    if (path === 'user') {
      const userId = typeof this.user === 'object' && this.user !== null ? this.user._id : this.user;
      const user = await User.findById(userId);
      if (user) {
        this.user = {
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
      SELECT c.*, u.name as user_name, u.email as user_email, u.role as user_role
      FROM comments c
      JOIN users u ON c.userId = u.id
    `;
    let values = [];
    if (filter.blogId) {
      sql += ' WHERE c.blogId = ?';
      values.push(filter.blogId);
    }
    sql += ' ORDER BY c.createdAt DESC';

    const [rows] = await pool.query(sql, values);
    
    const comments = rows.map(row => {
      return new Comment({
        id: row.id,
        blogId: row.blogId,
        comment: row.comment,
        user: {
          _id: row.userId,
          id: row.userId,
          name: row.user_name,
          email: row.user_email,
          role: row.user_role
        },
        createdAt: row.createdAt
      });
    });

    const chain = {
      populate: function() { return this; },
      sort: function() { return this; },
      then: function(resolve, reject) { 
        if (resolve) {
          try {
            resolve(comments);
          } catch (e) {
            if (reject) reject(e);
          }
        }
        return Promise.resolve(comments);
      },
      catch: function(reject) { 
        return Promise.resolve(comments); 
      }
    };

    comments.then = function(resolve, reject) {
      if (resolve) resolve(comments);
      return Promise.resolve(comments);
    };
    comments.populate = () => chain;
    comments.sort = () => chain;

    return comments;
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM comments WHERE id = ?', [id]);
    if (rows.length === 0) return null;
    return new Comment(rows[0]);
  }

  static async create(data) {
    const { user, blogId, comment } = data;
    const userId = typeof user === 'object' && user !== null ? user._id : user;
    const [result] = await pool.query(
      'INSERT INTO comments (userId, blogId, comment) VALUES (?, ?, ?)',
      [userId, blogId, comment]
    );
    const insertId = result.insertId;
    return this.findById(insertId);
  }

  static async findByIdAndDelete(id) {
    const [result] = await pool.query('DELETE FROM comments WHERE id = ?', [id]);
    return result;
  }
}

module.exports = Comment;
