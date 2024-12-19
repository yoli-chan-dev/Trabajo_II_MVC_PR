require("dotenv").config()
const swaggerJsdoc = require("swagger-jsdoc")

const options = {
    definition:{
        openapi: "3.0.0",
        info:{
            title: "API PR MEGAZORD", // ? Info de cada cosa, mirar que cosa es cada cosa y con que cosa va cada cosa
            version: process.env.API_VERSION,
            contact:{
                name: "Power Rangers"
            },
            servers:[
                {
                    url: "http://localhost" + process.env.PUERTO,
                    description: "Local Server"
                }
            ]
        }
    },
    apis:[`./routes/*js`] // * El '*' significa todo lo que acabe por 'js'
}

const specs = swaggerJsdoc(options)
module.exports = specs // * Exportamos esta chucha