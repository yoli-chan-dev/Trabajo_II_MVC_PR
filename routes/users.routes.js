const usersController = require("../controllers/users.controller")
const express = require("express")
const router = express.Router()

//Mostrar VISTA EJS index.ejs con listado de usuarios
router.get("/users",usersController.findAllUsers)
//Mostrar VISTA EJS new.ejs para crear un comentario
router.get("/users/new",usersController.showNewUsers)
//Mostrar VISTA EJS show.ejs para mostrar detalles de un comentario
router.get("/users/:id",usersController.findUsersById)
//Mostrar VISTA EJS edit.ejs para mostrar detalles de un comentario y poder editarlos
router.get("/users/:id/edit",usersController.showEditUsers)

//POST - Crear usuario
router.post("/users",usersController.createUsers)
//PATCH - Editar usuario
router.patch("/users/:id",usersController.updateUsers)
//DELETE - Eliminar usuario*/
router.delete("/users/:id",usersController.deleteUsersById)


// ** RUTAS MEGAZORD **


//--------------------------------------------------------------------------------------


/**
 * @swagger
 * components:
 *      schemas:
 *          Users: 
 *              type: object
 *              required: 
 *                  - nif
 *                  - username 
 *                  - password
 *                  - firstName
 *                  - lastName
 *                  - email
 *                  - createdDate
 *                  - modifiedDate
 *                  - profile
 *              properties: 
 *                  _id:
 *                      type: objectId
 *                      description: UUID autogenerated by MongoDB
 *                  nif:
 *                      type: string
 *                      description: It´s a set of numbers and letters that serves to indentificated the users
 *                  username:
 *                      type: string
 *                      description: Name of the user
 *                  password:
 *                      type: string
 *                      description: The set of characters to get security to the user's data
 *                  firstName: 
 *                      type: string
 *                      description: The first name of the user
 *                  lastName: 
 *                      type: string
 *                      description: The last name of the user
 *                  email: 
 *                      type: string
 *                      description: The email direction of the user
 *                  createdDate: 
 *                      type: date
 *                      description: The creation date of the user's profile
 *                  modifiedDate: 
 *                      type: date
 *                      description: The modification date of the user's profile
 *                  picture: 
 *                      type: image
 *                      description: Profile image that the user puts on
 *                  profile: 
 *                      type: string
 *                      description: Selection the typè of profile like administrator teacher or student.
 *              example:
 *                  _id: 123456
 *                  nif: "121212"
 *                  username: "admin_user"
 *                  password: "1234"
 *                  firstName: "Eusebio"
 *                  lastName: "Smith"
 *                  createdDate: "2024-11-25 10:00:00"
 *                  modifiedDate: "2024-11-30 10:00:00"
 *                  email: "admin@example.com"
 *                  picture: NULL
 *                  profile: "Administrator"
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
 *      name: Users
 *      description: The Users Management API
 */


//------------------------------------------------------------------------


//GET - Mostrar todos los usuarios


/**
 * @swagger
 * /api/v2/users/usersMZ:
 *      get: 
 *          summary: Returns the list of users
 *          tags: [Users]
 *          responses: 
 *              200:
 *                  description: List of the users
 *                  content: 
 *                      application/json:
 *                          schema: 
 *                              type: array
 *                              items: 
 *                                  $ref: '#/components/schemas/Users'
 *              500:
 *                  description: Returns error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/Error'
 */
router.get("/usersMZ",usersController.findAllUsersMegazord)

//GET - Mostrar usuario por ID


/**
 * @swagger
 * /api/v2/users/usersMZ/{id}:
 *      get: 
 *          summary: Return a user
 *          tags: [Users]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema: 
 *                  type: string
 *                required: true
 *                description: The ID of the user UUID / _id MongoDB
 *          responses: 
 *              200:
 *                  description: Returns the user
 *                  content: 
 *                      application/json:
 *                          schema: 
 *                              type: object
 *                              $ref: '#/components/schemas/Users'
 *              404:
 *                  description: Not Found
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/Error'
 */
router.get("/usersMZ/:id",usersController.findUsersByIdMegazord)

//POST - Crear usuario



/**
 * @swagger
 * /api/v2/users/usersMZ:
 *      post: 
 *          summary: Create a new user
 *          tags: [Users]
 *          requestBody: 
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Users'
 *          responses: 
 *              200:
 *                  description: User created
 *                  content: 
 *                      application/json:
 *                          schema: 
 *                              type: object
 *                              $ref: '#/components/schemas/Users'
 *              400:
 *                  description: Bad Request 
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/Error'
 */
router.post("/usersMZ",usersController.createUsersMegazord)

//PATCH - Editar usuario


/**
 * @swagger
 * /api/v2/users/usersMZ/{id}:
 *      patch: 
 *          summary: Edit an existing user
 *          tags: [Users]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema: 
 *                  type: string
 *                required: true
 *                description: The ID of the user UUID / _id MongoDB
 *          requestBody: 
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/User'
 *          responses: 
 *              200:
 *                  description: User edited
 *                  content: 
 *                      application/json:
 *                          schema: 
 *                              type: object
 *                              $ref: '#/components/schemas/User'
 *              400:
 *                  description: Bad Request 
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/Error'
 */
router.patch("/usersMZ/:id",usersController.updateUsersMegazord)

//DELETE - Eliminar usuario*/


/**
 * @swagger
 * /api/v2/users/usersMZ/{id}:
 *      delete: 
 *          summary: Delete a user
 *          tags: [Users]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema: 
 *                  type: string
 *                required: true
 *                description: The ID of the user UUID / _id MongoDB
 *          requestBody: 
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Users'
 *          responses: 
 *              200:
 *                  description: Deleted user
 *                  content: 
 *                      application/json:
 *                          schema: 
 *                              type: object
 *                              $ref: '#/components/schemas/Users'
 *              400:
 *                  description: Bad Request 
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/Error'
 */
router.delete("/usersMZ/:id",usersController.deleteUsersMegazord)


module.exports = router