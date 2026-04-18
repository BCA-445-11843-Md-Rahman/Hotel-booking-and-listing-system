const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
    },

    description: {
        type: String,
    },

    image: {
        type: String,
        default: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        set: (v) => v === "" 
        ? "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
        : v,
    },

    price: Number,
    location: String,
    country: String,

    // Google Maps coordinates
    coordinates: {
        lat: {
            type: Number,
            default: 28.6139 // Delhi default
        },
        lng: {
            type: Number,
            default: 77.2090 // Delhi default
        }
    },

    // Advanced search fields
    propertyType: {
        type: String,
        enum: ["apartment", "villa", "house", "studio", "resort", "hotel"],
        default: "apartment"
    },
    
    bedrooms: {
        type: Number,
        min: 0,
        default: 1
    },
    
    bathrooms: {
        type: Number,
        min: 0,
        default: 1
    },
    
    maxGuests: {
        type: Number,
        min: 1,
        default: 2
    },
    
    area: {
        type: Number,
        min: 0,
        default: 500 // in sq ft
    },
    
    amenities: [{
        type: String,
        enum: [
            "wifi", "parking", "pool", "gym", "air-conditioning", 
            "kitchen", "tv", "washer", "elevator", "security",
            "garden", "balcony", "pet-friendly", "smoking-allowed",
            "wheelchair-accessible", "workspace", "breakfast"
        ]
    }],
    
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    
    reviewsCount: {
        type: Number,
        default: 0
    },

    // reviews relation
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;