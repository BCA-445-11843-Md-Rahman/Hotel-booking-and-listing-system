const mongoose = require('mongoose');
const User = require('./models/user');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb://127.0.0.1:27017/wanderlust')
.then(async () => {
  console.log('Connected to DB');
  
  // Test admin login
  const admin = await User.findOne({ username: 'admin' });
  if (admin) {
    console.log('✅ Testing admin login:');
    console.log('Username: admin');
    console.log('Password: admin123');
    
    // Test password comparison
    const isMatch = await admin.comparePassword('admin123');
    console.log('Password match:', isMatch ? '✅ CORRECT' : '❌ INCORRECT');
    
    if (isMatch) {
      console.log('🎉 Login should work!');
      console.log('🌐 Go to: http://localhost:8080/login');
      console.log('📝 Username: admin');
      console.log('🔑 Password: admin123');
    } else {
      console.log('❌ Password mismatch - recreating admin...');
      
      // Recreate admin with correct password
      const hashedPassword = await bcrypt.hash('admin123', 12);
      await User.findByIdAndUpdate(admin._id, { password: hashedPassword });
      console.log('✅ Admin password reset successfully!');
      console.log('🔑 Try again with: admin / admin123');
    }
  } else {
    console.log('❌ No admin user found');
  }
  
  mongoose.disconnect();
})
.catch(err => {
  console.error('❌ Database error:', err);
  mongoose.disconnect();
});
