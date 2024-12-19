const inscriptionsModel = require("../models/inscriptions.model")
const mongodbConfig = require("../utils/mongodb.config")

const ejecutar = async() => {
    await mongodbConfig.conectarMongoDB()
    .then(()=>{
        console.log("Conectado con MongoDB!!!")
    })
    .catch((err)=>{
        //Si no conectamos con MongoDB, debemos tumbar el server
        console.log(`Error al conectar. Desc: ${err}`)
        process.exit(0)
    })
    
    const inscriptions = [
        {            
           idUser: "33333A",
           idCompany: "22222B",
           fecIni: new Date (),
           observaciones: "Nada importante. "
          },
          {           
            idUser: "1111b",
            idCompany: "555c",
            fecIni: new Date (),
            observaciones: "Nada que añadir. "
          }
    ]

    await inscriptionsModel.insertMany(inscriptions)
    .then((res)=>{
        console.log(res)
    })
    .catch((err)=>{
        console.log(err)
    })
    
    process.exit()
}


ejecutar()