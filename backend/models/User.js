const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: [true, 'Nama harus diisi'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email harus diisi'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email tidak valid']
  },
  password: {
    type: String,
    required: [true, 'Password harus diisi'],
    minlength: [6, 'Password minimal 6 karakter']
  },
  role: {
    type: String,
    enum: ['admin', 'spv', 'teknisi'],
    default: 'teknisi'
  },
  nip: {
    type: String,
    unique: true,
    sparse: true
  },
  telepon: {
    type: String
  },
  departemen: {
    type: String
  },
  status: {
    type: String,
    enum: ['aktif', 'nonaktif'],
    default: 'aktif'
  },
  profileImage: {
    type: String,
    default: 'default-avatar.png'
  }
}, {
  timestamps: true
});

// Hash password sebelum save
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method untuk compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);