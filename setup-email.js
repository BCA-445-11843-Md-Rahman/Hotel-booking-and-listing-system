const fs = require('fs');
const path = require('path');

console.log('?? Email Setup Helper');
console.log('==================');
console.log('');
console.log('This script will help you set up email for password reset.');
console.log('');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
let envContent = '';

if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
    console.log('?? Found existing .env file');
} else {
    console.log('?? Creating new .env file');
}

// Get user input for email setup
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('');
console.log('?? GMAIL SETUP REQUIRED:');
console.log('1. Enable 2-factor authentication on your Gmail account');
console.log('2. Go to: https://myaccount.google.com/apppasswords');
console.log('3. Select "Mail" app and generate App Password');
console.log('4. Copy the 16-character App Password');
console.log('');

rl.question('Enter your Gmail address: ', (email) => {
    rl.question('Enter your 16-character App Password: ', (password) => {
        
        // Update or create .env file
        const emailLine = `EMAIL_USER=${email}`;
        const passLine = `EMAIL_PASS=${password}`;
        
        // Check if email settings already exist
        if (envContent.includes('EMAIL_USER=')) {
            envContent = envContent.replace(/EMAIL_USER=.*/g, emailLine);
            envContent = envContent.replace(/EMAIL_PASS=.*/g, passLine);
            console.log('?? Updated existing email settings in .env');
        } else {
            envContent += `\n${emailLine}\n${passLine}\n`;
            console.log('?? Added email settings to .env');
        }
        
        // Write to .env file
        fs.writeFileSync(envPath, envContent);
        
        console.log('');
        console.log('?? Email configuration saved!');
        console.log('?? Restart your server to use the new email settings');
        console.log('');
        console.log('?? Test email with:');
        console.log(`node quick-email-test.js ${email} ${password} test@gmail.com`);
        
        rl.close();
    });
});
