const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const Blog = require('../models/Blog');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Use memory storage for Multer and upload to Cloudinary
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// GET /api/blogs - Get all blogs (public)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = {};
    if (category && category !== 'All') {
      filter.category = category;
    }
    const blogs = await Blog.find(filter)
      .populate('author', 'name email')
      .sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/blogs - Create a blog (protected)
router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    const { title, description, category } = req.body;
    let image = '';
    if (req.file) {
      // convert buffer to data URI and upload
      const dataUri = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
      const uploadRes = await cloudinary.uploader.upload(dataUri, { folder: 'telangana_blogs' });
      image = uploadRes.secure_url;
    }

    const blog = await Blog.create({
      title,
      description,
      category,
      image,
      author: req.user._id
    });

    const populated = await blog.populate('author', 'name email');
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/blogs/:id - Update blog (admin only)
router.put('/:id', protect, adminOnly, upload.single('image'), async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    blog.title = req.body.title || blog.title;
    blog.description = req.body.description || blog.description;
    blog.category = req.body.category || blog.category;

    if (req.file) {
      const dataUri = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
      const uploadRes = await cloudinary.uploader.upload(dataUri, { folder: 'telangana_blogs' });
      blog.image = uploadRes.secure_url;
    }

    const updated = await blog.save();
    const populated = await updated.populate('author', 'name email');
    res.json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/blogs/:id - Delete blog (admin only)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
