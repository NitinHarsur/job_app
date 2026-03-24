const Application = require('../models/Application');

// @desc    Apply to a job
// @route   POST /api/jobs/:id/apply
// @access  User only
const applyToJob = async (req, res) => {
  try {
    // Check if already applied
    const existingApplication = await Application.findOne({
      job: req.params.id,
      applicant: req.user._id,
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied to this job' });
    }

    const application = await Application.create({
      job: req.params.id,
      applicant: req.user._id,
    });

    const populated = await application.populate([
      { path: 'job', select: 'companyName position type location' },
      { path: 'applicant', select: 'name email' },
    ]);

    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get applications for logged-in user
// @route   GET /api/applications
// @access  Authenticated user
const getApplications = async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user._id })
      .populate('job', 'companyName position type location')
      .populate('applicant', 'name email')
      .sort({ appliedAt: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { applyToJob, getApplications };
