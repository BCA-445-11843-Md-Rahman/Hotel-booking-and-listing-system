const mongoose = require("mongoose");
const Listing = require("./models/listing");

const MONGO_Url = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => {
    console.log("connected to DB");
    checkImages();
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_Url);
}

async function checkImages() {
    try {
        const listings = await Listing.find({});
        
        console.log(`Found ${listings.length} listings:`);
        
        for (let listing of listings) {
            console.log(`\nTitle: ${listing.title}`);
            console.log(`Image URL: ${listing.image}`);
            console.log(`Image length: ${listing.image.length}`);
        }

        mongoose.connection.close();
    } catch (err) {
        console.error("Error checking listings:", err);
        mongoose.connection.close();
    }
}
