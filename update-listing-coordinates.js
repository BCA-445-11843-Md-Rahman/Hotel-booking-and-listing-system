const mongoose = require('mongoose');
const Listing = require('./models/listing');

const MONGO_Url = "mongodb://127.0.0.1:27017/wanderlust";

async function updateListingCoordinates() {
    try {
        await mongoose.connect(MONGO_Url);
        console.log('Connected to DB');
        
        // Get all listings
        const listings = await Listing.find({});
        console.log(`Found ${listings.length} listings`);
        
        // Valid coordinates for worldwide locations
        const validCoordinates = {
            // Indonesia - Bali
            'Seminyak, Bali': { lat: -8.6705, lng: 115.2126 },
            'Kuta, Bali': { lat: -8.7184, lng: 115.1686 },
            'Ubud, Bali': { lat: -8.5069, lng: 115.2625 },
            
            // UAE - Dubai
            'Dubai Marina': { lat: 25.0777, lng: 55.1345 },
            'Downtown Dubai': { lat: 25.1972, lng: 55.2744 },
            'Palm Jumeirah': { lat: 25.1125, lng: 55.1398 },
            
            // UK - London
            'Notting Hill': { lat: 51.5163, lng: -0.1977 },
            'Central London': { lat: 51.5074, lng: -0.1278 },
            'Kensington': { lat: 51.5014, lng: -0.1946 },
            
            // Maldives
            'Male': { lat: 4.1755, lng: 73.5093 },
            'Maafushi': { lat: 3.9413, lng: 73.5409 },
            
            // USA - New York
            'Manhattan': { lat: 40.7831, lng: -73.9712 },
            'Times Square': { lat: 40.7580, lng: -73.9855 },
            'Brooklyn': { lat: 40.6782, lng: -73.9442 },
            
            // Japan - Tokyo
            'Shibuya': { lat: 35.6598, lng: 139.7036 },
            'Shinjuku': { lat: 35.6896, lng: 139.6917 },
            'Ginza': { lat: 35.6718, lng: 139.7651 },
            
            // France - Bordeaux
            'Bordeaux': { lat: 44.8378, lng: -0.5792 },
            'Medoc': { lat: 45.3999, lng: -0.9833 },
            
            // Kenya
            'Maasai Mara': { lat: -1.5217, lng: 35.2628 },
            'Nairobi': { lat: -1.2921, lng: 36.8219 },
            
            // Australia
            'Gold Coast': { lat: -28.0167, lng: 153.4000 },
            'Sydney': { lat: -33.8688, lng: 151.2093 },
            
            // Switzerland
            'Zermatt': { lat: 46.0197, lng: 7.7482 },
            'Geneva': { lat: 46.2044, lng: 6.1432 },
            
            // Italy - Rome
            'Rome': { lat: 41.9028, lng: 12.4964 },
            'Vatican': { lat: 41.9029, lng: 12.4534 },
            
            // Greece - Santorini
            'Santorini': { lat: 36.3932, lng: 25.4615 },
            'Oia': { lat: 36.4618, lng: 25.3763 },
            
            // Egypt
            'Giza': { lat: 30.0444, lng: 31.2357 },
            'Cairo': { lat: 30.0444, lng: 31.2357 },
            
            // Thailand - Phuket
            'Phuket': { lat: 7.8804, lng: 98.3923 },
            'Patong': { lat: 7.9047, lng: 98.3096 },
            
            // Singapore
            'Marina Bay': { lat: 1.2814, lng: 103.8608 },
            'Orchard Road': { lat: 1.3048, lng: 103.8318 }
        };
        
        // Update each listing with valid coordinates
        for (const listing of listings) {
            let coordinates = validCoordinates[listing.location];
            
            // If exact location not found, try to find by country
            if (!coordinates) {
                const countryCoordinates = {
                    'Indonesia': { lat: -8.6705, lng: 115.2126 },
                    'UAE': { lat: 25.0777, lng: 55.1345 },
                    'UK': { lat: 51.5074, lng: -0.1278 },
                    'Maldives': { lat: 4.1755, lng: 73.5093 },
                    'USA': { lat: 40.7831, lng: -73.9712 },
                    'Japan': { lat: 35.6598, lng: 139.7036 },
                    'France': { lat: 44.8378, lng: -0.5792 },
                    'Kenya': { lat: -1.5217, lng: 35.2628 },
                    'Australia': { lat: -33.8688, lng: 151.2093 },
                    'Switzerland': { lat: 46.0197, lng: 7.7482 },
                    'Italy': { lat: 41.9028, lng: 12.4964 },
                    'Greece': { lat: 36.3932, lng: 25.4615 },
                    'Egypt': { lat: 30.0444, lng: 31.2357 },
                    'Thailand': { lat: 7.8804, lng: 98.3923 },
                    'Singapore': { lat: 1.2814, lng: 103.8608 }
                };
                
                coordinates = countryCoordinates[listing.country];
            }
            
            // If still not found, use default coordinates
            if (!coordinates) {
                coordinates = { lat: 28.6139, lng: 77.2090 }; // Default to Delhi
            }
            
            // Update listing with valid coordinates
            await Listing.findByIdAndUpdate(listing._id, { 
                coordinates: coordinates,
                // Also ensure other required fields
                propertyType: listing.propertyType || 'villa',
                bedrooms: listing.bedrooms || 2,
                bathrooms: listing.bathrooms || 2,
                maxGuests: listing.maxGuests || 4,
                area: listing.area || 1000,
                amenities: listing.amenities || ['wifi', 'parking'],
                rating: listing.rating || 4.0,
                reviewsCount: listing.reviewsCount || 0
            });
            
            console.log(`Updated: ${listing.title} - Coordinates: ${coordinates.lat}, ${coordinates.lng}`);
        }
        
        console.log('Successfully updated all listings with valid coordinates!');
        
    } catch (error) {
        console.error('Error updating coordinates:', error);
    } finally {
        await mongoose.connection.close();
    }
}

updateListingCoordinates();
