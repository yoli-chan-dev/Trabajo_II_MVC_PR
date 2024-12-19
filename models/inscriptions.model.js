const mongoose = require("mongoose")
// Definición del esquema para la colección "inscriptions" en MongoDB
const inscriptionsSchema = new mongoose.Schema({
    // idUser: Identificador del usuario. Es obligatorio y debe ser único
    idUser:{
        type:String,
        required:true,
        unique:true
    }, // idCompany: Identificador de la empresa
    idCompany:{
        type:String,
        required:true
    },// fecIni: Fecha de inicio de la inscripción
    fecIni:{
        type:Date,
        required:true
    }, // fecFin: Fecha de finalización de la inscripción
    fecFin:{
        type:Date
    }
    ,// observaciones: Campo de texto para observaciones adicionales
    observaciones:{
        type:String,
        required:true
    } 

})
// Creamos el modelo "inscriptions" a partir del esquema "inscriptionsSchema"
const inscriptions = mongoose.model("inscriptions", inscriptionsSchema)
// Función para crear una nueva inscripción
inscriptions.createInscriptions = async (inscriptionsData, result) => {
    // Crea una nueva instancia del modelo "inscriptions" con los datos proporcionados
    const newInscription = new inscriptions(inscriptionsData)
     // Guarda la nueva inscripción en la base de datos
    await newInscription.save()
        .then((datos) => {
            // Si la creación es exitosa, devuelve los datos de la nueva inscripción
           result(null,datos)
        })
        .catch((err) => {
           result(err,null)
        })
}

// Función para obtener todas las inscripcione
inscriptions.findAll = async(result)=>{
    const datos = await inscriptions.find({})
    .then((datos) => {
        result(null,datos) 
     })
     .catch((err) => {
        result(err,null) 
     }) 
}

// Función para obtener una inscripción específica por su ID
inscriptions.findInscriptionsById = async(id, result)=>{
    const datos = await inscriptions.findById(id)
    if(datos){
        result(null,datos)
    }else{
        result({"error":"No hay datos"},null)
    }
}
// Función para actualizar los datos de una inscripción por su ID
inscriptions.updateInscriptionsById = async(id,inscriptionsData,result)=>{
    await inscriptions.findByIdAndUpdate(id,inscriptionsData,{runValidators:true, new:true})
    .then((datosResultado)=>{
        result(null,datosResultado)
    })
    .catch((err)=>{
        result(err,null)
    })
}
// Función para eliminar una inscripción por su ID
inscriptions.deleteInscriptionsById = async(id,result)=>{
    await inscriptions.findByIdAndDelete(id)
    .then((datos)=>{
        result(null,datos)
    })
    .catch((err)=>{
        result(err,null)
    })
}

// Exporta el modelo para que pueda ser utilizado en otros archivos, como en el controlador
module.exports = inscriptions