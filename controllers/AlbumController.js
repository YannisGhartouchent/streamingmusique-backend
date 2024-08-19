AlbumService = require("../services/AlbumService");
const LoggerHttp = require("../utils/logger").http;

// La fonction permet d'ajouter un Album
module.exports.addOneAlbum = function (req, res) {
  LoggerHttp(req, res);
  req.log.info("Création d'un Album");
  var options = {user: req, res}
  AlbumService.addOneAlbum(req.body, null, function (err, value) {
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

// La fonction permet d'ajouter plusieurs Albums
module.exports.addManyAlbums = function (req, res) {
  req.log.info("Création de plusieurs Albums");
  AlbumService.addManyAlbums(req.body, null, function (err, value) {
    if (err) {
      res.statusCode = 405;
      res.send(err);
    } else {
      res.statusCode = 201;
      res.send(value);
    }
  });
};

// La fonction permet de chercher une Album
module.exports.findOneAlbumById = function (req, res) {
  req.log.info("Recherche d'un Album par son id");
  var opts = { populate: req.query.populate };
  AlbumService.findOneAlbumById(req.params.id, opts, function (err, value) {
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

// La fonction permet de chercher plusieurs Albums
module.exports.findManyAlbumsById = function (req, res) {
  LoggerHttp(req, res);
  req.log.info("Recherche de plusieurs Albums", req.query.id);
  var arg = req.query.id;
  if (arg && !Array.isArray(arg)) arg = [arg];
  var opts = { populate: req.query.populate };
  AlbumService.findManyAlbumsById(arg, opts, function (err, value) {
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
module.exports.findOneAlbum = function (req, res) {
  LoggerHttp(req, res);
  req.log.info("Recherche d'un Album par un champ autorisé");
  let fields = req.query.fields;
  if (fields && !Array.isArray(fields)) fields = [fields];
  var opts = { populate: req.query.populate };
  AlbumService.findOneAlbum(
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
module.exports.findManyAlbums = function (req, res) {
  req.log.info("Recherche de plusieurs Albums");
  let page = req.query.page;
  let pageSize = req.query.pageSize;
  let searchValue = req.query.q;
  var opts = { populate: req.query.populate };
  AlbumService.findManyAlbums(
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

// La fonction permet de modifier une Album
module.exports.updateOneAlbum = function (req, res) {
  LoggerHttp(req, res);
  req.log.info("Modification d'une Album");
  let update = req.body;
  AlbumService.updateOneAlbum(
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

// La fonction permet de modifier plusieurs Albums
module.exports.updateManyAlbums = function (req, res) {
  LoggerHttp(req, res);
  req.log.info("Modification de plusieurs Albums");
  var arg = req.query.id;
  if (arg && !Array.isArray(arg)) arg = [arg];
  var updateData = req.body;
  AlbumService.updateManyAlbums(
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

// La fonction permet de supprimer une Album
module.exports.deleteOneAlbum = function (req, res) {
  LoggerHttp(req, res);
  req.log.info("Suppression d'un Album");
  AlbumService.deleteOneAlbum(req.params.id, null, function (err, value) {
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

// La fonction permet de supprimer plusieurs Albums
module.exports.deleteManyAlbums = function (req, res) {
  LoggerHttp(req, res);
  req.log.info("Suppression de plusieurs Albums");
  var arg = req.query.id;
  if (arg && !Array.isArray(arg)) arg = [arg];
  AlbumService.deleteManyAlbums(arg, null, function (err, value) {
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
