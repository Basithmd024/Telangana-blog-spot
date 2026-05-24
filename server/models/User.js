const pool = require('../config/db');

class User {
  constructor(data) {
    if (data) {
      this._id = data.id;
      this.id = data.id;
      this.name = data.name;
      this.email = data.email;
      this.password = data.password;
      this.googleId = data.googleId;
      this.role = data.role || 'user';
      this.createdAt = data.createdAt;
      this.updatedAt = data.updatedAt;
    }
  }

  static async findOne(query) {
    // If no query parameters are provided (e.g. User.findOne()), return any user
    if (!query || Object.keys(query).length === 0) {
      const [rows] = await pool.query('SELECT * FROM users LIMIT 1');
      if (rows.length === 0) return null;
      return new User(rows[0]);
    }

    let sql = 'SELECT * FROM users WHERE ';
    let values = [];
    
    if (query.email && !query.$or) {
      sql += 'email = ?';
      values.push(query.email);
    } else if (query.googleId && !query.$or) {
      sql += 'googleId = ?';
      values.push(query.googleId);
    } else if (query.$or) {
      // Find by googleId or email
      const orConditions = query.$or.map(cond => {
        const key = Object.keys(cond)[0];
        values.push(cond[key]);
        return `${key} = ?`;
      }).join(' OR ');
      sql += `(${orConditions})`;
    } else if (query.role) {
      sql += 'role = ?';
      values.push(query.role);
    } else {
      // Fallback or unsupported query
      return null;
    }
    
    const [rows] = await pool.query(sql, values);
    if (rows.length === 0) return null;
    return new User(rows[0]);
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    if (rows.length === 0) return null;
    const user = new User(rows[0]);
    // Mock the chain in case it is called with select() e.g. User.findById(id).select('-password')
    user.select = function() { return this; };
    return user;
  }

  static async create(data) {
    const { name, email, password, googleId, role } = data;
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, googleId, role) VALUES (?, ?, ?, ?, ?)',
      [name, email, password || null, googleId || null, role || 'user']
    );
    const insertId = result.insertId;
    return this.findById(insertId);
  }

  // To support updating properties like user.googleId = googleId; await user.save();
  async save() {
    await pool.query(
      'UPDATE users SET name = ?, email = ?, password = ?, googleId = ?, role = ? WHERE id = ?',
      [this.name, this.email, this.password || null, this.googleId || null, this.role || 'user', this._id]
    );
    return this;
  }

  // Added helper to support countDocuments for database seeding compatibility if needed
  static async countDocuments() {
    const [rows] = await pool.query('SELECT COUNT(*) as count FROM users');
    return rows[0].count;
  }

  // Added helper to support updateOne for createAdmin.js
  static async updateOne(filter, updateDoc, options) {
    const email = filter.email;
    const updateFields = updateDoc.$set || updateDoc;
    
    // Check if user exists
    let user = await this.findOne({ email });
    if (user) {
      user.name = updateFields.name || user.name;
      user.password = updateFields.password || user.password;
      user.role = updateFields.role || user.role;
      await user.save();
    } else {
      if (options && options.upsert) {
        await this.create({
          name: updateFields.name,
          email: email,
          password: updateFields.password,
          role: updateFields.role || 'user'
        });
      }
    }
  }
}

module.exports = User;
