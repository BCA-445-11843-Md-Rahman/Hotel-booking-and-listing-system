const mongoose = require("mongoose");
const Listing = require("./models/listing");

const MONGO_Url = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => {
    console.log("connected to DB");
    updateListingsWithThemedImages();
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_Url);
}

async function updateListingsWithThemedImages() {
    try {
        const listings = await Listing.find({});
        
        // Property-specific themed images
        const themedImages = {
            "beach": [
                "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                "https://images.unsplash.com/photo-1571003123894-1faba9ea8c44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                "https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            ],
            "mountain": [
                "https://images.unsplash.com/photo-1445019980597-93e4e3e4c8d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            ],
            "cabin": [
                "https://images.unsplash.com/photo-1494537176433-7a3c4ef2046f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                "https://images.unsplash.com/photo-1571066811602-716737b8d631?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            ],
            "luxury": [
                "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            ],
            "city": [
                "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            ],
            "treehouse": [
                "https://images.unsplash.com/photo-1571003123894-1faba9ea8c44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            ],
            "castle": [
                "https://images.unsplash.com/photo-1518717758536-85eda256cf88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            ],
            "desert": [
                "https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            ]
        };

        for (let listing of listings) {
            const title = listing.title.toLowerCase();
            let imageUrl;

            if (title.includes('beach') || title.includes('coastal') || title.includes('bungalow') || title.includes('island')) {
                imageUrl = themedImages.beach[Math.floor(Math.random() * themedImages.beach.length)];
            } else if (title.includes('mountain') || title.includes('retreat') || title.includes('ski') || title.includes('banff')) {
                imageUrl = themedImages.mountain[Math.floor(Math.random() * themedImages.mountain.length)];
            } else if (title.includes('cabin') || title.includes('rustic') || title.includes('log')) {
                imageUrl = themedImages.cabin[Math.floor(Math.random() * themedImages.cabin.length)];
            } else if (title.includes('luxury') || title.includes('penthouse') || title.includes('villa') || title.includes('maldives')) {
                imageUrl = themedImages.luxury[Math.floor(Math.random() * themedImages.luxury.length)];
            } else if (title.includes('apartment') || title.includes('downtown') || title.includes('tokyo') || title.includes('miami') || title.includes('boston')) {
                imageUrl = themedImages.city[Math.floor(Math.random() * themedImages.city.length)];
            } else if (title.includes('treehouse')) {
                imageUrl = themedImages.treehouse[0];
            } else if (title.includes('castle') || title.includes('historic')) {
                imageUrl = themedImages.castle[0];
            } else if (title.includes('desert') || title.includes('dubai') || title.includes('oasis')) {
                imageUrl = themedImages.desert[0];
            } else {
                // Default fallback
                imageUrl = "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80";
            }

            listing.image = imageUrl;
            await listing.save();
            console.log(`Updated: ${listing.title} -> ${imageUrl.substring(0, 50)}...`);
        }

        console.log("All listings updated with themed images!");
        mongoose.connection.close();
    } catch (err) {
        console.error("Error updating listings:", err);
        mongoose.connection.close();
    }
}
