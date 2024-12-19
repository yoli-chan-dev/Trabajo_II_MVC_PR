const companyController = require("../controllers/company.controller")
const express = require("express")
const router = express.Router()

//Mostrar JSON del listado de comentarios
//router.get("/company/json",companyController.findAllCompany)
//Mostrar VISTA EJS index.ejs con listado de comentarios
router.get("/company",companyController.showAllCompany)

//Mostrar VISTA EJS new.ejs para crear un comentario
router.get("/company/new",companyController.showNewCompany)
//Mostrar VISTA EJS show.ejs para mostrar detalles de un comentario
router.get("/company/:id",companyController.showCompanyById)
//Mostrar VISTA EJS edit.ejs para mostrar detalles de un comentario y poder editarlos
router.get("/company/:id/edit",companyController.showEditCompany)

//POST - Crear compañía
router.post("/company",companyController.createCompany)

//PATCH - Editar compañía
router.patch("/company/:id",companyController.editCompany)

//DELETE - Eliminar compañía
router.delete("/company/:id",companyController.deleteCompany)


// ** RUTAS MEGAZORD **

//--------------------------------------------------------------------------------------


/**
 * @swagger
 * components:
 *      schemas:
 *          Company: 
 *              type: object
 *              required: 
 *                  - cif
 *                  - name 
 *                  - city
 *                  - personInCharge
 *                  - personInChargeID
 *                  - type
 *                  - family
 *                  - address
 *                  - area
 *                  - postalCode
 *                  - phone
 *                  - email
 *              properties: 
 *                  _id:
 *                      type: objectId
 *                      description: UUID autogenerated by MongoDB
 *                  cif:
 *                      type: string
 *                      description: It´s a set of numbers and letters that serves to indentificated de company
 *                  name:
 *                      type: string
 *                      description: Name of the company
 *                  city:
 *                      type: string
 *                      description: The name of the city where is the sede of the company
 *                  personInCharge: 
 *                      type: string
 *                      description: The name of the person who is the director of the company
 *                  personInChargeID: 
 *                      type: string
 *                      description: The identificator of the person who is the director of the company
 *                  type: 
 *                      type: string
 *                      description: This attribute shows if the company is private or public
 *                  family: 
 *                      type: string
 *                      description: The family or the sector to which the company belongs
 *                  address: 
 *                      type: string
 *                      description: The direction where ir the sede of the company
 *                  area: 
 *                      type: string
 *                      description: Area or region of the company, the province
 *                  postalCode: 
 *                      type: string
 *                      description: The postal code of the city where is the sede of the company
 *                  phone: 
 *                      type: string
 *                      description: The public phone number of the company
 *                  email: 
 *                      type: string
 *                      description: The email direction of the company
 *                  createdDate: 
 *                      type: string
 *                      description: Creation date of the company
 *                  modifiedDate: 
 *                      type: string
 *                      description: Date of the last modification of the company
 *              example:
 *                  _id: 123abc456
 *                  cif: "A12345678"
 *                  name: "WebWork"
 *                  city: "Ponferrada"
 *                  personInCharge: "Eusebio Hernandez"
 *                  personInChargeID: "12345678Z"
 *                  type: "PUBLIC"
 *                  family: "Informatica"
 *                  address: "C/ San Blas Nº 30 2ºDer "
 *                  area: "Leon"
 *                  postalCode: 24401
 *                  phone: 633189371
 *                  email: "WebWork@gmail.com"
 *                  createdDate: "2024-11-25 10:00:00"
 *                  modifiedDat: "2024-11-25 10:00:00"
 *          Error: 
 *              type: object
 *              properties: 
 *                  err:
 *                      type: string
 *                      description: Description of the error
 *              example:
 *                  err: No data available
 */


/**
 * @swagger
 * tags:
 *      name: Companies
 *      description: The Company Management API
 */


//------------------------------------------------------------------------


//GET - Mostrar todas las compañias


/**
 * @swagger
 * /api/v2/:
 *      get: 
 *          summary: Returns the list of companies
 *          tags: [Companies]
 *          responses: 
 *              200:
 *                  description: List of the companies
 *                  content: 
 *                      application/json:
 *                          schema: 
 *                              type: array
 *                              items: 
 *                                  $ref: '#/components/schemas/Company'
 *              500:
 *                  description: Returns error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/Error'
 */
router.get("/",companyController.findAllCompanyMegazord)

//GET - Mostrar compañia por ID

/**
 * @swagger
 * /api/v2/{id}:
 *      get: 
 *          summary: Return a company
 *          tags: [Companies]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema: 
 *                  type: string
 *                required: true
 *                description: The ID of the company UUID / _id MongoDB
 *          responses: 
 *              200:
 *                  description: Returns the company
 *                  content: 
 *                      application/json:
 *                          schema: 
 *                              type: object
 *                              $ref: '#/components/schemas/Company'
 *              404:
 *                  description: Not Found
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/Error'
 */
router.get("/:id",companyController.showCompanyByIdMegazord)

//POST - Crear compañía


/**
 * @swagger
 * /api/v2/:
 *      post: 
 *          summary: Create a new company
 *          tags: [Companies]
 *          requestBody: 
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Company'
 *          responses: 
 *              200:
 *                  description: Company created
 *                  content: 
 *                      application/json:
 *                          schema: 
 *                              type: object
 *                              $ref: '#/components/schemas/Company'
 *              400:
 *                  description: Bad Request 
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/Error'
 */
router.post("/",companyController.createCompanyMegazord)

//PATCH - Editar compañía


/**
 * @swagger
 * /api/v2/{id}:
 *      patch: 
 *          summary: Edit an existing company
 *          tags: [Companies]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema: 
 *                  type: string
 *                required: true
 *                description: The ID of the company UUID / _id MongoDB
 *          requestBody: 
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Company'
 *          responses: 
 *              200:
 *                  description: Company edited
 *                  content: 
 *                      application/json:
 *                          schema: 
 *                              type: object
 *                              $ref: '#/components/schemas/Company'
 *              400:
 *                  description: Bad Request 
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/Error'
 */
router.patch("/:id",companyController.editCompanyMegazord)

//DELETE - Eliminar compañía


/**
 * @swagger
 * /api/v2/{id}:
 *      delete: 
 *          summary: Delete a company
 *          tags: [Companies]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema: 
 *                  type: string
 *                required: true
 *                description: The ID of the company UUID / _id MongoDB
 *          requestBody: 
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Company'
 *          responses: 
 *              200:
 *                  description: Deleted company
 *                  content: 
 *                      application/json:
 *                          schema: 
 *                              type: object
 *                              $ref: '#/components/schemas/Company'
 *              400:
 *                  description: Bad Request 
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/Error'
 */
router.delete("/:id",companyController.deleteCompanyMegazord)


//GET *
//router.get("*",companyController.otherSites)


module.exports = router