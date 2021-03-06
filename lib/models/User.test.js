require('dotenv').config();

const User = require('./User');
describe('User model', () => {
  it ('hashes password', () => {
    const user = new User({
      username: 'trixie',
      password: 'trixietricks'
    });
 
    expect(user.passwordHash).toEqual(expect.any(String));
    expect(user.toJSON().password).toBeUndefined();
  });
});
