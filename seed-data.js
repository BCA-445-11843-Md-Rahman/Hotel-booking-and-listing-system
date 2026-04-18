const mongoose = require('mongoose');
const Listing = require('./models/listing.js');

// Hotel data from user requirements
const hotelData = [
    {
        title: "Sea View Resort",
        location: "Goa – Beachside resort with ocean view",
        description: "Beachside resort with ocean view",
        price: Math.floor(Math.random() * 5000) + 3000, // Random price between 3000-8000
        country: "India",
        coordinates: {
            type: "Point",
            coordinates: [15.4909, 73.8278] // Goa coordinates
        },
        image: "https://source.unsplash.com/1600x900/?beach,resort,goa"
    },
    {
        title: "Mountain Escape Lodge",
        location: "Manali – Cozy mountain stay",
        description: "Cozy mountain stay",
        price: Math.floor(Math.random() * 4000) + 2000, // Random price between 2000-6000
        country: "India",
        coordinates: {
            type: "Point",
            coordinates: [32.2432, 77.1892] // Manali coordinates
        },
        image: "https://source.unsplash.com/1600x900/?mountain,lodge,manali"
    },
    {
        title: "City Lights Hotel",
        location: "Mumbai – Modern city hotel",
        description: "Modern city hotel",
        price: Math.floor(Math.random() * 6000) + 4000, // Random price between 4000-10000
        country: "India",
        coordinates: {
            type: "Point",
            coordinates: [19.0760, 72.8777] // Mumbai coordinates
        },
        image: "https://source.unsplash.com/1600x900/?hotel,city,mumbai"
    },
    {
        title: "Royal Heritage Palace",
        location: "Jaipur – Luxury palace stay",
        description: "Luxury palace stay",
        price: Math.floor(Math.random() * 8000) + 5000, // Random price between 5000-13000
        country: "India",
        coordinates: {
            type: "Point",
            coordinates: [26.9124, 75.7873] // Jaipur coordinates
        },
        image: "https://source.unsplash.com/1600x900/?palace,heritage,jaipur"
    },
    {
        title: "Backwater Bliss Resort",
        location: "Kerala – Peaceful backwater stay",
        description: "Peaceful backwater stay",
        price: Math.floor(Math.random() * 6000) + 4000, // Random price between 4000-10000
        country: "India",
        coordinates: {
            type: "Point",
            coordinates: [9.9312, 76.2673] // Kerala coordinates
        },
        image: "https://source.unsplash.com/1600x900/?backwater,resort,kerala"
    },
    {
        title: "Urban Stay Inn",
        location: "Delhi – Affordable city stay",
        description: "Affordable city stay",
        price: Math.floor(Math.random() * 3000) + 2000, // Random price between 2000-5000
        country: "India",
        coordinates: {
            type: "Point",
            coordinates: [28.6139, 77.2090] // Delhi coordinates
        },
        image: "https://source.unsplash.com/1600x900/?hotel,urban,delhi"
    },
    {
        title: "Desert Dunes Camp",
        location: "Jaisalmer – Desert luxury tents",
        description: "Desert luxury tents",
        price: Math.floor(Math.random() * 7000) + 6000, // Random price between 6000-13000
        country: "India",
        coordinates: {
            type: "Point",
            coordinates: [26.9157, 70.9233] // Jaisalmer coordinates
        },
        image: "https://source.unsplash.com/1600x900/?desert,camp,jaisalmer"
    },
    {
        title: "Lake View Retreat",
        location: "Udaipur – Scenic lake view stay",
        description: "Scenic lake view stay",
        price: Math.floor(Math.random() * 5000) + 4000, // Random price between 4000-9000
        country: "India",
        coordinates: {
            type: "Point",
            coordinates: [24.5807, 73.6878] // Udaipur coordinates
        },
        image: "https://source.unsplash.com/1600x900/?lake,retreat,udaipur"
    },
    {
        title: "Hilltop Paradise",
        location: "Shimla – Hilltop hotel",
        description: "Hilltop hotel",
        price: Math.floor(Math.random() * 6000) + 5000, // Random price between 5000-11000
        country: "India",
        coordinates: {
            type: "Point",
            coordinates: [31.1048, 77.1734] // Shimla coordinates
        },
        image: "https://source.unsplash.com/1600x900/?hill,hotel,shimla"
    },
    {
        title: "Luxury Villa Stay",
        location: "Bali – Private villa with pool",
        description: "Private villa with pool",
        price: Math.floor(Math.random() * 8000) + 7000, // Random price between 7000-15000
        country: "Indonesia",
        coordinates: {
            type: "Point",
            coordinates: [-8.3405, 115.0920] // Bali coordinates
        },
        image: "https://source.unsplash.com/1600x900/?villa,luxury,bali"
    },
    {
        title: "Beachfront Escape",
        location: "Bali – Beachside stay",
        description: "Beachside stay",
        price: Math.floor(Math.random() * 6000) + 5000, // Random price between 5000-11000
        country: "Indonesia",
        coordinates: {
            type: "Point",
            coordinates: [-8.4095, 115.1889] // Bali beach coordinates
        },
        image: "https://source.unsplash.com/1600x900/?beach,resort,bali"
    },
    {
        title: "Tropical Garden Resort",
        location: "Bali – Green resort",
        description: "Green resort",
        price: Math.floor(Math.random() * 5000) + 4000, // Random price between 4000-9000
        country: "Indonesia",
        coordinates: {
            type: "Point",
            coordinates: [-8.6500, 115.2167] // Bali garden coordinates
        },
        image: "https://source.unsplash.com/1600x900/?tropical,garden,bali"
    },
    {
        title: "Skyline Suites",
        location: "Dubai – Luxury skyline hotel",
        description: "Luxury skyline hotel",
        price: Math.floor(Math.random() * 10000) + 8000, // Random price between 8000-18000
        country: "UAE",
        coordinates: {
            type: "Point",
            coordinates: [25.2048, 55.2708] // Dubai coordinates
        },
        image: "https://source.unsplash.com/1600x900/?skyline,hotel,dubai"
    },
    {
        title: "Snow Peak Inn",
        location: "Switzerland – Mountain hotel",
        description: "Mountain hotel",
        price: Math.floor(Math.random() * 8000) + 10000, // Random price between 10000-18000
        country: "Switzerland",
        coordinates: {
            type: "Point",
            coordinates: [46.8182, 8.2275] // Switzerland coordinates
        },
        image: "https://source.unsplash.com/1600x900/?snow,mountain,switzerland"
    },
    {
        title: "City Center Hotel",
        location: "New York – Central hotel",
        description: "Central hotel",
        price: Math.floor(Math.random() * 10000) + 12000, // Random price between 12000-22000
        country: "USA",
        coordinates: {
            type: "Point",
            coordinates: [40.7128, -74.0060] // New York coordinates
        },
        image: "https://source.unsplash.com/1600x900/?hotel,city,newyork"
    }
];

async function seedDatabase() {
    try {
        // Connect to MongoDB
        const MONGO_Url = "mongodb://127.0.0.1:27017/wanderlust";
        await mongoose.connect(MONGO_Url);
        console.log("Connected to DB for seeding");

        // Clear existing listings (optional - remove if you want to keep existing data)
        // await Listing.deleteMany({});
        // console.log("Cleared existing listings");

        // Insert new hotel data
        const insertedListings = await Listing.insertMany(hotelData);
        console.log(`Successfully inserted ${insertedListings.length} hotel listings`);

        // Display inserted listings
        insertedListings.forEach((listing, index) => {
            console.log(`${index + 1}. ${listing.title} - ${listing.location} - ₹${listing.price}/night`);
        });

        await mongoose.disconnect();
        console.log("Disconnected from DB");
        console.log("Seeding completed successfully!");

    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
}

// Run the seeding function
seedDatabase();
