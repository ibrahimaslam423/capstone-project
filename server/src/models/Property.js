const mongoose = require("mongoose");
const User = require("./User"); //getting user info to store for some fields in here that correlate

//summer - This is the property schema where we declare all fields for each utc property in MongoDB specifically
//note there is a question on how to store images in mongoDB later
//note may need to connect to dashboard one day 
const propertySchema = new mongoose.Schema({
    _id: { type: String, required: true }, // mongodb's specific id for the property
    propertyManagerEmail: { type: String, required: true}, //the manager's email which we can also grab from user schema with corresponding property matching this email
    propertyName: { type: String, required: true }, //name of property!
    address: { type: String, required: true}, //string for address of property 
    rentPrice: { type: Number, required: true}, //subject to change to see as string so it could be a price range if needed
    leaseTerms: { type: String, required: true},
    availability: {type: Number, required: true}, // this is an int because people cant be a half/float
    description: { type: String, required: true}, // this is a description of property that managers must write to try to sell property to students
    comments: [{ // the comments of what people say and the user who said it 
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, //reference to the user who wrote the review likely student
        comment: { type: String }, // the actual review text/comment 
        createdAt: { type: Date, default: Date.now }
      }],
    starRatings: [{  //the ratings and who rated it stored 
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // user who gave star amount 
        rating: {type: Number}, //rating given out of 5 stars 
        createdAt: { type: Date, default: Date.now }
      }],
    distance: { type: Double, required: false}, // distance from campus for analytics later on
    clickRate: {type: Number, required:false}, // need for data analytics later on how many times people click and it would increment based on how many people click into property
    createdAt: { type: Date, default: Date.now } //just info to know when this property could have been added by form approval from Dean
});

module.exports = mongoose.model("Property", propertySchema); //export statement to be able to reach this schema from backend or frontend
