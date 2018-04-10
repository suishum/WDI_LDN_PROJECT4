const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  jobTitle: { type: String, required: 'Job title is required.' },
  summary: { type: String, required: 'Include a summary of yourself.' },
  yearsExp: { type: Number, required: 'Include the number of years you have been practising.' },
  technologies: {
    frontend: [{ type: String }],
    backend: [{ type: String }]
  },
  favoriteJobs: [{ type: mongoose.Schema.ObjectId, ref: 'Job' }],
  matchedJobs: [{ type: mongoose.Schema.ObjectId, ref: 'Job' }],
  cv: { type: String },
  user: { type: Boolean, default: true }
}, {
  timestamps: true
});

// userSchema.virtual('favoriteJobs', {
//   localField: '_id',
//   foreignField: 'interestedUsers',
//   ref: 'Job'
// });
//
// userSchema.virtual('matchedJobs', {
//   localField: '_id',
//   foreignField: 'matchedUsers',
//   ref: 'Job'
// });

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.pre('validate', function checkPasswords(next) {
  if(this.isModified('password') && this._passwordConfirmation !== this.password) {
    this.invalidate('passwordConfirmation', 'passwords do not match');
  }
  next();
});

userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  next();
});

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', userSchema);
