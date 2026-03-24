const express = require('express');
const router = express.Router();
const { getApplications } = require('../controllers/applicationController');
const { protect } = require('../middleware/authMiddleware');

// Authenticated — get user's own applications
router.get('/', protect, getApplications);

module.exports = router;
