const inscriptionsController = require("../controllers/inscriptions.controller")
const express = require("express")
const router = express.Router()

//Mostrar JSON del listado de inscripciones
//router.get("/json",inscriptionsController.findAllInscriptions)
//Mostrar VISTA EJS index.ejs con listado de inscripciones
router.get("/inscriptions",inscriptionsController.showAllInscriptions)
//Mostrar VISTA EJS new.ejs para crear un comentario
router.get("/inscriptions/new",inscriptionsController.showNewInscriptions)
//Mostrar VISTA EJS show.ejs para mostrar detalles de un comentario
router.get("/inscriptions/:id",inscriptionsController.showInscriptionsById)
//Mostrar VISTA EJS edit.ejs para mostrar detalles de una inscripcion y poder editarlos
router.get("/inscriptions/:id/edit",inscriptionsController.showEditInscriptions)

//POST - Crear inscripción
router.post("/inscriptions",inscriptionsController.createInscriptions)

//PATCH - Editar inscripción
router.patch("/inscriptions/:id",inscriptionsController.editInscriptions)

//DELETE - Eliminar inscripción*/
router.delete("/inscriptions/:id",inscriptionsController.deleteInscriptions)


// ** RUTAS MEGAZORD **

//--------------------------------------------------------------------------------------


/**
 * @swagger
 * components:
 *      schemas:
 *          Inscription: 
 *              type: object
 *              required: 
 *                  - idUser
 *                  - idCompany 
 *                  - fecIni
 *                  - observaciones
 *              properties: 
 *                  _id:
 *                      type: objectId
 *                      description: UUID autogenerated by MongoDB
 *                  idUser:
 *                      type: string
 *                      description: It´s a set of numbers and letters that serves to indentificated the user
 *                  idCompany:
 *                      type: string
 *                      description: It´s a set of numbers and letters that serves to indentificated the company
 *                  fecIni:
 *                      type: date
 *                      description: Inscription start date
 *                  fecFin:
 *                      type: date
 *                      description: Inscription end date
 *                  observaciones:
 *                      type: string
 *                      description: Text field for additional remarks
 *              example:
 *                  _id: 456abc123
 *                  idUser: "B123456768"
 *                  idCompany: "C123443456"
 *                  fecIni: "2024-11-25 10:00:00"
 *                  observaciones: "Nada que añadir."
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
 *      name: Inscriptions
 *      description: The Inscription Management API
 */


//------------------------------------------------------------------------



//GET - Mostrar todas las inscripciones


/**
 * @swagger
 * /api/v2/inscriptions/inscriptionsMZ:
 *      get: 
 *          summary: Returns the list of inscriptions
 *          tags: [Inscriptions]
 *          responses: 
 *              200:
 *                  description: List of the inscriptions
 *                  content: 
 *                      application/json:
 *                          schema: 
 *                              type: array
 *                              items: 
 *                                  $ref: '#/components/schemas/Inscriptions'
 *              500:
 *                  description: Returns error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/Error'
 */
router.get("/inscriptionsMZ",inscriptionsController.findAllInscriptionsMegazord)

//GET - Mostrar inscripcion por ID


/**
 * @swagger
 * /api/v2/inscriptions/inscriptionsMZ/{id}:
 *      get: 
 *          summary: Return a inscription
 *          tags: [Inscriptions]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema: 
 *                  type: string
 *                required: true
 *                description: The ID of the inscription UUID / _id MongoDB
 *          responses: 
 *              200:
 *                  description: Returns the inscription
 *                  content: 
 *                      application/json:
 *                          schema: 
 *                              type: object
 *                              $ref: '#/components/schemas/Inscriptions'
 *              404:
 *                  description: Not Found
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/Error'
 */
router.get("/inscriptionsMZ/:id",inscriptionsController.showInscriptionsByIdMegazord)

//POST - Crear inscripción


/**
 * @swagger
 * /api/v2/inscriptions/inscriptionsMZ:
 *      post: 
 *          summary: Create a new inscription
 *          tags: [Inscriptions]
 *          requestBody: 
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Inscriptions'
 *          responses: 
 *              200:
 *                  description: Inscription created
 *                  content: 
 *                      application/json:
 *                          schema: 
 *                              type: object
 *                              $ref: '#/components/schemas/Inscriptions'
 *              400:
 *                  description: Bad Request 
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/Error'
 */
router.post("/inscriptionsMZ/",inscriptionsController.createInscriptionsMegazord)

//PATCH - Editar inscripción


/**
 * @swagger
 * /api/v2/inscriptions/inscriptionsMZ/{id}:
 *      patch: 
 *          summary: Edit an existing inscription
 *          tags: [Inscriptions]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema: 
 *                  type: string
 *                required: true
 *                description: The ID of the inscription UUID / _id MongoDB
 *          requestBody: 
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Inscriptions'
 *          responses: 
 *              200:
 *                  description: Inscription edited
 *                  content: 
 *                      application/json:
 *                          schema: 
 *                              type: object
 *                              $ref: '#/components/schemas/Inscriptions'
 *              400:
 *                  description: Bad Request 
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/Error'
 */
router.patch("/inscriptionsMZ/:id",inscriptionsController.editInscriptionsMegazord)

//DELETE - Eliminar inscripción*/


/**
 * @swagger
 * /api/v2/inscriptions/inscriptionsMZ/{id}:
 *      delete: 
 *          summary: Delete a inscription
 *          tags: [Inscriptions]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema: 
 *                  type: string
 *                required: true
 *                description: The ID of the inscription UUID / _id MongoDB
 *          requestBody: 
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Inscriptions'
 *          responses: 
 *              200:
 *                  description: Deleted inscription
 *                  content: 
 *                      application/json:
 *                          schema: 
 *                              type: object
 *                              $ref: '#/components/schemas/Inscriptions'
 *              400:
 *                  description: Bad Request 
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/Error'
 */
router.delete("/inscriptionsMZ/:id",inscriptionsController.deleteInscriptionsMegazord)

module.exports = router