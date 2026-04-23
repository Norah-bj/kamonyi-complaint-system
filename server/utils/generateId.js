const Complaint = require('../models/Complaint');

const generateTrackingId = async () => {
  const year = new Date().getFullYear();
  // Find the latest complaint for the current year
  const latestComplaint = await Complaint.findOne({ trackingId: new RegExp(`^KAM-${year}-`) }).sort({ createdAt: -1 });

  let newSequenceNumber = 1;
  if (latestComplaint) {
    const parts = latestComplaint.trackingId.split('-');
    const currentSequenceNumber = parseInt(parts[2], 10);
    newSequenceNumber = currentSequenceNumber + 1;
  }

  const paddedSequenceNumber = newSequenceNumber.toString().padStart(4, '0');
  return `KAM-${year}-${paddedSequenceNumber}`;
};

module.exports = { generateTrackingId };
