const nodemailer = require('nodemailer');

// Test with hardcoded credentials first
async function testEmailWithCredentials(email, password, testTo) {
    console.log('Testing email with provided credentials...');
    
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: email,
                pass: password
            }
        });

        // Verify connection
        await transporter.verify();
        console.log('?? Transporter verified successfully!');

        // Send test email
        const mailOptions = {
            from: `"Wanderlust Test" <${email}>`,
            to: testTo,
            subject: 'Test Email - Wanderlust',
            html: `
                <h2>Test Email Successful! ??</h2>
                <p>This is a test email from Wanderlust booking system.</p>
                <p>If you receive this, email configuration is working!</p>
                <br>
                <p>Best regards,<br>Wanderlust Team</p>
            `,
            text: 'Test Email Successful! This is a test email from Wanderlust booking system.'
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('?? Email sent successfully!');
        console.log('Message ID:', result.messageId);
        console.log('Check your inbox at:', testTo);
        
        return { success: true, messageId: result.messageId };
        
    } catch (error) {
        console.error('?? Email test failed:', error.message);
        console.log('\n?? Common issues:');
        console.log('1. Enable 2-factor authentication on Gmail account');
        console.log('2. Generate App Password (not regular password)');
        console.log('3. Check email and password are correct');
        console.log('4. Make sure "Less secure app access" is enabled if needed');
        
        return { success: false, error: error.message };
    }
}

// Quick setup guide
console.log(`
========================================
?? QUICK EMAIL SETUP GUIDE
========================================

STEP 1: GMAIL SETUP
-------------------
1. Go to your Gmail account
2. Enable 2-factor authentication
3. Go to: https://myaccount.google.com/apppasswords
4. Select "Mail" app
5. Generate 16-character App Password
6. Copy this password (NOT your regular password!)

STEP 2: TEST EMAIL
------------------
Run this command with your credentials:

node quick-email-test.js YOUR_EMAIL@gmail.com YOUR_APP_PASSWORD your-test-email@gmail.com

Example:
node quick-email-test.js john@gmail.com abcd1234efgh5678 test@gmail.com

STEP 3: PERMANENT SETUP
-----------------------
Once test works, create .env file:
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

========================================
`);

// Check if credentials are provided as command line arguments
const args = process.argv.slice(2);
if (args.length >= 3) {
    const [email, password, testTo] = args;
    testEmailWithCredentials(email, password, testTo);
} else if (args.length > 0) {
    console.log('?? Please provide all required arguments:');
    console.log('node quick-email-test.js <your-email> <app-password> <test-to-email>');
} else {
    console.log('?? Run with your Gmail credentials to test email functionality');
}
