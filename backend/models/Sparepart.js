const mongoose = require('mongoose');

const sparepartSchema = new mongoose.Schema({
  kode: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  nama: {
    type: String,
    required: true
  },
  kategori: {
    type: String,
    required: true,
    enum: ['Display', 'Battery', 'Camera', 'Motherboard', 'Casing', 'Charger', 'Speaker', 'Microphone', 'Flex Cable', 'Lainnya']
  },
  model: {
    type: String,
    required: true
  },
  stok: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  harga: {
    type: Number,
    required: true,
    min: 0
  },
  lokasi: {
    type: String,
    required: true
  },
  supplier: {
    type: String
  },
  keterangan: {
    type: String
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Sparepart', sparepartSchema);