const TchatService = require("../services/TchatService");
const LoggerHttp = require("../utils/logger").http;

// La fonction permet d'ajouter un article
module.exports.addOneTchat = function (req, res) {
  LoggerHttp(req, res);
  req.log.info("Création d'une Tchat");
  var options = {user: req, res}
  TchatService.addOneTchat(req.body, null, function (err, value) {
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

// La fonction permet d'ajouter plusieurs Tchats
module.exports.addManyTchats = function (req, res) {
  req.log.info("Création de plusieurs Tchats");
  TchatService.addManyTchats(req.body, null, function (err, value) {
    if (err) {
      res.statusCode = 405;
      res.send(err);
    } else {
      res.statusCode = 201;
      res.send(value);
    }
  });
};

// La fonction permet de chercher une Tchat
module.exports.findOneTchatById = function (req, res) {
  req.log.info("Recherche d'une Tchat par son id");
  var opts = { populate: req.query.populate };
  TchatService.findOneTchatById(req.params.id, opts, function (err, value) {
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

// La fonction permet de chercher plusieurs Tchats
module.exports.findManyTchatsById = function (req, res) {
  LoggerHttp(req, res);
  req.log.info("Recherche de plusieurs Tchats", req.query.id);
  var arg = req.query.id;
  if (arg && !Array.isArray(arg)) arg = [arg];
  var opts = { populate: req.query.populate };
  TchatService.findManyTchatsById(arg, opts, function (err, value) {
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
module.exports.findOneTchat = function (req, res) {
  LoggerHttp(req, res);
  req.log.info("Recherche d'un article par un champ autorisé");
  let fields = req.query.fields;
  if (fields && !Array.isArray(fields)) fields = [fields];
  var opts = { populate: req.query.populate };
  TchatService.findOneTchat(
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
module.exports.findManyTchats = function (req, res) {
  req.log.info("Recherche de plusieurs Tchats");
  let page = req.query.page;
  let pageSize = req.query.pageSize;
  let searchValue = req.query.q;
  var opts = { populate: req.query.populate };
  TchatService.findManyTchats(
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

// La fonction permet de modifier une Tchat
module.exports.updateOneTchat = function (req, res) {
  LoggerHttp(req, res);
  req.log.info("Modification d'une Tchat");
  let update = req.body;
  TchatService.updateOneTchat(
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
module.exports.updateManyTchats = function (req, res) {
  LoggerHttp(req, res);
  req.log.info("Modification de plusieurs Tchats");
  var arg = req.query.id;
  if (arg && !Array.isArray(arg)) arg = [arg];
  var updateData = req.body;
  TchatService.updateManyTchats(
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

// La fonction permet de supprimer une Tchat
module.exports.deleteOneTchat = function (req, res) {
  LoggerHttp(req, res);
  req.log.info("Suppression d'une Tchat");
  TchatService.deleteOneTchat(req.params.id, null, function (err, value) {
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

// La fonction permet de supprimer plusieurs Tchats
module.exports.deleteManyTchats = function (req, res) {
  LoggerHttp(req, res);
  req.log.info("Suppression de plusieurs Tchats");
  var arg = req.query.id;
  if (arg && !Array.isArray(arg)) arg = [arg];
  TchatService.deleteManyTchates(arg, null, function (err, value) {
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
