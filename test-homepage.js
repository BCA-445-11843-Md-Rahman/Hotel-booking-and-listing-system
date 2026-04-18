const mongoose = require('mongoose');
const Listing = require('./models/listing.js');

async function testHomepage() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
        console.log("Connected to DB");

        // Simulate the homepage query
        const allListings = await Listing.find({}).sort({ _id: -1 }).limit(100);
        
        console.log(`Total listings for homepage: ${allListings.length}`);
        
        // Show first 10 listings (what users will see first)
        console.log('\nFirst 10 listings (homepage order):');
        allListings.slice(0, 10).forEach((listing, index) => {
            console.log(`${index + 1}. ${listing.title} - ${listing.location} - Rs ${listing.price}/night`);
        });

        // Check if our hotels are in the first 10
        const ourHotels = [
            'Sea View Resort',
            'Mountain Escape Lodge', 
            'City Lights Hotel',
            'Royal Heritage Palace',
            'Luxury Villa Stay',
            'Beachfront Escape',
            'Skyline Suites'
        ];

        console.log('\nOur hotels in first 10 listings:');
        ourHotels.forEach(hotel => {
            const index = allListings.findIndex(l => l.title === hotel);
            if (index < 10 && index !== -1) {
                console.log(`Position ${index + 1}: ${hotel}`);
            }
        });

        await mongoose.disconnect();
    } catch (error) {
        console.error("Error:", error);
    }
}

testHomepage();
