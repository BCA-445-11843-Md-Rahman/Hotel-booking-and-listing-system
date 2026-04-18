const mongoose = require('mongoose');
const Listing = require('./models/listing');

const MONGO_Url = "mongodb://127.0.0.1:27017/wanderlust";

async function createWorldwideListings() {
    try {
        await mongoose.connect(MONGO_Url);
        console.log('Connected to DB');
        
        // Clear existing listings
        await Listing.deleteMany({});
        console.log('Cleared existing listings');
        
        // Worldwide listings
        const worldwideListings = [
            {
                title: "Luxury Villa in Bali, Indonesia",
                description: "Stunning beachfront villa with private pool and ocean views.",
                image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                price: 12000,
                location: "Seminyak, Bali",
                country: "Indonesia",
                coordinates: { lat: -8.6705, lng: 115.2126 },
                propertyType: "villa",
                bedrooms: 4,
                bathrooms: 3,
                maxGuests: 8,
                area: 3000,
                amenities: ["wifi", "parking", "pool", "gym", "air-conditioning", "kitchen", "tv", "washer", "garden", "balcony"],
                rating: 4.8,
                reviewsCount: 25
            },
            {
                title: "Modern Apartment in Dubai, UAE",
                description: "Luxury apartment with Burj Khalifa views and world-class amenities.",
                image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                price: 8500,
                location: "Dubai Marina",
                country: "UAE",
                coordinates: { lat: 25.0777, lng: 55.1345 },
                propertyType: "apartment",
                bedrooms: 2,
                bathrooms: 2,
                maxGuests: 4,
                area: 1200,
                amenities: ["wifi", "parking", "gym", "air-conditioning", "kitchen", "tv", "washer", "elevator", "security"],
                rating: 4.6,
                reviewsCount: 18
            },
            {
                title: "Cozy Cottage in London, UK",
                description: "Charming cottage in the heart of London with modern amenities.",
                image: "https://images.unsplash.com/photo-1566665713268-5db8ae4e4c0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                price: 15000,
                location: "Notting Hill, London",
                country: "UK",
                coordinates: { lat: 51.5154, lng: -0.1915 },
                propertyType: "house",
                bedrooms: 2,
                bathrooms: 1,
                maxGuests: 4,
                area: 800,
                amenities: ["wifi", "kitchen", "tv", "washer", "garden", "security"],
                rating: 4.4,
                reviewsCount: 12
            },
            {
                title: "Beach Resort in Maldives",
                description: "Overwater villa with direct ocean access and luxury spa.",
                image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                price: 25000,
                location: "Male Atoll",
                country: "Maldives",
                coordinates: { lat: 3.2028, lng: 73.2207 },
                propertyType: "resort",
                bedrooms: 1,
                bathrooms: 1,
                maxGuests: 2,
                area: 1500,
                amenities: ["wifi", "parking", "pool", "gym", "air-conditioning", "kitchen", "tv", "balcony", "breakfast", "security"],
                rating: 4.9,
                reviewsCount: 35
            },
            {
                title: "Penthouse in New York, USA",
                description: "Luxury penthouse with Manhattan skyline views and rooftop terrace.",
                image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                price: 20000,
                location: "Manhattan, New York",
                country: "USA",
                coordinates: { lat: 40.7589, lng: -73.9851 },
                propertyType: "apartment",
                bedrooms: 3,
                bathrooms: 2,
                maxGuests: 6,
                area: 2000,
                amenities: ["wifi", "parking", "gym", "air-conditioning", "kitchen", "tv", "washer", "elevator", "security", "balcony"],
                rating: 4.7,
                reviewsCount: 28
            },
            {
                title: "Traditional Ryokan in Tokyo, Japan",
                description: "Authentic Japanese experience with modern comforts and onsen.",
                image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                price: 9500,
                location: "Shibuya, Tokyo",
                country: "Japan",
                coordinates: { lat: 35.6586, lng: 139.7454 },
                propertyType: "hotel",
                bedrooms: 1,
                bathrooms: 1,
                maxGuests: 2,
                area: 400,
                amenities: ["wifi", "air-conditioning", "tv", "elevator", "security", "breakfast"],
                rating: 4.5,
                reviewsCount: 20
            },
            {
                title: "Vineyard Estate in France",
                description: "Beautiful vineyard estate with wine tasting and luxury amenities.",
                image: "https://images.unsplash.com/photo-1570129477492-45b00e864a36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                price: 18000,
                location: "Bordeaux",
                country: "France",
                coordinates: { lat: 44.8378, lng: -0.5792 },
                propertyType: "villa",
                bedrooms: 5,
                bathrooms: 3,
                maxGuests: 10,
                area: 4000,
                amenities: ["wifi", "parking", "pool", "gym", "kitchen", "tv", "washer", "garden", "security"],
                rating: 4.8,
                reviewsCount: 22
            },
            {
                title: "Safari Lodge in Kenya",
                description: "Luxury safari lodge with wildlife viewing and premium services.",
                image: "https://images.unsplash.com/photo-1582627760625-247b5e2c5713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                price: 7000,
                location: "Maasai Mara",
                country: "Kenya",
                coordinates: { lat: -1.2921, lng: 35.1717 },
                propertyType: "resort",
                bedrooms: 2,
                bathrooms: 2,
                maxGuests: 4,
                area: 1000,
                amenities: ["wifi", "parking", "pool", "air-conditioning", "kitchen", "tv", "security", "breakfast"],
                rating: 4.6,
                reviewsCount: 15
            },
            {
                title: "Beach House in Australia",
                description: "Modern beach house with ocean views and outdoor living space.",
                image: "https://images.unsplash.com/photo-1571003123894-1faba9ea8c44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                price: 11000,
                location: "Gold Coast, Queensland",
                country: "Australia",
                coordinates: { lat: -28.0167, lng: 153.4000 },
                propertyType: "house",
                bedrooms: 3,
                bathrooms: 2,
                maxGuests: 6,
                area: 1800,
                amenities: ["wifi", "parking", "pool", "air-conditioning", "kitchen", "tv", "washer", "garden", "balcony"],
                rating: 4.5,
                reviewsCount: 18
            },
            {
                title: "Mountain Chalet in Switzerland",
                description: "Alpine chalet with ski access and mountain views.",
                image: "https://images.unsplash.com/photo-1548948029-3f7d2b444353?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                price: 13000,
                location: "Zermatt",
                country: "Switzerland",
                coordinates: { lat: 46.0197, lng: 7.7491 },
                propertyType: "house",
                bedrooms: 2,
                bathrooms: 2,
                maxGuests: 4,
                area: 1200,
                amenities: ["wifi", "parking", "gym", "air-conditioning", "kitchen", "tv", "washer", "security", "balcony"],
                rating: 4.7,
                reviewsCount: 16
            },
            {
                title: "Historic Apartment in Rome, Italy",
                description: "Elegant apartment near Colosseum with authentic Italian charm.",
                image: "https://images.unsplash.com/photo-1611892446493-42b08715edea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                price: 8000,
                location: "Colosseo, Rome",
                country: "Italy",
                coordinates: { lat: 41.8902, lng: 12.4922 },
                propertyType: "apartment",
                bedrooms: 1,
                bathrooms: 1,
                maxGuests: 2,
                area: 600,
                amenities: ["wifi", "air-conditioning", "kitchen", "tv", "elevator", "security"],
                rating: 4.4,
                reviewsCount: 14
            },
            {
                title: "Luxury Yacht in Greece",
                description: "Private yacht experience exploring Greek islands.",
                image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                price: 22000,
                location: "Santorini",
                country: "Greece",
                coordinates: { lat: 36.3932, lng: 25.4615 },
                propertyType: "resort",
                bedrooms: 3,
                bathrooms: 2,
                maxGuests: 6,
                area: 2000,
                amenities: ["wifi", "parking", "pool", "gym", "air-conditioning", "kitchen", "tv", "balcony", "breakfast", "security"],
                rating: 4.9,
                reviewsCount: 30
            },
            {
                title: "Desert Resort in Egypt",
                description: "Luxury desert resort with pyramid views and spa.",
                image: "https://images.unsplash.com/photo-1590490374842-e33f869bde4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                price: 6000,
                location: "Giza",
                country: "Egypt",
                coordinates: { lat: 29.9792, lng: 31.1342 },
                propertyType: "resort",
                bedrooms: 2,
                bathrooms: 2,
                maxGuests: 4,
                area: 1500,
                amenities: ["wifi", "parking", "pool", "gym", "air-conditioning", "kitchen", "tv", "security", "breakfast"],
                rating: 4.3,
                reviewsCount: 12
            },
            {
                title: "Tropical Villa in Thailand",
                description: "Beachfront villa with private pool and tropical gardens.",
                image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                price: 7500,
                location: "Phuket",
                country: "Thailand",
                coordinates: { lat: 7.8804, lng: 98.3923 },
                propertyType: "villa",
                bedrooms: 3,
                bathrooms: 2,
                maxGuests: 6,
                area: 2000,
                amenities: ["wifi", "parking", "pool", "gym", "air-conditioning", "kitchen", "tv", "washer", "garden", "balcony"],
                rating: 4.6,
                reviewsCount: 20
            },
            {
                title: "City Apartment in Singapore",
                description: "Modern apartment in the heart of Singapore with city views.",
                image: "https://images.unsplash.com/photo-1582627760625-247b5e2c5713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                price: 9000,
                location: "Marina Bay",
                country: "Singapore",
                coordinates: { lat: 1.2847, lng: 103.8610 },
                propertyType: "apartment",
                bedrooms: 2,
                bathrooms: 2,
                maxGuests: 4,
                area: 1000,
                amenities: ["wifi", "parking", "gym", "air-conditioning", "kitchen", "tv", "washer", "elevator", "security"],
                rating: 4.5,
                reviewsCount: 16
            }
        ];
        
        // Insert worldwide listings
        await Listing.insertMany(worldwideListings);
        console.log(`Created ${worldwideListings.length} worldwide listings`);
        
        console.log('Worldwide listings created successfully!');
        console.log('Countries included:');
        console.log('- Indonesia (Bali)');
        console.log('- UAE (Dubai)');
        console.log('- UK (London)');
        console.log('- Maldives');
        console.log('- USA (New York)');
        console.log('- Japan (Tokyo)');
        console.log('- France (Bordeaux)');
        console.log('- Kenya');
        console.log('- Australia');
        console.log('- Switzerland');
        console.log('- Italy (Rome)');
        console.log('- Greece (Santorini)');
        console.log('- Egypt (Giza)');
        console.log('- Thailand (Phuket)');
        console.log('- Singapore');
        
    } catch (error) {
        console.error('Error creating worldwide listings:', error);
    } finally {
        await mongoose.disconnect();
        process.exit();
    }
}

createWorldwideListings();
