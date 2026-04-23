const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const multer = require('multer');
const path = require('path');
const Complaint = require('../models/Complaint');
const auth = require('../middleware/auth');
const { generateTrackingId } = require('../utils/generateId');

// File Upload Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
});

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images and Documents Only!');
  }
}

// @route   POST api/complaints
// @desc    Submit a new complaint
// @access  Public
router.post(
  '/',
  upload.array('attachments', 5),
  [
    check('citizen.name', 'Citizen name is required').not().isEmpty(),
    check('citizen.gender', 'Gender is required').not().isEmpty(),
    check('citizen.phone', 'Phone is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
  ],
  async (req, res) => {
    // Parse json string fields if they come from formData
    let bodyData = req.body;
    if (typeof req.body.citizen === 'string') {
        bodyData.citizen = JSON.parse(req.body.citizen);
    }
    if (typeof req.body.against === 'string') {
        bodyData.against = JSON.parse(req.body.against);
    }
    if (typeof req.body.previousActions === 'string') {
        bodyData.previousActions = JSON.parse(req.body.previousActions);
    }

    const errors = validationResult({body: bodyData});
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const trackingId = await generateTrackingId();

      const newComplaint = new Complaint({
        trackingId: trackingId,
        citizen: bodyData.citizen,
        against: bodyData.against,
        category: bodyData.category || bodyData.category, // Handle form data
        description: bodyData.description || bodyData.description,
        previousActions: bodyData.previousActions,
        attachments: req.files ? req.files.map(f => ({
          filename: f.filename,
          path: f.path,
          mimetype: f.mimetype
        })) : []
      });

      const complaint = await newComplaint.save();
      res.json({
        msg: 'Complaint submitted successfully',
        trackingId: complaint.trackingId
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/complaints/track/:trackingId
// @desc    Track a complaint by tracking ID
// @access  Public
router.get('/track/:trackingId', async (req, res) => {
  try {
    const complaint = await Complaint.findOne({ trackingId: req.params.trackingId });
    if (!complaint) {
      return res.status(404).json({ msg: 'Complaint not found' });
    }
    res.json({
      trackingId: complaint.trackingId,
      status: complaint.status,
      createdAt: complaint.createdAt,
      response: complaint.response,
      category: complaint.category
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/complaints
// @desc    Get all complaints
// @access  Private (Admin)
router.get('/', auth, async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/complaints/:id
// @desc    Get complaint by MongoDB ID
// @access  Private (Admin)
router.get('/:id', auth, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ msg: 'Complaint not found' });
    res.json(complaint);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Complaint not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PATCH api/complaints/:id/status
// @desc    Update complaint status and/or add response
// @access  Private (Admin)
router.patch('/:id/status', auth, async (req, res) => {
  const { status, response } = req.body;

  try {
    let complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ msg: 'Complaint not found' });

    if (status) complaint.status = status;
    if (response) complaint.response = response;

    await complaint.save();
    res.json(complaint);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
