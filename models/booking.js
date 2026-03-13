const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

username:String,

date:Date,

listing:{
type:mongoose.Schema.Types.ObjectId,
ref:"Listing"
}

});

module.exports = mongoose.model("Booking", bookingSchema);

// end