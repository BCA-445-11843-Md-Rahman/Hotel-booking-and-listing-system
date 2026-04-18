const Listing = require('./models/listing');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/wanderlust')
  .then(() => {
    console.log('Connected to DB');
    return Listing.find({});
  })
  .then(listings => {
    console.log('Checking all property images...\n');
    listings.forEach((listing, i) => {
      console.log(`${i + 1}. ${listing.title}`);
      console.log(`   Image: ${listing.image.substring(0, 100)}...`);
      console.log('---');
    });
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error:', err);
  });
