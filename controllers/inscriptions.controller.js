require("dotenv").config()
// Importa los modelos necesarios para interactuar con las bases de datos de inscripciones, empresas y usuarios
const inscriptionsModel = require("../models/inscriptions.model")
const companyModel = require("../models/company.model")
const usersModel = require("../models/users.model")
// Obtiene todas las inscripciones y responde con un formato JSON (CSR)
exports.findAllInscriptions = async(req,res) => {
    //CSR
    await inscriptionsModel.findAll({},function(err,datosInscriptions){
        if(err){            
            res.status(500).json({"err":err})
        }else{
             // Si la consulta es exitosa, se responde con un código 200 y los datos de las inscripciones
            res.status(200).json(datosInscriptions)
        }
    })
}
// Muestra todas las inscripciones
exports.showAllInscriptions = async(req,res) => {
    // Consulta todas las inscripciones desde la base de datos
    await inscriptionsModel.findAll(function(err,datosInscriptions){
        if(err){
            console.log(err)
            res.render("inscriptions/error.ejs",{err:err.error})
        }else{
            // Si la consulta es exitosa, se renderiza la vista 'index.ejs' con los datos de las inscripciones
            res.render("inscriptions/index.ejs",{inscriptions:datosInscriptions})
        }
    })    
}
// Muestra el formulario para crear una nueva inscripción
exports.showNewInscriptions = async (req,res)=>{
    await companyModel.findAll(function(err,companys){
        if(err){
            console.log(err)
            res.render("inscriptions/error.ejs",{err:err.error})
        }else{
             // Si la consulta es exitosa, obtiene todos los usuarios y luego muestra el formulario de inscripción
            usersModel.findAll(function (err, users) {
                if (err) {
                    res.render("error.ejs", { err })
                } else {
                    // Renderiza la vista 'new.ejs' pasando los datos de los usuarios y empresas
                    res.render("inscriptions/new.ejs",{ users , companys })
                }
            })
        }
    })
}
// Muestra los detalles de una inscripción específica por su ID
exports.showInscriptionsById = async(req,res)=>{
    //SSR
    const { id } = req.params
    //const comentario = comentarios.find(c => c.id == id)
    await inscriptionsModel.findInscriptionsById(id,function(err,inscriptions){
        if(err){
            res.render("inscriptions/error.ejs",{err:err.error})
        }else{
             // Si la consulta es exitosa, se renderiza la vista 'show.ejs' con los detalles de la inscripción
            res.render("inscriptions/show.ejs", { inscriptions })
        }
    })    
}
// Muestra el formulario para editar una inscripción existente
exports.showEditInscriptions = async(req,res) => {
    const { id } = req.params
     // Realiza la consulta para obtener los datos de la inscripción por ID
    await inscriptionsModel.findInscriptionsById(id,function(err,inscriptions){
        if(err){
            res.render("inscriptions/error.ejs"),{err}
        }else{
            // Si la inscripción es encontrada, consulta todas las empresas y usuarios para mostrar los datos en el formulario de edición
            companyModel.findAll(function(err,companys){
                if(err){
                    console.log(err)
                    res.render("inscriptions/error.ejs",{err:err.error})
                }else{
                     // Si las empresas son obtenidas correctamente, consulta todos los usuarios
                    usersModel.findAll(function (err, users) {
                        if (err) {
                            res.render("error.ejs", { err })
                        } else {

                            // Renderiza la vista 'edit.ejs' pasando los datos de la inscripción, usuarios y empresas
                            res.render("inscriptions/edit.ejs",{inscriptions , users , companys})
                        }
                    })
                }
        })}
    })
}
// Crea una nueva inscripción con los datos recibidos en el cuerpo de la solicitud
exports.createInscriptions = async function (req, res) {
    await inscriptionsModel.createInscriptions(req.body, function(err, inscriptionsCreated){
        if(err){
            console.log(err)
            res.render("inscriptions/error.ejs", {err})
        } else {
            // Si la inscripción se crea correctamente, se redirige a la lista de inscripciones
            res.redirect("/api/" + process.env.API_VERSION + "/inscriptions/inscriptions")
        }
    })
}
// Actualiza una inscripción existente con los datos recibidos en el cuerpo de la solicitud
exports.editInscriptions = async(req,res) => {
    const { id } = req.params
     // Extrae los nuevos valores de la inscripción desde el cuerpo de la solicitud
    const { idUser, idCompany, fecIni, fecFin, observaciones } = req.body
     // Crea un objeto con los nuevos valores para la inscripción
    const inscriptionsUpdated = {
        idUser:idUser,
        idCompany:idCompany,
        fecIni:fecIni,
        fecFin:fecFin,
        observaciones:observaciones
    }
    // Si ocurre un error durante la actualización, se renderiza una vista de error
    await inscriptionsModel.updateInscriptionsById(id,inscriptionsUpdated,function(err,datosActualizados){
        if(err){
            res.render("inscriptions/error.ejs", {err})
        }else{
            console.log(datosActualizados)
            // Si la inscripción se actualiza correctamente, se redirige a la lista de inscripciones
            res.redirect(`/api/${process.env.API_VERSION}/inscriptions/inscriptions/`)
        }
    })
}
// Elimina una inscripción por su ID
exports.deleteInscriptions = async(req,res)=>{
    const {id} = req.params
     // Llama a la función del modelo para eliminar la inscripción por su ID
    await inscriptionsModel.deleteInscriptionsById(id,function(err,datosEliminados){
        if(err){
            res.render("inscriptions/error.ejs", {err})
        }else{
             // Si la inscripción se elimina correctamente, se redirige a la lista de inscripciones
            res.redirect(`/api/${process.env.API_VERSION}/inscriptions/inscriptions/`)
        }
    })    
}

// ** FUNCIONES MEGAZORD **

exports.findAllInscriptionsMegazord = async(req,res) => {
    //CSR
    await inscriptionsModel.findAll(function(err,datosInscriptions){
        if(err){            
            res.status(500).json({"err":err})
        }else{
             // Si la consulta es exitosa, se responde con un código 200 y los datos de las inscripciones
            res.status(200).json(datosInscriptions)
        }
    })
}

exports.showInscriptionsByIdMegazord = async(req,res)=>{
    //SSR
    const { id } = req.params
    //const comentario = comentarios.find(c => c.id == id)
    await inscriptionsModel.findInscriptionsById(id,function(err,inscriptions){
        if(err){
            res.status(404).json(err)
        }else{
             // Si la consulta es exitosa, se renderiza la vista 'show.ejs' con los detalles de la inscripción
             res.status(200).json(inscriptions)
        }
    })    
}

exports.createInscriptionsMegazord = async function (req, res) {
    await inscriptionsModel.createInscriptions(req.body, function(err, inscriptionsCreated){
        if(err){
            console.log(err)
            res.status(400).json(err)
        } else {
            // Si la inscripción se crea correctamente, se redirige a la lista de inscripciones
            res.status(200).json(inscriptionsCreated)
        }
    })
}

exports.editInscriptionsMegazord = async(req,res) => {
    const { id } = req.params
     // Extrae los nuevos valores de la inscripción desde el cuerpo de la solicitud
    const { idUser, idCompany, fecIni, fecFin, observaciones } = req.body
     // Crea un objeto con los nuevos valores para la inscripción
    const inscriptionsUpdated = {
        idUser:idUser,
        idCompany:idCompany,
        fecIni:fecIni,
        fecFin:fecFin,
        observaciones:observaciones
    }
    // Si ocurre un error durante la actualización, se renderiza una vista de error
    await inscriptionsModel.updateInscriptionsById(id,inscriptionsUpdated,function(err,datosActualizados){
        if(err){
            res.status(400).json(err)
        }else{
            console.log(datosActualizados)
            // Si la inscripción se actualiza correctamente, se redirige a la lista de inscripciones
            res.status(200).json(datosActualizados)
        }
    })
}

exports.deleteInscriptionsMegazord = async(req,res)=>{
    const {id} = req.params
     // Llama a la función del modelo para eliminar la inscripción por su ID
    await inscriptionsModel.deleteInscriptionsById(id,function(err,datosEliminados){
        if(err){
            res.status(400).json(err)
        }else{
             // Si la inscripción se elimina correctamente, se redirige a la lista de inscripciones
             res.status(200).json(datosEliminados)
        }
    })    
}