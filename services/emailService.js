const nodemailer = require('nodemailer');

// Email configuration
const emailConfig = {
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'wanderlust.hotel.booking@gmail.com', // Replace with your email
        pass: process.env.EMAIL_PASS || 'your-app-password' // Replace with your app password
    }
};

// Check if email credentials are configured
const isEmailConfigured = process.env.EMAIL_USER && process.env.EMAIL_PASS && 
                          process.env.EMAIL_USER !== 'wanderlust.hotel.booking@gmail.com' && 
                          process.env.EMAIL_PASS !== 'your-app-password';

// Create transporter
const transporter = nodemailer.createTransport(emailConfig);

/**
 * Send booking confirmation email to user
 * @param {string} userEmail - User's email address
 * @param {Object} bookingData - Booking details
 * @param {string} bookingData.userName - User's name
 * @param {string} bookingData.hotelName - Hotel name
 * @param {string} bookingData.location - Hotel location
 * @param {string} bookingData.checkIn - Check-in date
 * @param {string} bookingData.checkOut - Check-out date
 * @param {number} bookingData.guests - Number of guests
 * @param {number} bookingData.price - Total price
 */
async function sendBookingConfirmation(userEmail, bookingData) {
    try {
        // Check if email is configured
        if (!isEmailConfigured) {
            console.log('?? Email not configured - skipping email sending');
            console.log('?? To configure email, set EMAIL_USER and EMAIL_PASS environment variables');
            console.log('?? Or run: node quick-email-test.js to test email setup');
            return { success: false, message: 'Email not configured' };
        }

        const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Confirmed - Wanderlust</title>
    <style>
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #1F2937;
            margin: 0;
            padding: 0;
            background-color: #F9FAFB;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #FFFFFF;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #5a6fd8 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 2rem;
            font-weight: 700;
            letter-spacing: -0.5px;
        }
        .header p {
            margin: 10px 0 0 0;
            opacity: 0.9;
            font-size: 1.1rem;
        }
        .content {
            padding: 40px 30px;
        }
        .booking-details {
            background-color: #F7F9FC;
            border-radius: 8px;
            padding: 25px;
            margin: 25px 0;
            border-left: 4px solid #667eea;
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
            border-bottom: 1px solid #E5E7EB;
        }
        .detail-row:last-child {
            border-bottom: none;
        }
        .detail-label {
            font-weight: 600;
            color: #374151;
            font-size: 0.95rem;
        }
        .detail-value {
            color: #1F2937;
            font-weight: 500;
            text-align: right;
        }
        .highlight {
            color: #667eea;
            font-weight: 700;
        }
        .footer {
            background-color: #F7F9FC;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #E5E7EB;
        }
        .footer p {
            margin: 5px 0;
            color: #6B7280;
            font-size: 0.9rem;
        }
        .footer .brand {
            color: #667eea;
            font-weight: 600;
        }
        .action-button {
            display: inline-block;
            background: #667eea;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            margin: 20px 0;
            transition: background-color 0.2s ease;
        }
        .action-button:hover {
            background: #5a6fd8;
        }
        .welcome-message {
            font-size: 1.1rem;
            color: #4B5563;
            margin-bottom: 25px;
            line-height: 1.7;
        }
        .confirmation-badge {
            background: #10B981;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
            display: inline-block;
            margin-bottom: 20px;
        }
        @media (max-width: 600px) {
            .container {
                margin: 10px;
                border-radius: 8px;
            }
            .header, .content, .footer {
                padding: 25px 20px;
            }
            .detail-row {
                flex-direction: column;
                align-items: flex-start;
                gap: 5px;
            }
            .detail-value {
                text-align: left;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Booking Confirmed! ??</h1>
            <p>Your reservation is all set</p>
        </div>
        
        <div class="content">
            <div class="confirmation-badge">
                CONFIRMATION #${Date.now()}
            </div>
            
            <p class="welcome-message">
                Dear <span class="highlight">${bookingData.userName}</span>,<br><br>
                Your booking has been confirmed! We wish you a happy stay! Here are your booking details:
            </p>
            
            <div class="booking-details">
                <div class="detail-row">
                    <span class="detail-label">Hotel Name</span>
                    <span class="detail-value">${bookingData.hotelName}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Location</span>
                    <span class="detail-value">${bookingData.location}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Check-in Date</span>
                    <span class="detail-value">${bookingData.checkIn}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Check-out Date</span>
                    <span class="detail-value">${bookingData.checkOut}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Number of Guests</span>
                    <span class="detail-value">${bookingData.guests} ${bookingData.guests === 1 ? 'Guest' : 'Guests'}</span>
                </div>
                ${bookingData.price ? `
                <div class="detail-row">
                    <span class="detail-label">Total Price</span>
                    <span class="detail-value highlight">Rs ${bookingData.price.toLocaleString('en-IN')}</span>
                </div>
                ` : ''}
            </div>
            
            <p style="text-align: center; margin: 30px 0;">
                <a href="https://wanderlust.com/listings" class="action-button">
                    View More Hotels
                </a>
            </p>
            
            <p style="color: #6B7280; font-size: 0.9rem; text-align: center;">
                Please keep this email for your records. If you have any questions or need to make changes to your booking, feel free to contact our support team.
            </p>
        </div>
        
        <div class="footer">
            <p><span class="brand">Wanderlust</span> - Your Gateway to Amazing Stays</p>
            <p>Need help? Contact us at support@wanderlust.com</p>
            <p style="font-size: 0.8rem; margin-top: 15px;">
                This is an automated message. Please do not reply to this email.
            </p>
        </div>
    </div>
</body>
</html>
        `;

        const mailOptions = {
            from: `"Wanderlust" <${emailConfig.auth.user}>`,
            to: userEmail,
            subject: "Booking Confirmed - Wanderlust",
            html: htmlTemplate,
            text: `
Booking Confirmed - Wanderlust

Dear ${bookingData.userName},

Your booking has been confirmed! We wish you a happy stay!

Booking Details:
- Hotel: ${bookingData.hotelName}
- Location: ${bookingData.location}
- Check-in: ${bookingData.checkIn}
- Check-out: ${bookingData.checkOut}
- Guests: ${bookingData.guests}
${bookingData.price ? `- Total Price: Rs ${bookingData.price.toLocaleString('en-IN')}` : ''}

Thank you for choosing Wanderlust!

Wanderlust Team
support@wanderlust.com
            `
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('Booking confirmation email sent successfully:', result.messageId);
        return { success: true, messageId: result.messageId };

    } catch (error) {
        console.error('Error sending booking confirmation email:', error);
        console.log('?? Email setup troubleshooting:');
        console.log('1. Check EMAIL_USER and EMAIL_PASS environment variables');
        console.log('2. Verify Gmail 2FA is enabled and App Password is used');
        console.log('3. Run: node quick-email-test.js to test configuration');
        throw error;
    }
}

/**
 * Test email configuration
 */
async function testEmailConfig() {
    try {
        await transporter.verify();
        console.log('Email configuration is valid');
        return true;
    } catch (error) {
        console.error('Email configuration error:', error);
        return false;
    }
}

module.exports = {
    sendBookingConfirmation,
    testEmailConfig
};
