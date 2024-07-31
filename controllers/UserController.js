


































































































































































































































































/**
 * @swagger
 * /login:
 * post:
 * summary: Login user
 * description: Login user with the provided details.
 * tags:
 * - Login
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Login'
 * responses:
 * 200:
 * description: Login successfully.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/User'
 * 404:
 * $ref: '#/components/responses/NotFound'
 * 405:
 * $ref: '#/components/responses/ValidationError'
 * 500:
 * description: Internal server error.
 */
// La fonction pour gerer l'authentification depuis passport
module.exports.loginUser = function (req, res, next) {
 passport.authenticate('login', { badRequestMessage: "Les champs sont manquants." }, async function (err, user) {
 if (err) {
 res.statusCode = 401
 return res.send({msg: "Le nom d'utilisateur ou mot de passe n'est pas correct.", type_error: "no-valid-login"})
 }
 else {
 req.logIn(user, async function (err) {
 if (err) {
 res.statusCode = 500
 return res.send({msg:"Probleme d'authnetification sur le serveur.", type_error: "internal"})
 }
 else {
 return res.send(user)
 }
 });
 }
 })(req, res, next)
}
/**
 * @swagger
 * /user:
 * post:
 * summary: Create a new user
 * description: Create a new user with the provided details.
 * tags:
 * - User
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/User'
 * responses:
 * 201:
 * description: User created successfully.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/User'
 * 404:
 * $ref: '#/components/responses/NotFound'
 * 405:
 * $ref: '#/components/responses/ValidationError'
 * 500:
 * description: Internal server error.
 */
// La fonction permet d'ajouter un utilisateur
module.exports.addOneUser = function (req, res) {
 LoggerHttp(req, res)
 req.log.info("Création d'un utilisateur")
 UserService.addOneUser(req.body, null, function (err, value) {
 if (err && err.type_error == "no found") {
 res.statusCode = 404
 res.send(err)
 }
 else if (err && err.type_error == "validator") {
 res.statusCode = 405
 res.send(err)
 }
 else if (err && err.type_error == "duplicate") {
 res.statusCode = 405
 res.send(err)
 }
 else {
 res.statusCode = 201
 res.send(value)
 }
 })
}
/**
 * @swagger
 * /users_by_filters:
 * get:
 * summary: Get a list of users
 * description: Retrieve a paginated list of users with optional search query. This endpoint is protected by JWT.
 * tags:
 * - User
 * security:
 * - bearerAuth: []
 * parameters:
 * - name: page
 * in: query
 * description: The page number to retrieve
 * required: false
 * schema:
 * type: integer
 * example: 1
 * - name: pageSize
 * in: query
 * description: The number of users per page
 * required: false
 * schema:
 * type: integer
 * example: 10
 * - name: q
 * in: query
 * description: The search query to filter users
 * required: false
 * schema:
 * type: string
 * example: johndoe
 * responses:
 * 200:
 * description: A list of users.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * results:
 * type: array
 * items:
 * $ref: '#/components/schemas/User'
 * count:
 * type: integer
 * description: The total number of users
 * example: 100
 * 404:
 * $ref: '#/components/responses/NotFound'
 * 405:
 * $ref: '#/components/responses/ValidationError'
 * 401:
 * description: Unauthorized. Invalid or missing token.
 * 500:
 * description: Internal server error.
 */
// La fonction permet de chercher plusieurs utilisateurs
module.exports.findManyUsers = function (req, res) {
 req.log.info(`Recherche de plusieurs utilisateurs demandées par ${req.user.username}`)
 //console.log(req.user)
 let page = req.query.page
 let pageSize = req.query.pageSize
 let searchValue = req.query.q
 UserService.findManyUsers(searchValue, pageSize, page, null, function (err, value) {
 if (err && err.type_error == "no-valid") {
 res.statusCode = 405
 res.send(err)
 }
 else if (err && err.type_error == "error-mongo") {
 res.statusCode = 500
 res.send(err)
 }
 else {
 res.statusCode = 200
 res.send(value)
 }
 })
} 