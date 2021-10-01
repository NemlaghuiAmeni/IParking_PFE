const mongoose = require('mongoose');
const { fileLoader } = require('ejs');


const Schema = mongoose.Schema;


const placeSchema = new Schema({
name:String,
attributed:Boolean,
reserved:Boolean,
park:String,
adminId:String,
rang: {
    type: String,
    unique: true 
   }
    

   

});

module.exports = mongoose.model('place', placeSchema, 'place');