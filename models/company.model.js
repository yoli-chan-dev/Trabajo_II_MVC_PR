//COMPANY SE REALIZA CON MONGOBD

//npm i mongoose
const mongoose = require("mongoose")

// Definición del esquema de la colección "company" en MongoDB
const companySchema = new mongoose.Schema({
    //_id --> NO es String, sino ObjectID (similar a la PK. Va de serie. Se crea automáticamente como UUID en MongoDB)
     // CIF: Identificador fiscal de la empresa. Es un valor único y obligatorio
    cif:{
        type:String,
        required:true,
        unique: true
    },
     // Name: Nombre de la empresa. Es obligatorio.
    name:{
        type:String,
        required:true
    },
    // City: Ciudad de la empresa. Es obligatorio.
    city:{
        type:String,
        required:true,
    },
    // PersonInCharge: Persona encargada de la empresa. Es obligatorio.
    personInCharge:{
        type:String,
        required:true,
    },
    // PersonInChargeID: Identificador de la persona encargada. Es obligatorio.
    personInChargeID:{
        type:String,
        required:true,
    }
    ,

    // Type: Tipo de empresa 
    type:{
        type:String,
        required:true,
    }
    ,

    // Family: Familia o sector al que pertenece la empresa. Es obligatorio.
    family:{
        type:String,
        required:true,
    }
    ,
     // Address: Dirección de la empresa. Es obligatorio.
    address:{
        type:String,
        required:true,
    }
    ,
     // Area: Área o región de la empresa. Es obligatorio.
    area:{
        type:String,
        required:true,
    }
    ,
     // PostalCode: Código postal de la empresa
    postalCode:{
        type:Number,
        required:true,
    }
    ,
     // Phone: Número de teléfono de la empresa
    phone:{
        type:Number,
        required:true,
    }
    ,
    // Email: Correo electrónico de la empresa
    email:{
        type:String,
        required:true,
    }
    ,
    // CreatedDate: Fecha de creación de la empresa. No es obligatorio, ya que puede ser asignado automáticamente
    createdDate:{
        type:Date,
        required:false,
    },

     // ModifiedDate: Fecha de última modificación de la empresa. No es obligatorio
    modifiedDate:{
        type:Date
    }


})

//Creamos el MODELO a partir del ESQUEMA MONGOOSE
const company = mongoose.model("company", companySchema)

// Función para crear una nueva empresa
company.createCompany = async(companyData,result) => {
    // Crea una nueva instancia del modelo "company" con los datos proporcionados
    const newCompany = new company(companyData)
    // Guarda la nueva empresa en la base de datos
    await newCompany.save() //INSERT(SQL) - InsertOne(MongoDB alternativa)
        .then((datos) => {
            // Si la creación es exitosa, devuelve los datos de la nueva empresa
           result(null,datos) 
        })
        .catch((err) => {
            // Si ocurre un error durante la creación, devuelve el error
           result(err,null) 
        }) 
}
// Función para obtener todas las empresas de la base de datos
company.findAll = async(result)=>{
     // Consulta todas las empresas en la base de datos
    const datos = await company.find({})
    .then((datos) => {
        result(null,datos) 
     })
     .catch((err) => {
        result(err,null) 
     }) 
}

// Función para encontrar una empresa por su ID
company.findCompanyById = async(id, result)=>{
    const datos = await company.findById(id)
    if(datos){
        result(null,datos)
    }else{
        result({"error":"No hay datos"},null)
    }
}
// Función para actualizar los datos de una empresa por su ID
company.updateCompanyById = async(id,companyData,result)=>{
     // Busca una empresa por su ID y actualiza sus datos con la nueva información
    await company.findByIdAndUpdate(id,companyData,{runValidators:true, new:true})
    .then((datosResultado)=>{
        result(null,datosResultado)
    })
    .catch((err)=>{
        result(err,null)
    })
}
// Función para eliminar una empresa por su ID
company.deleteCompanyById = async(id,result)=>{
    await company.findByIdAndDelete(id)
    .then((datos)=>{
        result(null,datos)
    })
    .catch((err)=>{
        result(err,null)
    })
}


//Exportamos para poderlo usar en el CONTROLLER
module.exports = company