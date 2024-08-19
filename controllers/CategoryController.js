const CategoryService = require("../services/CategoryService");
const LoggerHttp = require("../utils/logger").http;

// La fonction permet d'ajouter un Category
module.exports.addOneCategory = function (req, res) {
  LoggerHttp(req, res);
  req.log.info("Création d'un Category");
  var options = {user: req, res}
  CategoryService.addOneCategory(req.body, null, function (err, value) {
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

// La fonction permet d'ajouter plusieurs Categories
module.exports.addManyCategories = function (req, res) {
  req.log.info("Création de plusieurs Categories");
  CategoryService.addManyCategories(req.body, null, function (err, value) {
    if (err) {
      res.statusCode = 405;
      res.send(err);
    } else {
      res.statusCode = 201;
      res.send(value);
    }
  });
};

// La fonction permet de chercher une Category
module.exports.findOneCategoryById = function (req, res) {
  req.log.info("Recherche d'une Category par son id");
  var opts = { populate: req.query.populate };
  CategoryService.findOneCategoryById(req.params.id, opts, function (err, value) {
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

// La fonction permet de chercher plusieurs Categories
module.exports.findManyCategoriesById = function (req, res) {
  LoggerHttp(req, res);
  req.log.info("Recherche de plusieurs Categories", req.query.id);
  var arg = req.query.id;
  if (arg && !Array.isArray(arg)) arg = [arg];
  var opts = { populate: req.query.populate };
  CategoryService.findManyCategoriesById(arg, opts, function (err, value) {
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
module.exports.findOneCategory = function (req, res) {
  LoggerHttp(req, res);
  req.log.info("Recherche d'un Category par un champ autorisé");
  let fields = req.query.fields;
  if (fields && !Array.isArray(fields)) fields = [fields];
  var opts = { populate: req.query.populate };
  CategoryService.findOneCategory(
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
module.exports.findManyCategories = function (req, res) {
  req.log.info("Recherche de plusieurs Categories");
  let page = req.query.page;
  let pageSize = req.query.pageSize;
  let searchValue = req.query.q;
  var opts = { populate: req.query.populate };
  CategoryService.findManyCategories(
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

// La fonction permet de modifier une Category
module.exports.updateOneCategory = function (req, res) {
  LoggerHttp(req, res);
  req.log.info("Modification d'une Category");
  let update = req.body;
  CategoryService.updateOneCategory(
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

// La fonction permet de modifier plusieurs Categories
module.exports.updateManyCategories = function (req, res) {
  LoggerHttp(req, res);
  req.log.info("Modification de plusieurs Categories");
  var arg = req.query.id;
  if (arg && !Array.isArray(arg)) arg = [arg];
  var updateData = req.body;
  CategoryService.updateManyCategories(
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

// La fonction permet de supprimer une Category
module.exports.deleteOneCategory = function (req, res) {
  LoggerHttp(req, res);
  req.log.info("Suppression d'une Category");
  CategoryService.deleteOneCategory(req.params.id, null, function (err, value) {
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

// La fonction permet de supprimer plusieurs Categories
module.exports.deleteManyCategories = function (req, res) {
  LoggerHttp(req, res);
  req.log.info("Suppression de plusieurs Categories");
  var arg = req.query.id;
  if (arg && !Array.isArray(arg)) arg = [arg];
  CategoryService.deleteManyCategories(arg, null, function (err, value) {
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
