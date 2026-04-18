const mongoose = require('mongoose');
const Listing = require('./models/listing.js');

async function checkHotels() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
        console.log("Connected to DB");

        // Check total listings
        const totalCount = await Listing.countDocuments();
        console.log(`Total listings in DB: ${totalCount}`);

        // Check for our specific hotels
        const hotelTitles = [
            'Sea View Resort',
            'Mountain Escape Lodge', 
            'City Lights Hotel',
            'Royal Heritage Palace',
            'Luxury Villa Stay'
        ];

        for (const title of hotelTitles) {
            const hotel = await Listing.findOne({ title: title });
            if (hotel) {
                console.log(`Found: ${hotel.title} - ${hotel.location} - Rs ${hotel.price}/night`);
            } else {
                console.log(`Not found: ${title}`);
            }
        }

        // Get first few listings to see what's actually in DB
        const allListings = await Listing.find({}).limit(5);
        console.log('\nFirst 5 listings in DB:');
        allListings.forEach((listing, index) => {
            console.log(`${index + 1}. ${listing.title} - ${listing.location} - Rs ${listing.price}/night`);
        });

        await mongoose.disconnect();
    } catch (error) {
        console.error("Error:", error);
    }
}

checkHotels();
