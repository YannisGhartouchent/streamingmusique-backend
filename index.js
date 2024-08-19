/* Connexion à la base de donnée */
require("../utils/database");
const mongoose = require("mongoose");

describe("UserService", () => {
  require("./services/UserService.test");
});

describe("UserController", () => {
  require("./controllers/UserController.test");
});

describe("TrackService", () => {
  require("./services/TrackService.test");
});

describe("TrackController", () => {
  require("./controllers/TrackController.test");
});
describe("TchatService", () => {
  require("./services/TrackService.test");
});
describe("TchatController", () => {
  require("./controllers/TrackController.test");
});

describe("CategoryController", () => {
  require("./controllers/CategoryController.test");
});
describe("CategoryService", () => {
  require("./services/CategoryService.test");
});

describe("ArtistController", () => {
  require("./controllers/ArtistController.test");
});
describe("ArtistService", () => {
  require("./services/ArtistService.test");
});

describe("AlbumController", () => {
  require("./controllers/AlbumController.test");
});
describe("AlbumService", () => {
  require("./services/AlbumService.test");
});





describe("API - Mongo", () => {
  it("vider les dbs. -S", () => {
    if (process.env.npm_lifecycle_event == "test") {
      mongoose.connection.db.dropDatabase();
    }
  });
});
