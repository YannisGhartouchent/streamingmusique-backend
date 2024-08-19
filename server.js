// 1ere chose à faire, importer les librairies
const express = require("express");
const _ = require("lodash");
const bodyParser = require("body-parser");
const Config = require("./config");
const Logger = require("./utils/logger").pino;

// Création de notre application express.js
const app = express();

// Démarrage de la database
require("./utils/database");

/*Ajout de module de Login*/
const passport = require ('./utils/passport')
/* Passport init */

var session = require('express-session')

app.use(session({
  secret: Config.secret_cookie,
  resave: false,
  saveUninitialized: true,
  cookie:  { secure: true }

}))

app.use(passport.initialize())
app.use(passport.session())



app.use(passport.initialize())
//app.use(passport.session())

// Déclaration des controllers pour l'utilisateur
const UserController = require("./controllers/UserController");
const TrackController = require("./controllers/TrackController");
const CategoryController = require("./controllers/CategoryController")

// Déclaration des middlewares
const DatabaseMiddleware = require("./middlewares/database");
const LoggerMiddleware = require("./middlewares/logger");

// Déclaration des middlewares à express
app.use(bodyParser.json(), LoggerMiddleware.addLogger);

/*--------------------- Création des routes (User - Utilisateur) ---------------------*/

app.post('/login', DatabaseMiddleware.checkConnexion, UserController.loginUser);

// Création du endpoint /user pour l'ajout d'un utilisateur
app.post("/user", DatabaseMiddleware.checkConnexion, UserController.addOneUser);

// Création du endpoint /user pour l'ajout de plusieurs utilisateurs
app.post(
  "/users",
  DatabaseMiddleware.checkConnexion, passport.authenticate('jwt', { session: false}),
  UserController.addManyUsers
);

// Création du endpoint /user pour la récupération d'un utilisateur par le champ selectionné
app.get("/user", DatabaseMiddleware.checkConnexion, passport.authenticate('jwt', { session: false}),
  UserController.findOneUser);

// Création du endpoint /user pour la récupération d'un utilisateur via l'id
app.get(
  "/user/:id",
  DatabaseMiddleware.checkConnexion, passport.authenticate('jwt', { session: false}),
  UserController.findOneUserById
);

// Création du endpoint /user pour la récupération de plusieurs utilisateurs via l'idS
app.get(
  "/users",
  DatabaseMiddleware.checkConnexion, passport.authenticate('jwt', { session: false}),
  UserController.findManyUsersById
);

// Création du endpoint /users_by_filters pour la récupération de plusieurs utilisateurs
app.get(
  "/users_by_filters",
  DatabaseMiddleware.checkConnexion, passport.authenticate('jwt', { session: false}),
  UserController.findManyUsers
);

// Création du endpoint /user pour la modification d'un utilisateur
app.put(
  "/user/:id",
  DatabaseMiddleware.checkConnexion, passport.authenticate('jwt', { session: false}),
  UserController.updateOneUser
);

// Création du endpoint /user pour la modification de plusieurs utilisateurs
app.put(
  "/users",
  DatabaseMiddleware.checkConnexion,  passport.authenticate('jwt', { session: false}),
  UserController.updateManyUsers
);

// Création du endpoint /user pour la suppression d'un utilisateur
app.delete(
  "/user/:id",
  DatabaseMiddleware.checkConnexion, passport.authenticate('jwt', { session: false}),
  UserController.deleteOneUser
);

// Création du endpoint /user pour la suppression de plusieurs utilisateurs
app.delete(
  "/users",
  DatabaseMiddleware.checkConnexion, passport.authenticate('jwt', { session: false}),
  UserController.deleteManyUsers
);

//----------------------------Création des routes (User - Utilisateur) ------------------------------------

//Création d'un Endpoint /login pour connecter un utilisateur
app.post('/login', DatabaseMiddleware.checkConnexion, UserController.loginUser)

//Création d'un Endpoint /logout pour connecter un utilisateur
app.post('/logout', DatabaseMiddleware.checkConnexion, passport.authenticate('jwt', {session: false}), UserController.logoutUser)

//Création d'un Endpoint /user pour l'ajout d'un utilisateur
app.post('/user', DatabaseMiddleware.checkConnexion, passport.authenticate('jwt', {session: false}), UserController.addOneUser)

//Création d'un Endpoint /users pour l'ajout de plusieurs utilisateurs
app.post('/users', DatabaseMiddleware.checkConnexion, passport.authenticate('jwt', {session: false}), UserController.addManyUsers)

//Création d'un Endpoint /user pour la selection d'un utilisateur par le champs séléctionné
app.get('/user', DatabaseMiddleware.checkConnexion, UserController.findOneUser)







/*--------------------- Création des routes (Track - Track) ---------------------*/

// Création du endpoint /track pour l'ajout d'un track
app.post(
  "/track",
  DatabaseMiddleware.checkConnexion,
  TrackController.addOneTrack
);

// Création du endpoint /tracks pour l'ajout de plusieurs tracks
app.post(
  "/tracks",
  DatabaseMiddleware.checkConnexion,
  TrackController.addManyTracks
);

// Création du endpoint /track pour la récupération d'un track via l'id
app.get(
  "/track/:id",
  DatabaseMiddleware.checkConnexion, passport.authenticate('jwt', { session: false}),
  TrackController.findOneTrackById
);

// Création du endpoint /tracks pour la récupération de plusieurs tracks via l'idS
app.get(
  "/tracks",
  DatabaseMiddleware.checkConnexion, passport.authenticate('jwt', { session: false}),
  TrackController.findManyTracksById
);

// Création du endpoint /track pour la récupération d'un track par le champ selectionné
app.get(
  "/track",
  DatabaseMiddleware.checkConnexion, passport.authenticate('jwt', { session: false}),
  TrackController.findOneTrack
);

// Création du endpoint /tracks_by_filters pour la récupération de plusieurs tracks par champ selectionné
app.get(
  "/tracks_by_filters",
  DatabaseMiddleware.checkConnexion, passport.authenticate('jwt', { session: false}),
  TrackController.findManyTracks
);

// Création du endpoint /track pour la modification d'un track
app.put(
  "/track/:id",
  DatabaseMiddleware.checkConnexion, passport.authenticate('jwt', { session: false}),
  TrackController.updateOneTrack
);

// Création du endpoint /tracks pour la modification de plusieurs tracks
app.put(
  "/tracks",
  DatabaseMiddleware.checkConnexion, passport.authenticate('jwt', { session: false}),
  TrackController.updateManyTracks
);

// Création du endpoint /track pour la suppression d'un track
app.delete(
  "/track/:id",
  DatabaseMiddleware.checkConnexion, passport.authenticate('jwt', { session: false}),
  TrackController.deleteOneTrack
);

// Création du endpoint /tracks pour la suppression de plusieurs tracks
app.delete(
  "/tracks",
  DatabaseMiddleware.checkConnexion, passport.authenticate('jwt', { session: false}),
  TrackController.deleteManyTracks
);



/*--------------------- Création des routes (Tchat - Tchat) ---------------------*/

// Création du endpoint /tchat pour l'ajout d'un tchat
app.post(
  "/tchat",
  DatabaseMiddleware.checkConnexion,
  TchatController.addOneTchat
);

// Création du endpoint /tchats pour l'ajout de plusieurs tchats
app.post(
  "/tchats",
  DatabaseMiddleware.checkConnexion,
  TchatController.addManyTchats
);

// Création du endpoint /tchat pour la récupération d'un tchat via l'id
app.get(
  "/tchat/:id",
  DatabaseMiddleware.checkConnexion, passport.authenticate('jwt', { session: false}),
  TchatController.findOneTchatById
);

// Création du endpoint /tchats pour la récupération de plusieurs tchats via l'idS
app.get(
  "/tchats",
  DatabaseMiddleware.checkConnexion, passport.authenticate('jwt', { session: false}),
  TchatController.findManyTchatsById
);

// Création du endpoint /tchat pour la récupération d'un tchat par le champ selectionné
app.get(
  "/tchat",
  DatabaseMiddleware.checkConnexion, passport.authenticate('jwt', { session: false}),
  TchatController.findOneTchat
);

// Création du endpoint /tchats_by_filters pour la récupération de plusieurs tchats par champ selectionné
app.get(
  "/tchats_by_filters",
  DatabaseMiddleware.checkConnexion, passport.authenticate('jwt', { session: false}),
  TchatController.findManyTchats
);

// Création du endpoint /tchat pour la modification d'un tchat
app.put(
  "/tchat/:id",
  DatabaseMiddleware.checkConnexion, passport.authenticate('jwt', { session: false}),
  TchatController.updateOneTchat
);

// Création du endpoint /tchats pour la modification de plusieurs tchats
app.put(
  "/tchats",
  DatabaseMiddleware.checkConnexion, passport.authenticate('jwt', { session: false}),
  TchatController.updateManyTchats
);

// Création du endpoint /tchat pour la suppression d'un tchat
app.delete(
  "/tchat/:id",
  DatabaseMiddleware.checkConnexion, passport.authenticate('jwt', { session: false}),
  TchatController.deleteOneTchat
);

// Création du endpoint /tchats pour la suppression de plusieurs tchats
app.delete(
  "/tchats",
  DatabaseMiddleware.checkConnexion, passport.authenticate('jwt', { session: false}),
  TchatController.deleteManyTchats
);


/*--------------------- Création des routes (Category - Category) ---------------------*/

// Création du endpoint /category pour l'ajout d'un category
app.post(
  "/category",
  DatabaseMiddleware.checkConnexion,
  CategoryController.addOneCategory
);

// Création du endpoint /categories pour l'ajout de plusieurs categories
app.post(
  "/categories",
  DatabaseMiddleware.checkConnexion,
  CategoryController.addManyCategories
);

// Création du endpoint /category pour la récupération d'un category via l'id
app.get(
  "/category/:id",
  DatabaseMiddleware.checkConnexion, passport.authenticate('jwt', { session: false}),
  CategoryController.findOneCategoryById
);

// Création du endpoint /categories pour la récupération de plusieurs categories via l'idS
app.get(
  "/categories",
  DatabaseMiddleware.checkConnexion, passport.authenticate('jwt', { session: false}),
  CategoryController.findManyCategoriesById
);

// Création du endpoint /category pour la récupération d'un category par le champ selectionné
app.get(
  "/category",
  DatabaseMiddleware.checkConnexion, passport.authenticate('jwt', { session: false}),
  CategoryController.findOneCategory
);

// Création du endpoint /by_filters pour la récupération de plusieurs categories par champ selectionné
app.get(
  "/categories_by_filters",
  DatabaseMiddleware.checkConnexion, passport.authenticate('jwt', { session: false}),
  CategoryController.findManyCategories
);

// Création du endpoint /category pour la modification d'un category
app.put(
  "/category/:id",
  DatabaseMiddleware.checkConnexion, passport.authenticate('jwt', { session: false}),
  CategoryController.updateOneCategory
);

// Création du endpoint /categories pour la modification de plusieurs categories
app.put(
  "/categories",
  DatabaseMiddleware.checkConnexion, passport.authenticate('jwt', { session: false}),
  CategoryController.updateManyCategories
);

// Création du endpoint /category pour la suppression d'un category
app.delete(
  "/category/:id",
  DatabaseMiddleware.checkConnexion, passport.authenticate('jwt', { session: false}),
  CategoryController.deleteOneCategory
);

// Création du endpoint /categories pour la suppression de plusieurs categories
app.delete(
  "/categories",
  DatabaseMiddleware.checkConnexion, passport.authenticate('jwt', { session: false}),
  CategoryController.deleteManyCategories
);


/*--------------------- Création des routes (Artist - Artist) ---------------------*/

// Création du endpoint /artist pour l'ajout d'un artist
app.post(
  "/artist",
  DatabaseMiddleware.checkConnexion,
  ArtistController.addOneArtist
);

// Création du endpoint /artists pour l'ajout de plusieurs artists
app.post(
  "/artists",
  DatabaseMiddleware.checkConnexion,
  ArtistController.addManyArtists
);

// Création du endpoint /artist pour la récupération d'un artist via l'id
app.get(
  "/artist/:id",
  DatabaseMiddleware.checkConnexion, passport.authenticate('jwt', { session: false}),
  ArtistController.findOneArtistById
);

// Création du endpoint /artists pour la récupération de plusieurs artists via l'idS
app.get(
  "/artists",
  DatabaseMiddleware.checkConnexion, passport.authenticate('jwt', { session: false}),
  ArtistController.findManyArtistsById
);

// Création du endpoint /artist pour la récupération d'un artist par le champ selectionné
app.get(
  "/artist",
  DatabaseMiddleware.checkConnexion, passport.authenticate('jwt', { session: false}),
  ArtistController.findOneArtist
);

// Création du endpoint /artists_by_filters pour la récupération de plusieurs artists par champ selectionné
app.get(
  "/artists_by_filters",
  DatabaseMiddleware.checkConnexion, passport.authenticate('jwt', { session: false}),
  ArtistController.findManyArtists
);

// Création du endpoint /artist pour la modification d'un artist
app.put(
  "/artist/:id",
  DatabaseMiddleware.checkConnexion, passport.authenticate('jwt', { session: false}),
  ArtistController.updateOneArtist
);

// Création du endpoint /artists pour la modification de plusieurs artists
app.put(
  "/artists",
  DatabaseMiddleware.checkConnexion, passport.authenticate('jwt', { session: false}),
  ArtistController.updateManyArtists
);

// Création du endpoint /artist pour la suppression d'un artist
app.delete(
  "/artist/:id",
  DatabaseMiddleware.checkConnexion, passport.authenticate('jwt', { session: false}),
  ArtistController.deleteOneArtist
);

// Création du endpoint /artists pour la suppression de plusieurs artists
app.delete(
  "/artists",
  DatabaseMiddleware.checkConnexion, passport.authenticate('jwt', { session: false}),
  ArtistController.deleteManyArtists
);


/*--------------------- Création des routes (Album - Album) ---------------------*/

// Création du endpoint /album pour l'ajout d'un album
app.post(
  "/album",
  DatabaseMiddleware.checkConnexion,
  AlbumController.addOneAlbum
);

// Création du endpoint /albums pour l'ajout de plusieurs albums
app.post(
  "/albums",
  DatabaseMiddleware.checkConnexion,
  AlbumController.addManyAlbums
);

// Création du endpoint /album pour la récupération d'un album via l'id
app.get(
  "/album/:id",
  DatabaseMiddleware.checkConnexion, passport.authenticate('jwt', { session: false}),
  AlbumController.findOneAlbumById
);

// Création du endpoint /albums pour la récupération de plusieurs albums via l'idS
app.get(
  "/albums",
  DatabaseMiddleware.checkConnexion, passport.authenticate('jwt', { session: false}),
  AlbumController.findManyAlbumsById
);

// Création du endpoint /album pour la récupération d'un album par le champ selectionné
app.get(
  "/album",
  DatabaseMiddleware.checkConnexion, passport.authenticate('jwt', { session: false}),
  AlbumController.findOneAlbum
);

// Création du endpoint /albums_by_filters pour la récupération de plusieurs albums par champ selectionné
app.get(
  "/albums_by_filters",
  DatabaseMiddleware.checkConnexion, passport.authenticate('jwt', { session: false}),
  AlbumController.findManyAlbums
);

// Création du endpoint /album pour la modification d'un album
app.put(
  "/album/:id",
  DatabaseMiddleware.checkConnexion, passport.authenticate('jwt', { session: false}),
  AlbumController.updateOneAlbum
);

// Création du endpoint /albums pour la modification de plusieurs albums
app.put(
  "/albums",
  DatabaseMiddleware.checkConnexion, passport.authenticate('jwt', { session: false}),
  AlbumController.updateManyAlbums
);

// Création du endpoint /album pour la suppression d'un album
app.delete(
  "/album/:id",
  DatabaseMiddleware.checkConnexion, passport.authenticate('jwt', { session: false}),
  AlbumController.deleteOneAlbum
);

// Création du endpoint /albums pour la suppression de plusieurs albums
app.delete(
  "/albums",
  DatabaseMiddleware.checkConnexion, passport.authenticate('jwt', { session: false}),
  AlbumController.deleteManyAlbums
);




/*---------------------------------------------------------------------------------------------------*/

// 2e chose à faire : Créer le server avec app.listen
app.listen(Config.port, () => {
  Logger.info(`Serveur démarré sur le port ${Config.port}.`);
});

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
// Configuration Swagger
const swaggerOptions = require('./swagger.json');
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve,
swaggerUi.setup(swaggerDocs)); 




module.exports = app;
