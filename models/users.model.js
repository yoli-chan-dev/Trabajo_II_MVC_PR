const dbConn = require("../utils/mysql.config")
const mysql = require("mysql") //npm i mysql

//ORM (Object Relationship Mapper)
let users = function(usuario) {
    //id (auto incremental 1)
    this.NIF = usuario.NIF,
    this.username = usuario.username,
    this.password = usuario.password,
    this.firstName = usuario.firstName,
    this.lastName = usuario.lastName,
    this.email = usuario.email,
    this.createdDate = new Date(),
    this.modifiedDate = new Date(),
    this.picture = usuario.picture
    this.profile = usuario.profile
}
// Función para obtener todos los usuarios desde la base de datos
users.findAll = async function (result) {
     // Crear una nueva conexión con la base de datos MySQL utilizando la configuración definida
    let connection = mysql.createConnection(dbConn) 
     // Conectar a MySQL
    connection.connect((error) => {
        if (error) {
            console.log("Error conectando a MySQL. Desc: " + error) 
        } else {
            console.log("Conexión MySQL abierta") 
             // Consulta SQL para seleccionar todos los usuarios
            const sql = "SELECT * FROM users" 
            connection.query(sql, function (err, users) {
                if (err) {
                    result(err, null) 
                } else {
                    // Si la consulta es exitosa, devuelve los usuarios
                    result(null, users) 
                }
            }) 
            // Cerrar la conexión después de ejecutar la consulta
            connection.end((err) => {
                if (err) {
                    console.log("Error al desconectar de MySQL. Desc: " + err) 
                } else {
                    console.log("Conexión MySQL cerrada") 
                }
            }) 
        }
    }) 
} 

// Función para obtener un usuario específico por su ID
users.findById = async function(id, result) {
    let connection = mysql.createConnection(dbConn)

    connection.connect((error) => {
        if(error) {
            console.log("Error conectando a MySQL. Desc: " + error)
        } 
        else{
             // Consulta SQL para obtener un usuario específico por su ID
        const sql = "SELECT * FROM users WHERE idUser = ?"
        connection.query(sql, id, function(err, datos) {
            connection.end() // Cerramos la conexión aquí

            if(err) {
                console.log("Error en la consulta: ", err)
                result(err, null)
                return
            }
            else {

                console.log("Consulta exitosa")
                result(null, datos[0]) // Devolvemos solo el primer resultado
            }
        })}
    })
}


// Función para crear un nuevo usuario en la base de datos
users.create = async function(newUsers,result){
    //Creamos conexión
    let connection = mysql.createConnection(dbConn)

    //Abrimos conexión
    connection.connect((error) => {
        if(error){
            console.log("Error conectando a MySQL. Desc: " + error)
        } else {
            console.log("Conexión MySQL abierta")
            const sql = "insert into users SET ?"  // Insertar nuevo usuario en la base de datos           
            
            connection.query(sql,newUsers,function(err,datos){
            
                if(err){
                    result(err,null)
                }else{
                    result(null,datos)
                }
            })
            
            connection.end((err)=>{
                if(err){
                    console.log("Error al desconectar de MySQL. Desc: " + err)
                    return
                }else{
                    console.log("Conexión MySQL cerrada")
                }
            })
        }
    })
}
// Función para actualizar los datos de un usuario específico por su ID
users.update = async function (id, updateUsers, result) {
    // Crear conexión
    let connection = mysql.createConnection(dbConn)

    // Abrir conexión
    connection.connect((error) => {
        if (error) {
            console.log("Error conectando a MySQL. Desc: " + error)
            result(error, null)
            return
        }

        console.log("Conexión MySQL abierta")

        // Consulta SQL
        const sql = "UPDATE users SET ? WHERE idUser = ?"

        // Ejecutar consulta
        connection.query(sql, [updateUsers, id], function (err, datos) {
            if (err) {
                console.log("Error en la consulta:", err)
                result(err, null)
            } else {
                console.log("Usuario actualizado correctamente:", datos)
                result(null, datos)
            }
        })

        // Cerrar conexión
        connection.end((err) => {
            if (err) {
                console.log("Error al desconectar de MySQL. Desc: " + err)
            } else {
                console.log("Conexión MySQL cerrada")
            }
        })
    })
}
// Función para eliminar un usuario específico por su ID
users.deleteById = async function(id,result){
    let connection = mysql.createConnection(dbConn)

    connection.connect((error) => {
        if(error){
            console.log("Error conectando a MySQL. Desc: " + error)
        } else {
            console.log("Conexión MySQL abierta")
            const sql = "delete from users where idUser = ?"   // Eliminar un usuario por su ID          
            connection.query(sql,id,function(err,datos){
                if(err){
                    result(err,null)
                }else{
                    result(null,datos)
                }
            })
            connection.end((err)=>{
                if(err){
                    console.log("Error al desconectar de MySQL. Desc: " + err)
                    return
                }else{
                    console.log("Conexión MySQL cerrada")
                }
            })
        }
    })
}

module.exports = users