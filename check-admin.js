const mongoose = require('mongoose');
const User = require('./models/user');

mongoose.connect('mongodb://127.0.0.1:27017/wanderlust')
.then(async () => {
  console.log('Connected to DB');
  
  // Check if admin user exists
  const admin = await User.findOne({ role: 'admin' });
  if (admin) {
    console.log('✅ Admin user found:');
    console.log('Username:', admin.username);
    console.log('Email:', admin.email);
    console.log('Role:', admin.role);
    console.log('Password Hash:', admin.password.substring(0, 50) + '...');
  } else {
    console.log('❌ No admin user found');
  }
  
  // Check all users
  const allUsers = await User.find({});
  console.log('\n📋 All users in database:');
  allUsers.forEach((user, index) => {
    console.log((index + 1) + '. Username: ' + user.username + ', Role: ' + user.role + ', Email: ' + user.email);
  });
  
  mongoose.disconnect();
})
.catch(err => {
  console.error('❌ Database error:', err);
  mongoose.disconnect();
});
