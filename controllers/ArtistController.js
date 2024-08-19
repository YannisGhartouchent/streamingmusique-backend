ArtistService = require("../services/ArtistService");
const LoggerHttp = require("../utils/logger").http;

// La fonction permet d'ajouter un Artist
module.exports.addOneArtist = function (req, res) {
  LoggerHttp(req, res);
  req.log.info("Création d'un Artist");
  var options = {user: req, res}
  ArtistService.addOneArtist(req.body, null, function (err, value) {
    if (err && err.type_error == "no found") {
      res.statusCode = 404;
      res.send(err);
    } else if (err && err.type_error == "validator") {
      res.statusCode = 405;
      res.send(err);
    } else if (err && err.type_error == "duplicate") {
      res.statusCode = 405;
      res.send(err);
    } else {
      res.statusCode = 201;
      res.send(value);
    }
  });
};

// La fonction permet d'ajouter plusieurs Artists
module.exports.addManyArtists = function (req, res) {
  req.log.info("Création de plusieurs Artists");
  ArtistService.addManyArtists(req.body, null, function (err, value) {
    if (err) {
      res.statusCode = 405;
      res.send(err);
    } else {
      res.statusCode = 201;
      res.send(value);
    }
  });
};

// La fonction permet de chercher une Artist
module.exports.findOneArtistById = function (req, res) {
  req.log.info("Recherche d'une Artist par son id");
  var opts = { populate: req.query.populate };
  ArtistService.findOneArtistById(req.params.id, opts, function (err, value) {
    if (err && err.type_error == "no-found") {
      res.statusCode = 404;
      res.send(err);
    } else if (err && err.type_error == "no-valid") {
      res.statusCode = 405;
      res.send(err);
    } else if (err && err.type_error == "error-mongo") {
      res.statusCode = 500;
      res.send(err);
    } else {
      res.statusCode = 200;
      res.send(value);
    }
  });
};

// La fonction permet de chercher plusieurs Artists
module.exports.findManyArtistsById = function (req, res) {
  LoggerHttp(req, res);
  req.log.info("Recherche de plusieurs Artists", req.query.id);
  var arg = req.query.id;
  if (arg && !Array.isArray(arg)) arg = [arg];
  var opts = { populate: req.query.populate };
  ArtistService.findManyArtistsById(arg, opts, function (err, value) {
    if (err && err.type_error == "no-found") {
      res.statusCode = 404;
      res.send(err);
    } else if (err && err.type_error == "no-valid") {
      res.statusCode = 405;
      res.send(err);
    } else if (err && err.type_error == "error-mongo") {
      res.statusCode = 500;
      res.send(err);
    } else {
      res.statusCode = 200;
      res.send(value);
    }
  });
};

// La fonction permet de chercher un utilisateur par les champs autorisé
module.exports.findOneArtist = function (req, res) {
  LoggerHttp(req, res);
  req.log.info("Recherche d'un Artist par un champ autorisé");
  let fields = req.query.fields;
  if (fields && !Array.isArray(fields)) fields = [fields];
  var opts = { populate: req.query.populate };
  ArtistService.findOneArtist(
    fields,
    req.query.value,
    opts,
    function (err, value) {
      if (err && err.type_error == "no-found") {
        res.statusCode = 404;
        res.send(err);
      } else if (err && err.type_error == "no-valid") {
        res.statusCode = 405;
        res.send(err);
      } else if (err && err.type_error == "error-mongo") {
        res.statusCode = 500;
        res.send(err);
      } else {
        res.statusCode = 200;
        res.send(value);
      }
    }
  );
};

// La fonction permet de chercher plusieurs utilisateurs
module.exports.findManyArtists = function (req, res) {
  req.log.info("Recherche de plusieurs Artists");
  let page = req.query.page;
  let pageSize = req.query.pageSize;
  let searchValue = req.query.q;
  var opts = { populate: req.query.populate };
  ArtistService.findManyArtists(
    searchValue,
    pageSize,
    page,
    opts,
    function (err, value) {
      if (err && err.type_error == "no-valid") {
        res.statusCode = 405;
        res.send(err);
      } else if (err && err.type_error == "error-mongo") {
        res.statusCode = 500;
        res.send(err);
      } else {
        res.statusCode = 200;
        res.send(value);
      }
    }
  );
};

// La fonction permet de modifier une Artist
module.exports.updateOneArtist = function (req, res) {
  LoggerHttp(req, res);
  req.log.info("Modification d'une Artist");
  let update = req.body;
  ArtistService.updateOneArtist(
    req.params.id,
    update,
    null,
    function (err, value) {
      //
      if (err && err.type_error == "no-found") {
        res.statusCode = 404;
        res.send(err);
      } else if (
        err &&
        (err.type_error == "no-valid" ||
          err.type_error == "validator" ||
          err.type_error == "duplicate")
      ) {
        res.statusCode = 405;
        res.send(err);
      } else if (err && err.type_error == "error-mongo") {
        res.statusCode = 500;
      } else {
        res.statusCode = 200;
        res.send(value);
      }
    }
  );
};

// La fonction permet de modifier plusieurs Artists
module.exports.updateManyArtists = function (req, res) {
  LoggerHttp(req, res);
  req.log.info("Modification de plusieurs Artists");
  var arg = req.query.id;
  if (arg && !Array.isArray(arg)) arg = [arg];
  var updateData = req.body;
  ArtistService.updateManyArtists(
    arg,
    updateData,
    null,
    function (err, value) {
      if (err && err.type_error == "no-found") {
        res.statusCode = 404;
        res.send(err);
      } else if (
        err &&
        (err.type_error == "no-valid" ||
          err.type_error == "validator" ||
          err.type_error == "duplicate")
      ) {
        res.statusCode = 405;
        res.send(err);
      } else if (err && err.type_error == "error-mongo") {
        res.statusCode = 500;
      } else {
        res.statusCode = 200;
        res.send(value);
      }
    }
  );
};

// La fonction permet de supprimer une Artist
module.exports.deleteOneArtist = function (req, res) {
  LoggerHttp(req, res);
  req.log.info("Suppression d'une Artist");
  ArtistService.deleteOneArtist(req.params.id, null, function (err, value) {
    if (err && err.type_error == "no-found") {
      res.statusCode = 404;
      res.send(err);
    } else if (err && err.type_error == "no-valid") {
      res.statusCode = 405;
      res.send(err);
    } else if (err && err.type_error == "error-mongo") {
      res.statusCode = 500;
      res.send(err);
    } else {
      res.statusCode = 200;
      res.send(value);
    }
  });
};

// La fonction permet de supprimer plusieurs Artists
module.exports.deleteManyArtists = function (req, res) {
  LoggerHttp(req, res);
  req.log.info("Suppression de plusieurs Artists");
  var arg = req.query.id;
  if (arg && !Array.isArray(arg)) arg = [arg];
  ArtistService.deleteManyArtists(arg, null, function (err, value) {
    if (err && err.type_error == "no-found") {
      res.statusCode = 404;
      res.send(err);
    } else if (err && err.type_error == "no-valid") {
      res.statusCode = 405;
      res.send(err);
    } else if (err && err.type_error == "error-mongo") {
      res.statusCode = 500;
    } else {
      res.statusCode = 200;
      res.send(value);
    }
  });
};
