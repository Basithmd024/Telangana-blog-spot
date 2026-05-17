const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// POST /api/comments - Add a comment (protected)
router.post('/', protect, async (req, res) => {
  try {
    const { blogId, comment } = req.body;

    const newComment = await Comment.create({
      user: req.user._id,
      blogId,
      comment
    });

    const populated = await newComment.populate('user', 'name email');
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/comments/:blogId - Get comments for a blog
router.get('/:blogId', async (req, res) => {
  try {
    const comments = await Comment.find({ blogId: req.params.blogId })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/comments/:id - Delete a comment (admin only)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
