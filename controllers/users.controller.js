// Importa los modelos necesarios para interactuar con los datos de los usuarios y el perfil
const usersModel = require("../models/users.model")
const profile = require("../models/profile.model.json")
const { user } = require("../utils/mysql.config")
// Obtiene todos los usuarios y muestra la vista con los datos de los usuarios y el perfil
exports.findAllUsers = async function (req, res) {

    await usersModel.findAll(function (err, usersData) {
        if (err) {
            res.render("users/error.ejs", { err }) 
        } else {
             // Si la consulta es exitosa, renderiza la vista 'index.ejs' pasando los datos de los usuarios y el perfil
            res.render("users/index.ejs", { users: usersData, profile }) 
        }
    }) 
} 
// Muestra el formulario para crear un nuevo usuario, pasando el perfil como contexto
exports.showNewUsers = (req,res)=>{
    // Renderiza la vista 'new.ejs' para la creación de un nuevo usuario
    res.render("users/new.ejs", {profile})
}
// Encuentra un usuario por su ID y muestra los detalles del usuario
exports.findUsersById = async function(req,res){
    const {id} = req.params
    await usersModel.findById(id, function(err,datosUser){
        if(err){
            res.render("users/error.ejs",(err))
        }else{
            // Si la consulta es exitosa, renderiza la vista 'show.ejs' con los datos del usuario
            res.render("users/show.ejs", {datosUser})
        }
    })
}

// Muestra el formulario para editar los datos de un usuario existente
exports.showEditUsers = async(req,res) => {
    const { id } = req.params
    // Realiza una consulta para obtener los datos del usuario con el ID proporcionado
    await usersModel.findById(id,function(err,users){
        if(err){
            res.render("users/error.ejs",{err:err.error})
        }else{
            // Si el usuario es encontrado, renderiza la vista de edición con los datos del usuario y el perfil
            res.render("users/edit.ejs", { users , profile})
        }
    })
}
// Crea un nuevo usuario con los datos recibidos en la solicitud
exports.createUsers = async function(req,res){
     // Crea una nueva instancia del modelo de usuario con los datos del cuerpo de la solicitud
    const newUsers = new usersModel(req.body)
    // Llama al método de creación del modelo para agregar al nuevo usuario
    await usersModel.create(newUsers,function(err){
        if(err){
            res.render("users/error.ejs", {err})
        }else{
            // Si el usuario se crea correctamente, redirige a la lista de usuarios
            res.redirect(`/api/${process.env.API_VERSION}/users/users/`)
        }
    })
}
// Actualiza los datos de un usuario existente con la información recibida en la solicitud
exports.updateUsers = async function(req,res){
    // Obtiene el ID del usuario desde los parámetros de la solicitud
    const {id} = req.params
    // Extrae los nuevos datos del usuario del cuerpo de la solicitud
    const updateUsers = req.body
    await usersModel.update(id,updateUsers,function(err,result){
        if(err){
            res.render("users/error.ejs", {err})
        }else{
            console.log('Usuario actualizado correctamente:', result)
            // Si el usuario se actualiza correctamente, imprime el resultado y redirige a la lista de usuarios
            res.redirect(`/api/${process.env.API_VERSION}/users/users/`)
        }
    })
}
// Elimina un usuario por su ID
exports.deleteUsersById = async function(req,res){
    const {id} = req.params
    await usersModel.deleteById(id,function(err){
        if(err){
            res.render("users/error.ejs", {err})
        }else{
            // Si el usuario es eliminado correctamente, redirige a la lista de usuarios
            res.redirect(`/api/${process.env.API_VERSION}/users/users/`)
        }
    })
}

// ** FUNCIONES MEGAZORD **

exports.findAllUsersMegazord = async function (req, res) {

    await usersModel.findAll(function (err, usersData) {
        if (err) {
            res.status(500).json(err)
        } else {
             // Si la consulta es exitosa, renderiza la vista 'index.ejs' pasando los datos de los usuarios y el perfil
            res.status(200).json(usersData)
        }
    }) 
}

exports.findUsersByIdMegazord = async function(req,res){
    const {id} = req.params
    await usersModel.findById(id, function(err,datosUser){
        if(err){
            res.status(404).json(err)
        }else{
            // Si la consulta es exitosa, renderiza la vista 'show.ejs' con los datos del usuario
            res.status(200).json(datosUser)
        }
    })
}

exports.createUsersMegazord = async function(req,res){
    // Crea una nueva instancia del modelo de usuario con los datos del cuerpo de la solicitud
   const newUsers = new usersModel(req.body)
   // Llama al método de creación del modelo para agregar al nuevo usuario
   await usersModel.create(newUsers,function(err,usuarioCreado){
       if(err){
            res.status(400).json(err)
       }else{
            // Si el usuario se crea correctamente, redirige a la lista de usuarios
            res.status(200).json(usuarioCreado)
       }
   })
}

exports.updateUsersMegazord = async(req,res) => {
    const { id } = req.params
    // Realiza una consulta para obtener los datos del usuario con el ID proporcionado
    await usersModel.findById(id,function(err,users){
        if(err){
            res.status(400).json(err)
        }else{
            // Si el usuario es encontrado, renderiza la vista de edición con los datos del usuario y el perfil
            res.status(200).json(users)
        }
    })
}

exports.deleteUsersMegazord = async function(req,res){
    const {id} = req.params
    await usersModel.deleteById(id,function(err,datosUsuario){
        if(err){
            res.status(400).json(err)
        }else{
            // Si el usuario es eliminado correctamente, redirige a la lista de usuarios
            res.status(200).json(datosUsuario)
        }
    })
}