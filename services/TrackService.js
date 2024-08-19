const TrackService = require("../services/TrackService");
const LoggerHttp = require("../utils/logger").http;

// La fonction permet d'ajouter un article
module.exports.addOneTrack = function (req, res) {
  LoggerHttp(req, res);
  req.log.info("Création d'une Track");
  var options = {user: req, res}
  TrackService.addOneTrack(req.body, null, function (err, value) {
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

// La fonction permet d'ajouter plusieurs Tracks
module.exports.addManyTracks = function (req, res) {
  req.log.info("Création de plusieurs Tracks");
  TrackService.addManyTracks(req.body, null, function (err, value) {
    if (err) {
      res.statusCode = 405;
      res.send(err);
    } else {
      res.statusCode = 201;
      res.send(value);
    }
  });
};

// La fonction permet de chercher une Track
module.exports.findOneTrackById = function (req, res) {
  req.log.info("Recherche d'une Track par son id");
  var opts = { populate: req.query.populate };
  TrackService.findOneTrackById(req.params.id, opts, function (err, value) {
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

// La fonction permet de chercher plusieurs Tracks
module.exports.findManyTracksById = function (req, res) {
  LoggerHttp(req, res);
  req.log.info("Recherche de plusieurs Tracks", req.query.id);
  var arg = req.query.id;
  if (arg && !Array.isArray(arg)) arg = [arg];
  var opts = { populate: req.query.populate };
  TrackService.findManyTracksById(arg, opts, function (err, value) {
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
module.exports.findOneTrack = function (req, res) {
  LoggerHttp(req, res);
  req.log.info("Recherche d'un article par un champ autorisé");
  let fields = req.query.fields;
  if (fields && !Array.isArray(fields)) fields = [fields];
  var opts = { populate: req.query.populate };
  TrackService.findOneTrack(
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
module.exports.findManyTracks = function (req, res) {
  req.log.info("Recherche de plusieurs Tracks");
  let page = req.query.page;
  let pageSize = req.query.pageSize;
  let searchValue = req.query.q;
  var opts = { populate: req.query.populate };
  TrackService.findManyTracks(
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

// La fonction permet de modifier une Track
module.exports.updateOneTrack = function (req, res) {
  LoggerHttp(req, res);
  req.log.info("Modification d'une Track");
  let update = req.body;
  TrackService.updateOneTrack(
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

// La fonction permet de modifier plusieurs articles
module.exports.updateManyTracks = function (req, res) {
  LoggerHttp(req, res);
  req.log.info("Modification de plusieurs Tracks");
  var arg = req.query.id;
  if (arg && !Array.isArray(arg)) arg = [arg];
  var updateData = req.body;
  TrackService.updateManyTracks(
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

// La fonction permet de supprimer une Track
module.exports.deleteOneTrack = function (req, res) {
  LoggerHttp(req, res);
  req.log.info("Suppression d'une Track");
  TrackService.deleteOneTrack(req.params.id, null, function (err, value) {
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

// La fonction permet de supprimer plusieurs Tracks
module.exports.deleteManyTracks = function (req, res) {
  LoggerHttp(req, res);
  req.log.info("Suppression de plusieurs Tracks");
  var arg = req.query.id;
  if (arg && !Array.isArray(arg)) arg = [arg];
  TrackService.deleteManyTrackes(arg, null, function (err, value) {
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
