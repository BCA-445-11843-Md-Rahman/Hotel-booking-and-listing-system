const mongoose = require('mongoose');
const User = require('./models/user');
const bcrypt = require('bcrypt');

async function createAdmin() {
    try {
        // Connect to database
        await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
        
        // Check if admin already exists
        const existingAdmin = await User.findOne({ role: 'admin' });
        if (existingAdmin) {
            console.log('Admin user already exists:', existingAdmin.username);
            process.exit();
        }
        
        // Create admin user
        const hashedPassword = await bcrypt.hash('admin123', 12);
        const admin = new User({
            username: 'admin',
            email: 'admin@wanderlust.com',
            password: hashedPassword,
            role: 'admin'
        });
        
        await admin.save();
        console.log('✅ Admin user created successfully!');
        console.log('📝 Username: admin');
        console.log('🔑 Password: admin123');
        console.log('🌐 Login at: http://localhost:8080/login');
        
    } catch (error) {
        console.error('❌ Error creating admin:', error);
    } finally {
        await mongoose.disconnect();
        process.exit();
    }
}

createAdmin();
