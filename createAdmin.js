require('dotenv').config({ path: './server/.env' });
const initDb = require('./server/config/initDb');
const User = require('./server/models/User');
const bcrypt = require('bcryptjs');

async function run() {
  try {
    // Ensure tables are initialized first
    await initDb();

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('password123', salt);
    
    await User.updateOne({ email: 'admin@example.com' }, {
      $set: {
        name: 'Admin User',
        password,
        role: 'admin'
      }
    }, { upsert: true });
    
    console.log('✅ Admin user created/updated successfully');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error creating/updating admin user:', err);
    process.exit(1);
  }
}

run();
