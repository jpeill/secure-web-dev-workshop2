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
    geolocation:{ coordinates: [Number] , typee : String},
    sourceLocationId: String,
    filmDirectorName: String,
    address: String,
    startDate: Date,
    year: Number,
});


const Locations =  mongoose.model('Locations',LocationsSchema);


async function CreateLocations(filmingLocations){
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
                typee: f.geo_shape.type,
            },
            sourceLocationId: f.id_lieu,
            filmDirectorName: f.nom_realisateur,
            address: f.adresse_lieu,
            startDate: f.date_debut,
            year: f.annee_tournage,
        });
        promiseschunk.push(Location.save())
        if (promiseschunk.length==500){
            await Promise.all(promiseschunk)
            console.log("fait")
            promiseschunk = []
        }

    }
    await Promise.all(promiseschunk)
    console.log("fait")
    
}

async function query_id(id){
    return (await Locations.findById(id).exec())
}

async function query_filmName(n){
    return(await Locations.find({filmName : n}).exec())
    
}

async function delete_id(id){
    Locations.findByIdAndDelete(id)
    return("Supprimé")
}

async function add_loc(loc){
    await loc.save()
    return("Ajoutée")
}

async function main(){
    await mongoose.connect(process.env.MONGO_URI).then((success)=>console.log("connecté"))
    
    console.log(await delete_id("6336da1656ec897f6dd7f062"))

}

main()