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
    next();
});

app.get("/", async (req,res)=>{
    const allListings = await Listing.find({}).limit(6);
    res.render("home", {allListings});
});

// index  route
app.get("/listings", async (req, res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
});

// new route
app.get("/listings/new", isLoggedIn, (req, res)=>{
    res.render("listings/new.ejs");
});

// show route
app.get("/listings/:id", async (req, res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", { listing });
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
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
});

// update route
app.put("/listings/:id",isLoggedIn, async(req, res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
res.redirect(`/listings/${id}`);
});

// delete route
app.delete("/listings/:id",isLoggedIn, async(req, res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
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

// booking
app.post("/book/:id", async(req,res)=>{

const booking = new Booking({

username:req.body.username,

date:req.body.date,

listing:req.params.id

});

await booking.save();

res.send("Booking Successful");

});

// review 
app.post("/listings/:id/reviews", async (req,res)=>{

const listing = await Listing.findById(req.params.id);

const review = new Review(req.body.review);

listing.reviews.push(review);

await review.save();

await listing.save();

res.redirect(`/listings/${listing._id}`);

});

// End


// app.get("/testListing", async (req,res)=>{
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