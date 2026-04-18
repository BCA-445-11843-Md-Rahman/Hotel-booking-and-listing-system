# Email Configuration Setup Guide

## Overview
This project uses Nodemailer to send booking confirmation emails to users after successful bookings.

## Quick Setup

### 1. Install Dependencies
```bash
npm install nodemailer
```

### 2. Configure Email Credentials

#### Option A: Environment Variables (Recommended)
Create a `.env` file in your project root:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

#### Option B: Direct Configuration
Update `services/emailService.js`:

```javascript
const emailConfig = {
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-app-password'
    }
};
```

### 3. Gmail Setup (Most Common)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security > 2-Step Verification > App passwords
   - Generate a new app password for "Mail"
   - Use this app password (not your regular password)

### 4. Test the Configuration
```bash
node test-email.js
```

## Email Features

### Booking Confirmation Email
- **Trigger**: After successful booking completion
- **Recipient**: User's registered email address
- **Content**: Hotel details, dates, pricing, confirmation message
- **Design**: Professional HTML template with brand styling

### Error Handling
- Email failures are logged but don't break the booking process
- Users still get booking confirmation even if email fails
- Admin can check logs for email delivery issues

## Email Template Content

The booking confirmation email includes:
- User's name
- Hotel name and location
- Check-in/check-out dates
- Number of guests
- Total price
- Confirmation number
- Professional branding

## Troubleshooting

### Common Issues

1. **Authentication Failed**
   - Check 2FA is enabled
   - Use App Password (not regular password)
   - Verify email and password are correct

2. **Connection Timeout**
   - Check internet connection
   - Verify SMTP settings
   - Try alternative SMTP service

3. **Email Not Received**
   - Check spam/junk folder
   - Verify recipient email address
   - Check email logs in console

### Alternative SMTP Services

If Gmail doesn't work, try:
- **SendGrid**: Requires API key setup
- **Mailgun**: Requires domain verification
- **Outlook/Hotmail**: Similar App Password setup

## Security Notes

- Never commit email credentials to version control
- Use environment variables in production
- Use App Passwords instead of regular passwords
- Consider using dedicated transactional email services for production

## Production Deployment

For production environments:
1. Use environment variables for credentials
2. Set up proper DNS records (SPF, DKIM)
3. Consider using a dedicated email service (SendGrid, Mailgun)
4. Monitor email delivery rates and bounces
5. Set up email logging and analytics

## Support

If you encounter issues:
1. Check the console logs for error messages
2. Verify your email provider's SMTP settings
3. Test with the `test-email.js` script
4. Check your email provider's documentation

---

**Note**: The email system is designed to be non-blocking. Even if email sending fails, the booking process continues successfully.
