const mongoose = require('mongoose');
const Listing = require('./models/listing.js');

async function verifyHomepage() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
        console.log("Connected to DB");

        // Simulate the homepage data processing
        const allListings = await Listing.find({}).sort({ _id: -1 }).limit(100);
        const listings = allListings || [];
        const hasListings = listings.length > 0;

        // Helper functions (same as homepage)
        function getRandomListings(listings, count) {
            return listings.slice(0, Math.min(count, listings.length));
        }

        function getListingsByPriceRange(listings, minPrice, maxPrice) {
            return listings.filter(listing => {
                const price = listing.price || 0;
                return price >= minPrice && price <= maxPrice;
            });
        }

        function groupListingsByCity(listings) {
            const grouped = {};
            listings.forEach(listing => {
                const city = listing.location || 'Unknown';
                if (!grouped[city]) {
                    grouped[city] = [];
                }
                grouped[city].push(listing);
            });
            return grouped;
        }

        // Create sections (same as homepage)
        const groupedByCity = groupListingsByCity(listings);
        const cityNames = Object.keys(groupedByCity);
        const trendingListings = getRandomListings(listings, 6);
        const recommendedListings = getRandomListings(listings, 6);
        const budgetListings = getListingsByPriceRange(listings, 0, 3000).slice(0, 6);
        const premiumListings = getListingsByPriceRange(listings, 5000, 999999).slice(0, 6);

        console.log(`=== HOMEPAGE VERIFICATION ===`);
        console.log(`Total listings: ${listings.length}`);
        console.log(`Has listings: ${hasListings}`);
        console.log(`\n=== TRENDING STAYS (First 6) ===`);
        trendingListings.forEach((listing, index) => {
            console.log(`${index + 1}. ${listing.title} - ${listing.location} - Rs ${listing.price}/night`);
        });

        console.log(`\n=== BUDGET STAYS (Under Rs 3000) ===`);
        budgetListings.forEach((listing, index) => {
            console.log(`${index + 1}. ${listing.title} - ${listing.location} - Rs ${listing.price}/night`);
        });

        console.log(`\n=== PREMIUM STAYS (Rs 5000+) ===`);
        premiumListings.forEach((listing, index) => {
            console.log(`${index + 1}. ${listing.title} - ${listing.location} - Rs ${listing.price}/night`);
        });

        console.log(`\n=== CITY-BASED SECTIONS ===`);
        cityNames.slice(0, 3).forEach(city => {
            const cityListings = groupedByCity[city].slice(0, 3);
            console.log(`\n${city} (${cityListings.length} listings):`);
            cityListings.forEach((listing, index) => {
                console.log(`  ${index + 1}. ${listing.title} - Rs ${listing.price}/night`);
            });
        });

        await mongoose.disconnect();
    } catch (error) {
        console.error("Error:", error);
    }
}

verifyHomepage();
