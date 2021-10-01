const mongoose = require('mongoose');
const { fileLoader } = require('ejs');


const Schema = mongoose.Schema;


const parkSchema = new Schema({
    name: String,
    latitude: String,
    longitude: String,
    des:String,
    price: String,
    description:String,
    priceD:String,
    priceW:String,
    nbplace: String,
    capteur: [{ firstName: String, lastName: String,reservation:Boolean }],
    image: String,
    userId:String,
    reservation: [{ type: Schema.Types.ObjectId, ref: 'listRes' }]

});

module.exports = mongoose.model('parking', parkSchema, 'parking');