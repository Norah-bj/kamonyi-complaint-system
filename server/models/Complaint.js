const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  trackingId: { type: String, required: true, unique: true },
  citizen: {
    name: { type: String, required: true },
    gender: { type: String, required: true },
    maritalStatus: { type: String, required: true },
    reason: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    address: {
      umudugudu: { type: String, required: true },
      akagari: { type: String, required: true },
      umurenge: { type: String, required: true },
      akarere: { type: String, default: 'Kamonyi' }
    }
  },
  against: {
    name: { type: String, required: true },
    contact: { type: String }
  },
  category: { type: String, required: true },
  description: { type: String, required: true },
  previousActions: {
    institutions: { type: String },
    whatTheyDid: { type: String }
  },
  attachments: [{
    filename: String,
    path: String,
    mimetype: String
  }],
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Resolved'],
    default: 'Pending'
  },
  response: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Complaint', ComplaintSchema);
