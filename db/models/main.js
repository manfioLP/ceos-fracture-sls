const mongoose = require('mongoose');
const { fracture } = require('../errors');

// TODO: verify need of Data (em numeral): digitar (xx/xx/xxxx)
const ExposedFractureSchema = new mongoose.Schema({
  gustillo: {
    type: String,
    enum: ['1', '2', '3', 'N/I'],
    default: 'N/I',
    trim: true
  },
  ao: {
    type: String,
    enum: ['A', 'B', 'C', 'N/I'],
    default: 'N/I',
    trim: true
  },
  recordNumber: {
    type: String,
    required: [true, fracture.RECORD_NUMBER_REQUIRED],
    trim: true
  },
  description: {
    type: String,
    default: 'N/I',
    trim: true
  },
  limb: {
    type: String,
    default: 'N/I',
    trim: true
  },
  bone: {
    type: String,
    default: 'N/I',
    trim: true
  },
  region: {
    type: String,
    default: 'N/I',
    trim: true
  },
  mechanism: {
    type: String,
    default: 'N/I',
    trim: true
  },
  associatedFractureTraumaInjury: {
    type: String,
    default: 'N/I',
    trim: true
  },
  firstSurgicalApproach: {
    type: String,
    default: 'N/I',
    trim: true
  },
  amputation: {
    type: Boolean
  },
  infection: {
    type: Boolean
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: [true, fracture.PATIENT_REQUIRED]
  }
}, { timestamps: true });
module.exports = mongoose.model('ExposedFracture', ExposedFractureSchema);
