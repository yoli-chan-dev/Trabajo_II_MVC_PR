const companyModel = require("../models/company.model")
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
    
    const company = [
        {            
            cif: "A12345678",
            name: "WebWork",
            city: "Ponferrada",
            personInCharge: "Eusebio Hernandez",
            personInChargeID: "12345678Z",
            type: "PUBLIC",
            family: "Informatica",
            address: "C/ San Blas Nº 30 2ºDer ",
            area: "Leon",
            postalCode: 24401,
            phone: 633189371,
            email: "WebWork@gmail.com",
            createdDate: new Date(),
            modifiedDat: new Date()
          },
          {           
            cif: "S0794867B",
            name: "Vespiqueen",
            city: "San Pedo del Pinatar",
            personInCharge: "Eloy Jimenez",
            personInChargeID: "22222222D",
            type: "PUBLIC",
            family: "Agricultora",
            address: "C/ San Nicolas Nº 12 1ºIzq ",
            area: "Murcia",
            postalCode: 30740,
            phone: 639008525,
            email: "Vespiqueen@gmail.com",
            createdDate: new Date(),
            modifiedDate: new Date()
          },
          {            
            cif: "S0794869Z",
            name: "YOOOOLIIIIIIIII",
            city: "San Pedo del Pinatar",
            personInCharge: "Eloy Jimenez",
            personInChargeID: "33333333F",
            type: "PUBLIC",
            family: "Agricultora",
            address: "C/ San Nicolas Nº 12 1ºIzq ",
            area: "Murcia",
            postalCode: 30740,
            phone: 639008525,
            email: "Vespiqueen@gmail.com",
            createdDate: new Date(),
            modifiedDate: new Date()
          }
    ]

    await companyModel.insertMany(company)
    .then((res)=>{
        console.log(res)
    })
    .catch((err)=>{
        console.log(err)
    })
    
    process.exit()
}


ejecutar()