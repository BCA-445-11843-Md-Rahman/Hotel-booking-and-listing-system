const { sendBookingConfirmation, testEmailConfig } = require('./services/emailService');

async function testEmailSystem() {
    console.log('=== Testing Email System ===');
    
    try {
        // Test email configuration
        console.log('1. Testing email configuration...');
        const configValid = await testEmailConfig();
        
        if (!configValid) {
            console.log('?? Email configuration failed. Please check your email settings.');
            console.log('?? Make sure to set up EMAIL_USER and EMAIL_PASS in your environment variables');
            console.log('?? Or update the email configuration in services/emailService.js');
            return;
        }
        
        console.log('?? Email configuration is valid!');
        
        // Test booking confirmation email
        console.log('\n2. Testing booking confirmation email...');
        
        const testBookingData = {
            userName: 'Test User',
            hotelName: 'Sea View Resort',
            location: 'Goa - Beachside resort with ocean view',
            checkIn: 'Mon, Dec 15, 2024',
            checkOut: 'Tue, Dec 16, 2024',
            guests: 2,
            price: 6558
        };
        
        const result = await sendBookingConfirmation('test@example.com', testBookingData);
        
        if (result.success) {
            console.log('?? Test email sent successfully!');
            console.log(`?? Message ID: ${result.messageId}`);
            console.log('?? Check your inbox for the booking confirmation email');
        } else {
            console.log('?? Email sending failed');
        }
        
    } catch (error) {
        console.error('?? Email test failed:', error.message);
        console.log('\n?? Troubleshooting tips:');
        console.log('1. Make sure you have set up EMAIL_USER and EMAIL_PASS environment variables');
        console.log('2. For Gmail: Enable 2-factor authentication and generate an App Password');
        console.log('3. Check that your email provider allows SMTP access');
        console.log('4. Verify the email credentials are correct');
    }
}

// Run the test
testEmailSystem();
