const mongoose = require('mongoose');
const { fileLoader } = require('ejs');


const Schema = mongoose.Schema;


const reservationSchema = new Schema({
    park: String,
    palce: String,
    matricule:String,
    dateDebut:String,
    dateFin:String,
    timeDebut:String,
    timeFin:String,
    userId:String,
    Tpark:String,
    adminId:String,
    

   

});

module.exports = mongoose.model('reservation', reservationSchema, 'reservation');