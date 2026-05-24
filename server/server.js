const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve client files
app.use(express.static(path.join(__dirname, '..', 'client')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/comments', commentRoutes);

// Fallback: serve index.html for root
// Health check for load balancers and uptime monitoring
app.get('/healthz', (req, res) => {
  return res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

// Fallback: serve index.html for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

// Connect to MySQL and start server
const PORT = process.env.PORT || 5001;
const seedDatabase = require('./utils/seedData');
const initDb = require('./config/initDb');

initDb()
  .then(async () => {
    console.log('✅ MySQL connected and initialized successfully');
    
    // Seed default blogs if database is empty
    await seedDatabase();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection error:', err.message);
    process.exit(1);
  });
