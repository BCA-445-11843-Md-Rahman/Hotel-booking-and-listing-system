const express = require('express')
const app = express();
const mongoose = require('mongoose');
const ejs = require('ejs');
const Listing = require("./models/listing.js");
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const {isLoggedIn, storeReturnTo} = require("./middleware");
const User = require("./models/user");
const Booking = require("./models/booking");
const Review = require("./models/review");
const ContactMessage = require("./models/contactMessage");
const { sendBookingConfirmation } = require("./services/emailService");
const nodemailer = require('nodemailer');

// Email configuration - simplified without .env dependency
const emailConfig = {
    service: 'gmail',
    auth: {
        user: 'wanderlust.hotel.booking@gmail.com',
        pass: 'your-app-password'
    }
};

// Create transporter
const transporter = nodemailer.createTransport(emailConfig);

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const MONGO_Url ="mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_Url);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

// Session configuration
const sessionConfig = {
    secret: "mysupersecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};
app.use(session(sessionConfig));
app.use(flash());

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    {
        usernameField: "username",
        passwordField: "password"
    },
    async (username, password, done) => {
        try {
            const user = await User.findOne({ username });
            
            if (!user) {
                return done(null, false, { message: "Invalid username or password" });
            }
            
            const isMatch = await user.comparePassword(password);
            
            if (!isMatch) {
                return done(null, false, { message: "Invalid username or password" });
            }
            
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.info = req.flash('info');
    next();
});

// Middleware to provide unread message count for admin notification
app.use(async (req, res, next) => {
    if (req.user && (req.user.role === 'admin' || req.user.role === 'admin')) {
        try {
            const unreadCount = await ContactMessage.countDocuments({ isRead: false });
            res.locals.unreadCount = unreadCount;
        } catch (error) {
            console.error('Error fetching unread count:', error);
            res.locals.unreadCount = 0;
        }
    }
    next();
});

app.get("/", async (req,res)=>{
    const allListings = await Listing.find({}).limit(100);
    res.render("home", {allListings});
});

// About page
app.get("/about", (req, res) => {
    const aboutData = {
        adminName: "John Doe",
        adminRole: "Lead Developer & Founder",
        editorName: "Jane Smith",
        editorRole: "Content Manager",
        developerName: "Robert Johnson",
        developerRole: "Backend Engineer",
        companyName: "Wanderlust",
        companyFounded: "2023",
        companyLocation: "Adventure City, AC 12345",
        companyEmail: "info@wanderlust.com",
        companyPhone: "+1 (555) 123-4567"
    };
    res.render("about.ejs", aboutData);
});

// Contact page
app.get("/contact", (req, res) => {
    const contactData = {
        companyName: "Wanderlust",
        companyEmail: "info@wanderlust.com",
        companyPhone: "+1 (555) 123-4567",
        companyAddress: "123 Travel Street, Adventure City, AC 12345",
        companyTollFree: "1-800-WANDER",
        supportEmail: "support@wanderlust.com"
    };
    res.render("contact.ejs", contactData);
});

// Contact form submission
app.post("/contact", async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;
        
        // Debug: Log form data
        console.log("Contact form submission:", { name, email, phone, subject, message });
        
        // Validate required fields
        if (!name || !email || !phone || !subject || !message) {
            req.flash('error', 'All fields are required');
            return res.redirect("/contact");
        }
        
        // Create new contact message
        const newMessage = new ContactMessage({
            name,
            email,
            phone,
            subject,
            message
        });
        
        await newMessage.save();
        
        // Debug: Log successful save
        console.log("Contact message saved successfully:", newMessage._id);
        
        req.flash('success', 'Your message has been sent successfully! We will get back to you soon.');
        res.redirect("/contact");
        
    } catch (error) {
        console.error("Error saving contact message:", error);
        req.flash('error', 'Failed to send message. Please try again.');
        res.redirect("/contact");
    }
});

// index  route
app.get("/listings", async (req, res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
});

// search route
app.get("/listings/search", async (req, res) => {
    const { q, price, type, location, amenities } = req.query;
    try {
        let searchQuery = {};
        
        // Text search
        if (q) {
            searchQuery.$or = [
                { title: { $regex: q, $options: 'i' } },
                { description: { $regex: q, $options: 'i' } },
                { location: { $regex: q, $options: 'i' } },
                { country: { $regex: q, $options: 'i' } }
            ];
        }
        
        // Price filter
        if (price) {
            searchQuery.price = {};
            if (price === '0-2000') {
                searchQuery.price.$lte = 2000;
            } else if (price === '2000-5000') {
                searchQuery.price.$gte = 2000;
                searchQuery.price.$lte = 5000;
            } else if (price === '5000-10000') {
                searchQuery.price.$gte = 5000;
                searchQuery.price.$lte = 10000;
            } else if (price === '10000+') {
                searchQuery.price.$gte = 10000;
            }
        }
        
        // Property type filter
        if (type) {
            searchQuery.propertyType = type;
        }
        
        // Location filter
        if (location && !q) {
            searchQuery.$or = [
                { location: { $regex: location, $options: 'i' } },
                { country: { $regex: location, $options: 'i' } }
            ];
        }
        
        // Amenities filter
        if (amenities) {
            const amenityList = amenities.split(',').filter(a => a.trim());
            if (amenityList.length > 0) {
                searchQuery.amenities = { $in: amenityList };
            }
        }
        
        const searchResults = await Listing.find(searchQuery);
        res.render("listings/index.ejs", { allListings: searchResults, searchQuery: q });
    } catch (err) {
        req.flash('error', 'Search failed. Please try again.');
        res.redirect("/listings");
    }
});

// search suggestions route
app.get("/listings/search-suggestions", async (req, res) => {
    const { q } = req.query;
    try {
        if (!q || q.length < 2) {
            return res.json([]);
        }
        
        const suggestions = await Listing.find({
            $or: [
                { title: { $regex: q, $options: 'i' } },
                { location: { $regex: q, $options: 'i' } }
            ]
        }).limit(5).select('title location country price');
        
        res.json(suggestions);
    } catch (err) {
        res.json([]);
    }
});

// advanced search route
app.get("/listings/advanced-search", async (req, res) => {
    try {
        // Build search query
        let searchQuery = {};
        
        // Text search
        if (req.query.q) {
            searchQuery.$or = [
                { title: { $regex: req.query.q, $options: 'i' } },
                { description: { $regex: req.query.q, $options: 'i' } },
                { location: { $regex: req.query.q, $options: 'i' } },
                { country: { $regex: req.query.q, $options: 'i' } }
            ];
        }
        
        // Price range
        if (req.query.minPrice || req.query.maxPrice) {
            searchQuery.price = {};
            if (req.query.minPrice) {
                searchQuery.price.$gte = parseInt(req.query.minPrice);
            }
            if (req.query.maxPrice) {
                searchQuery.price.$lte = parseInt(req.query.maxPrice);
            }
        }
        
        // Property type
        if (req.query.propertyType && Array.isArray(req.query.propertyType)) {
            searchQuery.propertyType = { $in: req.query.propertyType };
        } else if (req.query.propertyType) {
            searchQuery.propertyType = req.query.propertyType;
        }
        
        // Bedrooms
        if (req.query.bedrooms) {
            searchQuery.bedrooms = { $gte: parseInt(req.query.bedrooms) };
        }
        
        // Bathrooms
        if (req.query.bathrooms) {
            searchQuery.bathrooms = { $gte: parseInt(req.query.bathrooms) };
        }
        
        // Max guests
        if (req.query.maxGuests) {
            searchQuery.maxGuests = { $gte: parseInt(req.query.maxGuests) };
        }
        
        // Amenities
        if (req.query.amenities && Array.isArray(req.query.amenities)) {
            searchQuery.amenities = { $in: req.query.amenities };
        } else if (req.query.amenities) {
            searchQuery.amenities = { $in: [req.query.amenities] };
        }
        
        // Rating
        if (req.query.rating) {
            searchQuery.rating = { $gte: parseFloat(req.query.rating) };
        }
        
        // Sorting
        let sortOptions = {};
        switch (req.query.sort) {
            case 'price-low':
                sortOptions.price = 1;
                break;
            case 'price-high':
                sortOptions.price = -1;
                break;
            case 'rating':
                sortOptions.rating = -1;
                break;
            case 'newest':
                sortOptions.createdAt = -1;
                break;
            default:
                sortOptions.createdAt = -1;
        }
        
        // Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = 12;
        const skip = (page - 1) * limit;
        
        // Execute search
        const properties = await Listing.find(searchQuery)
            .sort(sortOptions)
            .skip(skip)
            .limit(limit)
            .populate('reviews');
        
        // Calculate total count
        const total = await Listing.countDocuments(searchQuery);
        
        // Send JSON response for AJAX
        if (req.headers.accept && req.headers.accept.includes('application/json')) {
            return res.json({
                properties: properties,
                total: total,
                page: page,
                totalPages: Math.ceil(total / limit)
            });
        }
        
        // Regular page render
        res.render("listings/search.ejs", { 
            properties: properties, 
            total: total,
            searchQuery: req.query 
        });
        
    } catch (err) {
        console.error('Advanced search error:', err);
        if (req.headers.accept && req.headers.accept.includes('application/json')) {
            return res.status(500).json({ error: 'Search failed. Please try again.' });
        }
        req.flash('error', 'Search failed. Please try again.');
        res.redirect("/listings");
    }
});

// advanced search page route
app.get("/search", (req, res) => {
    res.render("listings/search.ejs", { 
        properties: [], 
        total: 0,
        searchQuery: {} 
    });
});

// new route
app.get("/listings/new", isLoggedIn, (req, res)=>{
    res.render("listings/new.ejs");
});

// show route
app.get("/listings/:id", async (req, res)=>{
    let {id} = req.params;
    try {
        // Validate ObjectId format
        const mongoose = require('mongoose');
        if (!mongoose.Types.ObjectId.isValid(id)) {
            req.flash('error', 'Invalid property ID');
            return res.redirect('/listings');
        }
        
        const objectId = new mongoose.Types.ObjectId(id);
        const listing = await Listing.findById(objectId).populate("reviews");
        
        if (!listing) {
            req.flash('error', 'Property not found');
            return res.redirect('/listings');
        }
        
        res.render("listings/show.ejs", { listing });
    } catch (err) {
        console.error('Error fetching listing:', err);
        req.flash('error', 'Error loading property');
        res.redirect('/listings');
    }
}); 

// create Route

app.post("/listings", async (req, res, next)=>{
    try {
        const newListing = new Listing(req.body.listing);
        await newListing.save();
        res.redirect("/listings");
    } catch (err) {
        next(err);
    }
});

// Edit Route 
app.get("/listings/:id/edit", isLoggedIn, async(req, res)=>{
    let {id} = req.params;
    try {
        const mongoose = require('mongoose');
        if (!mongoose.Types.ObjectId.isValid(id)) {
            req.flash('error', 'Invalid property ID');
            return res.redirect('/listings');
        }
        
        const objectId = new mongoose.Types.ObjectId(id);
        const listing = await Listing.findById(objectId);
        
        if (!listing) {
            req.flash('error', 'Property not found');
            return res.redirect('/listings');
        }
        
        res.render("listings/edit.ejs", {listing});
    } catch (err) {
        console.error('Error fetching listing for edit:', err);
        req.flash('error', 'Error loading property');
        res.redirect('/listings');
    }
});

// update route
app.put("/listings/:id",isLoggedIn, async(req, res)=>{
    let {id} = req.params;
    try {
        const mongoose = require('mongoose');
        if (!mongoose.Types.ObjectId.isValid(id)) {
            req.flash('error', 'Invalid property ID');
            return res.redirect('/listings');
        }
        
        const objectId = new mongoose.Types.ObjectId(id);
        await Listing.findByIdAndUpdate(objectId, { ...req.body.listing });
        req.flash('success', 'Property updated successfully');
        res.redirect(`/listings/${id}`);
    } catch (err) {
        console.error('Error updating listing:', err);
        req.flash('error', 'Error updating property');
        res.redirect(`/listings/${id}/edit`);
    }
});

// delete route
app.delete("/listings/:id",isLoggedIn, async(req, res) => {
    let {id} = req.params;
    try {
        const mongoose = require('mongoose');
        if (!mongoose.Types.ObjectId.isValid(id)) {
            req.flash('error', 'Invalid property ID');
            return res.redirect('/listings');
        }
        
        const objectId = new mongoose.Types.ObjectId(id);
        let deletedListing = await Listing.findByIdAndDelete(objectId);
        
        if (deletedListing) {
            console.log('Deleted listing:', deletedListing);
            req.flash('success', 'Property deleted successfully');
        } else {
            req.flash('error', 'Property not found');
        }
        
        res.redirect("/listings");
    } catch (err) {
        console.error('Error deleting listing:', err);
        req.flash('error', 'Error deleting property');
        res.redirect("/listings");
    }
});

// Register page
app.get("/register", (req, res) => {
    res.render("users/register.ejs");
});

app.post("/register", async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ email, username, password });
        await user.save();
        req.login(user, (err) => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Wanderlust!');
            res.redirect('/listings');
        });
    } catch (err) {
        if (err.code === 11000) {
            // Duplicate key error
            if (err.keyPattern?.email) {
                req.flash('error', 'Email already exists. Please use a different email.');
            } else if (err.keyPattern?.username) {
                req.flash('error', 'Username already taken. Please choose a different username.');
            } else {
                req.flash('error', 'Account already exists. Please try logging in.');
            }
        } else {
            req.flash('error', err.message);
        }
        res.redirect('/register');
    }
});

// Login page
app.get("/login", (req, res) => {
    res.render("users/login.ejs");
});

app.post("/login", storeReturnTo, passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/login'
}), (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = res.locals.returnTo || '/listings';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
});

// Logout route
app.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/listings');
    });
});

// Forgot Password page
app.get("/forgot-password", (req, res) => {
    res.render("users/forgot-password.ejs");
});

// Handle forgot password request
app.post("/forgot-password", async (req, res) => {
    try {
        const { email } = req.body;
        
        // Find user by email
        const user = await User.findOne({ email: email.toLowerCase() });
        
        if (!user) {
            req.flash('error', 'No account found with that email address');
            return res.redirect('/forgot-password');
        }
        
        // Generate reset token
        const crypto = require('crypto');
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
        
        // Save token to user
        user.passwordResetToken = resetToken;
        user.passwordResetExpires = resetExpires;
        await user.save();
        
        // Send password reset email (async, non-blocking)
        sendPasswordResetEmail(user.email, user.username, resetToken).catch(error => {
            console.error('Failed to send password reset email:', error);
            // Don't break the process if email fails
        });
        
        req.flash('success', `Password reset link sent to ${email}. Please check your inbox.`);
        res.redirect('/forgot-password');
        
    } catch (err) {
        console.error('Forgot password error:', err);
        req.flash('error', 'Something went wrong. Please try again.');
        res.redirect('/forgot-password');
    }
});

// Helper function to send password reset email
async function sendPasswordResetEmail(userEmail, userName, resetToken) {
    try {
        const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;
        
        const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset - Wanderlust</title>
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
        .content {
            padding: 40px 30px;
        }
        .reset-button {
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
        .reset-button:hover {
            background: #5a6fd8;
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
        .warning {
            background: #FEF3C7;
            border: 1px solid #F59E0B;
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
            color: #92400E;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Password Reset</h1>
            <p>Reset your Wanderlust password</p>
        </div>
        
        <div class="content">
            <p>Hello <strong>${userName}</strong>,</p>
            
            <p>We received a request to reset your password for your Wanderlust account. Click the button below to reset your password:</p>
            
            <p style="text-align: center;">
                <a href="${resetUrl}" class="reset-button">Reset Password</a>
            </p>
            
            <div class="warning">
                <strong>Important:</strong> This link will expire in 15 minutes for security reasons.
            </div>
            
            <p>If you didn't request this password reset, please ignore this email. Your password will remain unchanged.</p>
            
            <p>Alternatively, you can copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #667eea; font-family: monospace;">${resetUrl}</p>
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
            subject: "Password Reset - Wanderlust",
            html: htmlTemplate,
            text: `
Password Reset - Wanderlust

Hello ${userName},

We received a request to reset your password for your Wanderlust account.

Click this link to reset your password: ${resetUrl}

This link will expire in 15 minutes for security reasons.

If you didn't request this password reset, please ignore this email.

Wanderlust Team
support@wanderlust.com
            `
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('Password reset email sent successfully:', result.messageId);
        return { success: true, messageId: result.messageId };

    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw error;
    }
}

// Reset Password page
app.get("/reset-password/:token", async (req, res) => {
    try {
        const { token } = req.params;
        
        // Find user with valid token
        const user = await User.findOne({
            passwordResetToken: token,
            passwordResetExpires: { $gt: Date.now() }
        });
        
        if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired');
            return res.redirect('/forgot-password');
        }
        
        res.render("users/reset-password.ejs", { token });
        
    } catch (err) {
        console.error('Reset password page error:', err);
        req.flash('error', 'Invalid reset link');
        res.redirect('/forgot-password');
    }
});

// Handle reset password
app.post("/reset-password/:token", async (req, res) => {
    try {
        const { token } = req.params;
        const { password, confirmPassword } = req.body;
        
        // Validate passwords
        if (!password || password.length < 6) {
            req.flash('error', 'Password must be at least 6 characters long');
            return res.redirect(`/reset-password/${token}`);
        }
        
        if (password !== confirmPassword) {
            req.flash('error', 'Passwords do not match');
            return res.redirect(`/reset-password/${token}`);
        }
        
        // Find user with valid token
        const user = await User.findOne({
            passwordResetToken: token,
            passwordResetExpires: { $gt: Date.now() }
        });
        
        if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired');
            return res.redirect('/forgot-password');
        }
        
        // Update password and clear reset token
        user.password = password;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();
        
        req.flash('success', 'Password reset successful! Please login with your new password');
        res.redirect('/login');
        
    } catch (err) {
        console.error('Reset password error:', err);
        req.flash('error', 'Something went wrong. Please try again.');
        res.redirect(`/reset-password/${token}`);
    }
});

// GET booking page
app.get("/book/:id", isLoggedIn, async(req, res) => {
    try {
        // Validate ObjectId format
        const mongoose = require('mongoose');
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            req.flash('error', 'Invalid property ID');
            return res.redirect('/listings');
        }
        
        const objectId = new mongoose.Types.ObjectId(req.params.id);
        const listing = await Listing.findById(objectId);
        
        if (!listing) {
            req.flash('error', 'Property not found');
            return res.redirect('/listings');
        }
        
        res.render("book.ejs", { listing });
    } catch (err) {
        console.error('Error fetching listing for booking:', err);
        req.flash('error', 'Error loading booking page');
        res.redirect('/listings');
    }
});

// POST booking
app.post("/book/:id", isLoggedIn, async(req, res) => {
    try {
        // Get listing details for email
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            req.flash('error', 'Property not found');
            return res.redirect("/listings");
        }

        const booking = new Booking({
            username: req.user.username,
            date: req.body.date,
            listing: req.params.id
        });
        
        await booking.save();
        
        // Send booking confirmation email (async, non-blocking)
        sendBookingConfirmationEmail(req.user, listing, req.body.date).catch(error => {
            console.error('Failed to send booking confirmation email:', error);
            // Don't break the booking process if email fails
        });
        
        req.flash('success', 'Your booking has been confirmed! Check your email for details. Enjoy your stay! ');
        res.redirect('/listings');
    } catch (err) {
        console.error('Booking error:', err);
        req.flash('error', 'Booking failed. Please try again.');
        res.redirect(`/listings/${req.params.id}`);
    }
});

// Helper function to send booking confirmation email
async function sendBookingConfirmationEmail(user, listing, bookingDate) {
    try {
        // Parse booking date to get check-in and check-out dates
        const date = new Date(bookingDate);
        const checkIn = date.toLocaleDateString('en-US', { 
            weekday: 'short', 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
        
        // Add 1 day for check-out (assuming 1 night stay)
        const checkOutDate = new Date(date);
        checkOutDate.setDate(checkOutDate.getDate() + 1);
        const checkOut = checkOutDate.toLocaleDateString('en-US', { 
            weekday: 'short', 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });

        const bookingData = {
            userName: user.username,
            hotelName: listing.title,
            location: listing.location,
            checkIn: checkIn,
            checkOut: checkOut,
            guests: 1, // Default to 1 guest, can be updated based on form data
            price: listing.price
        };

        await sendBookingConfirmation(user.email, bookingData);
        console.log(`Booking confirmation email sent to ${user.email}`);
        
    } catch (error) {
        console.error('Error in sendBookingConfirmationEmail:', error);
        throw error;
    }
}

// review 
app.post("/listings/:id/reviews", async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    const review = new Review(req.body.review);
    listing.reviews.push(review);
    await review.save();
    await listing.save();
    res.redirect(`/listings/${listing._id}`);
});

// Admin Dashboard
app.get("/admin/dashboard", isLoggedIn, async (req, res) => {
    try {
        // Check if user is admin
        if (req.user.role !== 'admin') {
            req.flash('error', 'Access denied. Admin privileges required.');
            return res.redirect("/listings");
        }
        
        // Fetch all listings for admin management
        const listings = await Listing.find({}).sort({ createdAt: -1 });
        
        // Fetch total bookings count
        const totalBookings = await Booking.countDocuments();
        
        // Fetch all bookings with listing details
        const bookings = await Booking.find({})
            .populate('listing', 'title location')
            .sort({ createdAt: -1 });
        
        res.render("admin/dashboard.ejs", { listings, totalBookings, bookings });
        
    } catch (error) {
        console.error("Error fetching dashboard:", error);
        req.flash('error', 'Failed to load dashboard');
        res.redirect("/listings");
    }
});

// Test route to create sample message
app.get("/test-message", async (req, res) => {
    try {
        const testMessage = new ContactMessage({
            name: "Test User",
            email: "test@example.com",
            phone: "+1234567890",
            subject: "Test Message",
            message: "This is a test message to verify the notification system works properly."
        });
        
        await testMessage.save();
        console.log("Test message created:", testMessage._id);
        
        res.send("Test message created successfully! Check admin messages.");
    } catch (error) {
        console.error("Error creating test message:", error);
        res.send("Error creating test message");
    }
});

// Admin Messages Dashboard
app.get("/admin/messages", isLoggedIn, async (req, res) => {
    try {
        // Check if user is admin
        if (req.user.role !== 'admin') {
            req.flash('error', 'Access denied. Admin privileges required.');
            return res.redirect("/listings");
        }
        
        // Fetch all messages sorted by newest first
        const messages = await ContactMessage.find({}).sort({ createdAt: -1 });
        
        // Debug: Log messages count and data
        console.log("Messages found:", messages.length);
        if (messages.length > 0) {
            console.log("First message:", messages[0]);
        }
        
        // Count unread messages
        const unreadCount = await ContactMessage.countDocuments({ isRead: false });
        console.log("Unread count:", unreadCount);
        
        // Mark messages as read
        await ContactMessage.updateMany({ isRead: false }, { $set: { isRead: true } });
        
        res.render("admin/messages.ejs", { messages, unreadCount });
        
    } catch (error) {
        console.error("Error fetching messages:", error);
        req.flash('error', 'Failed to load messages');
        res.redirect("/listings");
    }
});

// Delete message route
app.delete("/admin/messages/:id", isLoggedIn, async (req, res) => {
    try {
        // Check if user is admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied' });
        }
        
        await ContactMessage.findByIdAndDelete(req.params.id);
        res.json({ success: true });
        
    } catch (error) {
        console.error("Error deleting message:", error);
        res.status(500).json({ error: 'Failed to delete message' });
    }
});

// Mark message as read/unread
app.patch("/admin/messages/:id/read", isLoggedIn, async (req, res) => {
    try {
        // Check if user is admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied' });
        }
        
        const message = await ContactMessage.findById(req.params.id);
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }
        
        message.isRead = !message.isRead;
        await message.save();
        
        res.json({ success: true, isRead: message.isRead });
        
    } catch (error) {
        console.error("Error updating message:", error);
        res.status(500).json({ error: 'Failed to update message' });
    }
});

// End

// ... (rest of the code remains the same)
//     let sampleListing = new listing({
//         title: "My New villa",
//         description: "By the beach",
//         price: 1200,
//         location: "Calangute, Goa",
//         country: "India",
//     });
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing");
// });

app.use((err, req, res, next)=>{
    console.log(err);
    res.send(err.message);
});

app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});