const mongoose = require('mongoose');
const { hashSync, compare } = require('bcryptjs');
const { sign, verify } = require('jsonwebtoken');

const schema =  new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    transform: (doc, ret) => {
      delete ret.passwordHash;
    }
  }
});

schema.virtual('password').set(function(password) {
  const hash = hashSync(password, Number(process.env.SALT_ROUNDS) || 10);
  this.passwordHash = hash;
});
module.exports = mongoose.model('User', schema);

schema.statics.authorize = async function({ username, password }) { const user = await this.findOne({ username });
  if(!user) {
    const error = newError('you dirty little hacker try again');
    error.status = 403;
    throw error;
  }
};
