// Carga las variables de entorno desde el archivo .env para usarlas en la aplicación
require("dotenv").config()

const companyModel = require("../models/company.model")
// Encuentra todas las empresas
exports.findAllCompany = async(req,res) => {
    //CSR
      // Realiza la consulta a la base de datos para obtener todas las empresas
    await companyModel.findAll(function(err,datosCompany){
        if(err){
            // Si ocurre un error, se responde con un código 500 y el mensaje de error
            res.status(500).json({"err":err})
        }else{
            // Si la consulta es exitosa, se responde con un código 200 y los datos de las empresas
            res.status(200).json(datosCompany)
        }
    })
}

// Muestra todas las empresas renderizando index.ejs de company
exports.showAllCompany = async(req,res) => {
    await companyModel.findAll(function(err,datosCompany){
        if(err){
            console.log(err)
            res.render("company/error.ejs",{err:err.error})
        }else{
            // Si la consulta es exitosa, se renderiza la vista 'index.ejs' con los datos de las empresas
            res.render("company/index.ejs",{company:datosCompany})
        }
    })    
}
// Muestra el formulario para crear una nueva empresa
exports.showNewCompany = (req,res)=>{
    //SSR
    // Renderiza la vista 'new.ejs' de company que contiene el formulario para crear una nueva empresa
    res.render("company/new.ejs")
}
// Muestra los detalles de una empresa por su ID 
exports.showCompanyById = async(req,res)=>{
    //SSR
     // Obtiene el ID de la empresa desde los parámetros de la URL
    const { id } = req.params
    //const comentario = comentarios.find(c => c.id == id)
    await companyModel.findCompanyById(id,function(err,company){
        if(err){
            res.render("company/error.ejs",{err:err.error})
        }else{
             // Si la consulta es exitosa, se renderiza la vista 'show.ejs' con los detalles de la empresa
            res.render("company/show.ejs", { company })
        }
    })    
}
// Muestra el formulario para editar una empresa existente
exports.showEditCompany = async(req,res) => {
    const { id } = req.params
        //const comentario = comentarios.find(c => c.id == id)    
    await companyModel.findCompanyById(id,function(err,company){
        if(err){
            res.render("company/error.ejs"),{err}
        }else{
            // Si la consulta es exitosa, se renderiza la vista 'edit.ejs' de company con los detalles de la empresa
            res.render("company/edit.ejs",{company})
        }
    })
}

// Crea una nueva empresa a partir de los datos enviados en el cuerpo de la solicitud
exports.createCompany = async(req,res)=>{
     // Llama a la función 'createCompany' del modelo para crear la empresa en la base de datos
    await companyModel.createCompany(req.body, function(err,companyCreated){
        if(err){
            console.log(err)
            res.render("company/error.ejs", {err})
        }else{
            console.log(companyCreated)
             // Si la empresa se crea correctamente, se redirige a la lista de empresas
            res.redirect(`/api/${process.env.API_VERSION}/company/`)
        }
    }) 
}
// Actualiza los datos de una empresa existente
exports.editCompany = async(req,res) => {
    const { id } = req.params
    //const comentario = comentarios.find(c=>c.id==id)   
     // Extrae los datos del cuerpo de la solicitud 
    const { cif, name, city, personInCharge, personInChargeID, type, family, address, area, postalCode, phone, email, modifiedDate } = req.body
    // Crea un objeto con los nuevos datos de la empresa
    const companyUpdated = {
        cif:cif,
        name:name,
        city:city,
        personInCharge:personInCharge,
        personInChargeID:personInChargeID,
        type:type,
        family:family,
        address:address,
        area:area,
        postalCode:postalCode,
        phone:phone,
        email:email,
        modifiedDate:modifiedDate
    }
     // Llama a la función del modelo para actualizar la empresa en la base de datos
    await companyModel.updateCompanyById(id,companyUpdated,function(err,datosActualizados){
        if(err){
            res.render("company/error.ejs", {err})
        }else{
            console.log(datosActualizados)
            // Si la empresa se actualiza correctamente, se redirige a la lista de empresas
            res.redirect(`/api/${process.env.API_VERSION}/company/`)
        }
    })        
}
// Elimina una empresa por su ID
exports.deleteCompany = async(req,res)=>{
    const {id} = req.params
    //comentarios = comentarios.filter(c => c.id != id)
    await companyModel.deleteCompanyById(id,function(err,datosEliminados){
        if(err){
            res.render("company/error.ejs", {err})
        }else{
            // Si la empresa se elimina correctamente, se redirige a la lista de empresas
            res.redirect(`/api/${process.env.API_VERSION}/company/`)
        }
    })    
}

// ** FUNCIONES MEGAZORD **
exports.findAllCompanyMegazord = async(req,res) => {
    //CSR
      // Realiza la consulta a la base de datos para obtener todas las empresas
    await companyModel.findAll(function(err,datosCompany){
        if(err){
            // Si ocurre un error, se responde con un código 500 y el mensaje de error
            res.status(500).json({"err":err})
        }else{
            // Si la consulta es exitosa, se responde con un código 200 y los datos de las empresas
            res.status(200).json(datosCompany)
        }
    })
}

exports.showCompanyByIdMegazord = async(req,res)=>{
    //SSR
     // Obtiene el ID de la empresa desde los parámetros de la URL
    const { id } = req.params
    //const comentario = comentarios.find(c => c.id == id)
    await companyModel.findCompanyById(id,function(err,company){
        if(err){
            res.status(404).json(err)
        }else{
            // Si la consulta es exitosa, se renderiza la vista 'show.ejs' con los detalles de la empresa
            res.status(200).json(company)
        }
    })    
}

exports.createCompanyMegazord = async(req,res)=>{
    // Llama a la función 'createCompany' del modelo para crear la empresa en la base de datos
   await companyModel.createCompany(req.body, function(err,companyCreated){
       if(err){
            res.status(400).json(err)
       }else{
            // Si la empresa se crea correctamente, se redirige a la lista de empresas
            res.status(200).json(companyCreated)
       }
   }) 
}

exports.editCompanyMegazord = async(req,res) => {
    const { id } = req.params
    //const comentario = comentarios.find(c=>c.id==id)   
     // Extrae los datos del cuerpo de la solicitud 
    const { cif, name, city, personInCharge, personInChargeID, type, family, address, area, postalCode, phone, email, modifiedDate } = req.body
    // Crea un objeto con los nuevos datos de la empresa
    const companyUpdated = {
        cif:cif,
        name:name,
        city:city,
        personInCharge:personInCharge,
        personInChargeID:personInChargeID,
        type:type,
        family:family,
        address:address,
        area:area,
        postalCode:postalCode,
        phone:phone,
        email:email,
        modifiedDate:modifiedDate
    }
     // Llama a la función del modelo para actualizar la empresa en la base de datos
    await companyModel.updateCompanyById(id,companyUpdated,function(err,datosActualizados){
        if(err){
            res.status(400).json(err)

        }else{
            // Si la empresa se actualiza correctamente, se redirige a la lista de empresas
            res.status(200).json(datosActualizados)
        }
    })        
}

exports.deleteCompanyMegazord = async(req,res)=>{
    const {id} = req.params
    //comentarios = comentarios.filter(c => c.id != id)
    await companyModel.deleteCompanyById(id,function(err,datosEliminados){
        if(err){
            res.status(400).json(err)
        }else{
            // Si la empresa se elimina correctamente, se redirige a la lista de empresas
            res.status(200).json(datosEliminados)
        }
    })    
}