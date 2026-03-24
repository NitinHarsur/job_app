const express = require('express');
const router = express.Router();
const {
  getJobs,
  getMyJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
} = require('../controllers/jobController');
const { applyToJob } = require('../controllers/applicationController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

// Public routes
router.get('/', getJobs);

// Admin only — get own jobs
router.get('/my-jobs', protect, authorize('admin'), getMyJobs);

// Public — single job
router.get('/:id', getJobById);

// Admin only — CRUD
router.post('/', protect, authorize('admin'), createJob);
router.put('/:id', protect, authorize('admin'), updateJob);
router.delete('/:id', protect, authorize('admin'), deleteJob);

// User only — apply
router.post('/:id/apply', protect, authorize('user'), applyToJob);

module.exports = router;
