const mongoose=require('mongoose');
require('dotenv').config('./.env')
const filmingLocations = require('C:/Users/peill/Documents/Personnel/COURS/A4/web/TD1/secure-web-dev-workshop1/lieux-de-tournage-a-paris.json')

const { Schema } = mongoose;

const LocationsSchema = new Schema({
    filmType: String,
    filmProducerName: String,
    endDate: Date,
    filmName: String,
    district: Number,
    geolocation: {
        coordinates: [Number],
        type: String,
    },
    sourceLocationId: String,
    filmDirectorName: String,
    address: String,
    startDate: Date,
    year: Number,
});


mongoose.connect(process.env.MONGO_URI).then((success)=>console.log("connecté"))

const Locations =  mongoose.model('Locations',LocationsSchema);


function CreateLocations(filmingLocations){
    let promiseschunk = []
    for(const film in filmingLocations){
        f=filmingLocations[film].fields
        const Location = new Locations({
            filmType: f.type_tournage,
            filmProducerName: f.nom_producteur,
            endDate: f.date_fin,
            filmName: f.nom_tournage,
            district: f.ardt_lieu,
            geolocation: {
                coordinates: f.geo_shape.coordinates,
                type: f.geo_shape.type,
            },
            sourceLocationId: f.id_lieu,
            filmDirectorName: f.nom_realisateur,
            address: f.adresse_lieu,
            startDate: f.date_debut,
            year: f.annee_tournage,
        });
    }
    
}


