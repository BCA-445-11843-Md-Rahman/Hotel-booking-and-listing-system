const mongoose = require('mongoose');
const Listing = require('./models/listing');

const MONGO_Url = "mongodb://127.0.0.1:27017/wanderlust";

async function createSampleListings() {
    try {
        await mongoose.connect(MONGO_Url);
        console.log('Connected to DB');
        
        // Clear existing listings
        await Listing.deleteMany({});
        console.log('Cleared existing listings');
        
        // Sample listings with advanced features
        const sampleListings = [
            {
                title: "Luxury Beach Villa in Goa",
                description: "Beautiful 3-bedroom villa with private pool and beach access. Perfect for families and groups.",
                image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                price: 8500,
                location: "Calangute, Goa",
                country: "India",
                coordinates: { lat: 15.5573, lng: 73.7571 },
                propertyType: "villa",
                bedrooms: 3,
                bathrooms: 2,
                maxGuests: 6,
                area: 2500,
                amenities: ["wifi", "parking", "pool", "gym", "air-conditioning", "kitchen", "tv", "washer", "garden", "balcony"],
                rating: 4.5,
                reviewsCount: 12
            },
            {
                title: "Modern Studio Apartment in Mumbai",
                description: "Compact and stylish studio in the heart of Mumbai. Perfect for business travelers and couples.",
                image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                price: 3200,
                location: "Bandra, Mumbai",
                country: "India",
                coordinates: { lat: 19.0596, lng: 72.8295 },
                propertyType: "studio",
                bedrooms: 0,
                bathrooms: 1,
                maxGuests: 2,
                area: 450,
                amenities: ["wifi", "air-conditioning", "kitchen", "tv", "elevator", "workspace"],
                rating: 4.2,
                reviewsCount: 8
            },
            {
                title: "Spacious 2BHK in Delhi",
                description: "Well-furnished 2-bedroom apartment in South Delhi. Close to metro and shopping centers.",
                image: "https://images.unsplash.com/photo-1566665713268-5db8ae4e4c0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                price: 4500,
                location: "South Delhi, Delhi",
                country: "India",
                coordinates: { lat: 28.6139, lng: 77.2090 },
                propertyType: "apartment",
                bedrooms: 2,
                bathrooms: 2,
                maxGuests: 4,
                area: 850,
                amenities: ["wifi", "parking", "air-conditioning", "kitchen", "tv", "washer", "elevator", "security"],
                rating: 4.0,
                reviewsCount: 15
            },
            {
                title: "5-Star Resort in Kerala",
                description: "Luxurious resort with spa, pool, and beach access. World-class amenities and service.",
                image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                price: 12000,
                location: "Kovalam, Kerala",
                country: "India",
                coordinates: { lat: 8.4845, lng: 76.9792 },
                propertyType: "resort",
                bedrooms: 4,
                bathrooms: 3,
                maxGuests: 8,
                area: 3500,
                amenities: ["wifi", "parking", "pool", "gym", "air-conditioning", "kitchen", "tv", "washer", "garden", "balcony", "breakfast", "security"],
                rating: 4.8,
                reviewsCount: 25
            },
            {
                title: "Cozy 1BHK in Bangalore",
                description: "Affordable and comfortable 1-bedroom apartment in Bangalore. Perfect for solo travelers and couples.",
                image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                price: 2800,
                location: "Indiranagar, Bangalore",
                country: "India",
                coordinates: { lat: 12.9716, lng: 77.5946 },
                propertyType: "apartment",
                bedrooms: 1,
                bathrooms: 1,
                maxGuests: 2,
                area: 550,
                amenities: ["wifi", "air-conditioning", "kitchen", "tv", "elevator", "security"],
                rating: 3.8,
                reviewsCount: 6
            },
            {
                title: "Luxury Hotel Suite in Jaipur",
                description: "Elegant hotel suite with traditional Rajasthani decor. Includes all premium amenities.",
                image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                price: 6500,
                location: "Pink City, Jaipur",
                country: "India",
                coordinates: { lat: 26.9124, lng: 75.7873 },
                propertyType: "hotel",
                bedrooms: 1,
                bathrooms: 1,
                maxGuests: 3,
                area: 650,
                amenities: ["wifi", "parking", "gym", "air-conditioning", "tv", "elevator", "security", "breakfast"],
                rating: 4.3,
                reviewsCount: 18
            },
            {
                title: "Independent House in Pune",
                description: "Spacious 3-bedroom house with garden and parking. Located in a quiet residential area.",
                image: "https://images.unsplash.com/photo-1570129477492-45b00e864a36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                price: 5500,
                location: "Koregaon Park, Pune",
                country: "India",
                coordinates: { lat: 18.5204, lng: 73.8567 },
                propertyType: "house",
                bedrooms: 3,
                bathrooms: 2,
                maxGuests: 6,
                area: 1800,
                amenities: ["wifi", "parking", "garden", "air-conditioning", "kitchen", "tv", "washer", "security"],
                rating: 4.1,
                reviewsCount: 10
            },
            {
                title: "Beachfront Villa in Andaman",
                description: "Stunning beachfront villa with ocean views. Private beach access and water sports.",
                image: "https://images.unsplash.com/photo-1582627760625-247b5e2c5713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                price: 15000,
                location: "Port Blair, Andaman",
                country: "India",
                coordinates: { lat: 11.6234, lng: 92.7325 },
                propertyType: "villa",
                bedrooms: 4,
                bathrooms: 3,
                maxGuests: 8,
                area: 3000,
                amenities: ["wifi", "parking", "pool", "gym", "air-conditioning", "kitchen", "tv", "washer", "garden", "balcony", "breakfast"],
                rating: 4.7,
                reviewsCount: 20
            },
            {
                title: "Budget Studio in Kolkata",
                description: "Affordable studio apartment in central Kolkata. Perfect for budget-conscious travelers.",
                image: "https://images.unsplash.com/photo-1590490374842-e33f869bde4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                price: 1800,
                location: "Park Street, Kolkata",
                country: "India",
                coordinates: { lat: 22.5726, lng: 88.3639 },
                propertyType: "studio",
                bedrooms: 0,
                bathrooms: 1,
                maxGuests: 2,
                area: 350,
                amenities: ["wifi", "air-conditioning", "tv", "elevator"],
                rating: 3.5,
                reviewsCount: 4
            },
            {
                title: "Mountain Resort in Manali",
                description: "Beautiful mountain resort with snow views. Perfect for nature lovers and adventure seekers.",
                image: "https://images.unsplash.com/photo-1571003123894-1faba9ea8c44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                price: 7500,
                location: "Solang Valley, Manali",
                country: "India",
                coordinates: { lat: 32.2396, lng: 77.1887 },
                propertyType: "resort",
                bedrooms: 2,
                bathrooms: 2,
                maxGuests: 4,
                area: 1200,
                amenities: ["wifi", "parking", "gym", "air-conditioning", "kitchen", "tv", "garden", "balcony", "breakfast", "security"],
                rating: 4.4,
                reviewsCount: 14
            },
            {
                title: "Penthouse in Hyderabad",
                description: "Luxurious penthouse with city views. Modern amenities and spacious living areas.",
                image: "https://images.unsplash.com/photo-1548948029-3f7d2b444353?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                price: 9500,
                location: "Banjara Hills, Hyderabad",
                country: "India",
                coordinates: { lat: 17.4062, lng: 78.4691 },
                propertyType: "apartment",
                bedrooms: 3,
                bathrooms: 2,
                maxGuests: 6,
                area: 2200,
                amenities: ["wifi", "parking", "pool", "gym", "air-conditioning", "kitchen", "tv", "washer", "elevator", "security", "balcony"],
                rating: 4.6,
                reviewsCount: 22
            },
            {
                title: "Heritage House in Jaipur",
                description: "Traditional Rajasthani heritage house with modern amenities. Experience royal living.",
                image: "https://images.unsplash.com/photo-1611892446493-42b08715edea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                price: 6800,
                location: "Old City, Jaipur",
                country: "India",
                coordinates: { lat: 26.9239, lng: 75.8267 },
                propertyType: "house",
                bedrooms: 2,
                bathrooms: 2,
                maxGuests: 4,
                area: 1500,
                amenities: ["wifi", "parking", "garden", "air-conditioning", "kitchen", "tv", "security", "balcony"],
                rating: 4.2,
                reviewsCount: 11
            },
            {
                title: "Beach Resort in Goa",
                description: "Premium beach resort with private beach access. Water sports and spa facilities available.",
                image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                price: 11000,
                location: "Baga Beach, Goa",
                country: "India",
                coordinates: { lat: 15.5532, lng: 73.7532 },
                propertyType: "resort",
                bedrooms: 3,
                bathrooms: 2,
                maxGuests: 6,
                area: 2000,
                amenities: ["wifi", "parking", "pool", "gym", "air-conditioning", "kitchen", "tv", "washer", "garden", "balcony", "breakfast", "security"],
                rating: 4.5,
                reviewsCount: 19
            }
        ];
        
        // Insert sample listings
        await Listing.insertMany(sampleListings);
        console.log(`Created ${sampleListings.length} sample listings`);
        
        console.log('Sample listings created successfully!');
        console.log('Features included:');
        console.log('- Multiple property types (villa, apartment, studio, resort, hotel, house)');
        console.log('- Price range from 1800 to 15000');
        console.log('- Various amenities (wifi, parking, pool, gym, etc.)');
        console.log('- Different bedroom/bathroom configurations');
        console.log('- Ratings and review counts');
        console.log('- Coordinates for Google Maps');
        
    } catch (error) {
        console.error('Error creating sample listings:', error);
    } finally {
        await mongoose.disconnect();
        process.exit();
    }
}

createSampleListings();
