//IMPORTS/REQUIRE
//PROCESS.ENV (npm i dotenv)
require("dotenv").config()
const methodOverride = require("method-override") //npm i method-override
const express = require("express") //npm i express
const app = express()
const path = require("path") //npm i path
const port = process.env.PORT || process.env.PUERTO
const mongodbConfig = require("./utils/mongodb.config")
// npm i axios, cors, uuid

//Obtener rutas de COMPANY
const companyRoutes = require("./routes/company.routes")
const usersRoutes = require("./routes/users.routes")
const inscriptionsRoutes = require("./routes/inscriptions.routes")

const swaggerUI = require("swagger-ui-express") // * ¡NUEVO!
const specs = require("./swagger/swagger") // * ¡NUEVO!

//CONFIGURACIONES
app.use(methodOverride("_method"))
app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs") //npm i ejs
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true})) //Para poder leer datos (request body) en métodos POST
app.use(express.json()) //Leer datos JSON en request body POST

app.use((req,res,next) => {
    //Variables GLOBALES para vistas EJS
    res.locals.tituloEJS = "API REST" 
    res.locals.BaseURLComments = `/api/${process.env.API_VERSION}`
    next()
})

//RUTAS

app.use("/api-docs",swaggerUI.serve, swaggerUI.setup(specs)) // * ¡NUEVO!

app.use(`/api/${process.env.API_VERSION}/`,companyRoutes)
app.use(`/api/${process.env.API_VERSION}/users`,usersRoutes)
app.use(`/api/${process.env.API_VERSION}/inscriptions`,inscriptionsRoutes)


//Resto de rutas (único app.get de todo el API REST)
app.get("*",(req,res)=>{
    res.status(500).json({err:"No existe la ruta"})
})

/* LEVANTAR SERVER */
app.listen(port, async()=>{
    console.log(`${process.env.MENSAJE} http://localhost:${port}/api/${process.env.API_VERSION}/`)
    try {
        //Una vez levantado el servidor, intentamos conectar con MongoDB
        await mongodbConfig.conectarMongoDB()
        .then(()=>{
            console.log("Conectado con MongoDB!!!")
        })
        .catch((err)=>{
            //Si no conectamos con MongoDB, debemos tumbar el server
            console.log(`Error al conectar. Desc: ${err}`)
            process.exit(0)
        })
    } catch (error) {
        //Si no conectamos con MongoDB, debemos tumbar el server
        console.log(`Error en el server. Desc: ${error}`)
        process.exit(0)
    }
})
