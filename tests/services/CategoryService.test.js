const CategoryService = require("../../services/CategoryService");
const chai = require("chai");
let expect = chai.expect;
const _ = require("lodash");
var id_Category_valid = "";
var tab_id_Categories = [];
var Category = [];

let Categories = [
 {
    name: "rap",
    imageURL: "imgURL",
    category_id: "ObjectId",
  },
  {
    name: "rock",
    imageURL: "imgURL",
    category_id: "ObjectId",
  },
  {
    name: "jazz",
    imageURL: "imgURL",
    category_id: "ObjectId",
  },
  {
    name: "metal",
    imageURL: "imgURL",
    category_id: "ObjectId",
  },
]

it("Création des utilisateurs fictif", (done) => {
  UserCategory.addManyCategories(categories, null, function (err, value) {
    tab_id_categories = _.map(value, "_id");
    done();
  });
});

function rdm_category(tab) {
  let rdm_id = tab[Math.floor(Math.random() * (tab.length - 1))];
  return rdm_id;
}

describe("addOneCategory", () => {
  it("Category correct. - S", (done) => {
    var Category = {
      name: "test",
      imageURL: "ObjectId",
    };
    CategoryService.addOneCategory(Category, null, function (err, value) {
      console.log(err);
      expect(value).to.be.a("object");
      expect(value).to.haveOwnProperty("_id");
      expect(value).to.haveOwnProperty("category_id");
      id_Category_valid = value._id;
      Category.push(value);
      done();
    });
  });
  it("Category incorrect. (Sans name) - E", (done) => {
    var article_no_valid = {
     name: "test",
     imageURL: "ObjectId",
    }
    CategoryService.addOneArticle(
      Category_no_valid,
      null,
      // rdm_user(tab_id_users),
      function (err, value) {
        expect(err).to.haveOwnProperty("msg");
        expect(err).to.haveOwnProperty("fields_with_error").with.lengthOf(1);
        expect(err).to.haveOwnProperty("fields");
        expect(err["fields"]).to.haveOwnProperty("name");
        expect(err["fields"]["name"]).to.equal("Path `name` is required.");
        console.log(err);
        console.log(value);
        done();
      }
    );
  });
});

describe("addManyCategories", () => {
  it("Categories à ajouter, valide. - S", (done) => {
    var Categories_tab = [
      {
       name: "cat0",
      imageURL: "ObjectId",
     
      },
      {
       name: "cat1",
       imageURL: "ObjectId",
      },
      {
      name: "cat2",
      imageURL: "ObjectId",
      
      },
    ];

    CategoryService.addManyCategories(Categories_tab, null, function (err, value) {
      tab_id_Categories = _.map(value, "_id");
      Categorys = [...value, ...tarcks];
      expect(value).lengthOf(3);
      //console.log(value);
      done();
    });
  });
  it("Categories à ajouter, non valide. - E", (done) => {
    var Categories_tab_error = [
      {
        name: "cat0",
      imageURL: "ObjectId",
     
      },
      {
         name: "cat1",
      imageURL: "ObjectId",
      
      },
      {
         name: "cat2",
      imageURL: "ObjectId",
      
      }
    ];

    CategoryService.addManyCategories(
      Categories_tab_error,
      null,
      function (err, value) {
        done();
      }
    );
  });
});

describe("findOneCategoryById", () => {
  it("Chercher un Category existant correct. - S", (done) => {
    console.log(id_Category_valid);
    CategoryService.findOneCategoryById(
      id_Category_valid,
      null,
      function (err, value) {
        //   console.log(err, id_category_valid);
        expect(value).to.be.a("object");
        expect(value).to.haveOwnProperty("imageURL");
        expect(value).to.haveOwnProperty("name");
        done();
      }
    );
  });
  it("Chercher un Category non-existant correct. - E", (done) => {
    CategoryService.findOneCategoryById("100", null, function (err, value) {
      expect(err).to.haveOwnProperty("msg");
      expect(err).to.haveOwnProperty("type_error");
      expect(err["type_error"]).to.equal("no-valid");
      done();
    });
  });
});

describe("findManyCategoriesById", () => {
  it("Chercher des Categories existant correct. - S", (done) => {
    CategoryService.findManyCategoriesById(
      tab_id_Categorys,
      null,
      function (err, value) {
        expect(value).lengthOf(3);
        done();
      }
    );
  });
});

describe("findOneCategory", () => {
  it("Chercher une Category par les champs selectionnées. - S", (done) => {
    CategoryService.findOneCategory(
      ["name", "imageURL"],
      Categories[0].name,
      null,
      function (err, value) {
        expect(value).to.haveOwnProperty("name");
        done();
      }
    );
  });
  it("Chercher une Category sans tableau de champ. - E", (done) => {
    CategoryService.findOneArticle(
      "name",
      Categorys[0].name,
      null,
      function (err, value) {
        expect(err).to.haveOwnProperty("type_error");
        done();
      }
    );
  });
  it("Chercher une Category inexistant. - E", (done) => {
    CategoryService.findOneCategory(
      ["name"],
      "Categories[0].name",
      null,
      function (err, value) {
        expect(err).to.haveOwnProperty("type_error");
        done();
      }
    );
  });
});

describe("findManyCategorys", () => {
  it("Retourne 3 Categories - S", (done) => {
    CategoryService.findManyCategories(null, 3, 1, null, function (err, value) {
      expect(value).to.haveOwnProperty("count");
      expect(value).to.haveOwnProperty("results");
      expect(value["count"]).to.be.equal(4);
      expect(value["results"]).lengthOf(3);
      expect(err).to.be.null;
      done();
    });
  });
  it("Faire une recherche avec 0 résultats correspondant - S", (done) => {
    CategoryService.findManyCategorys(
      "cat0",
      1,
      3,
      null,
      function (err, value) {
        expect(value).to.haveOwnProperty("count");
        expect(value).to.haveOwnProperty("results");
        expect(value["count"]).to.be.equal(1);
        expect(value["results"]).lengthOf(0);
        expect(err).to.be.null;
        done();
      }
    );
  });
  it("Envoie d'une chaine de caractère a la place de la page - E", (done) => {
    CategoryService.findManyCategorys(
      null,
      "cat1",
      3,
      null,
      function (err, value) {
        expect(err).to.haveOwnProperty("type_error");
        expect(err["type_error"]).to.be.equal("no-valid");
        expect(value).to.undefined;
        done();
      }
    );
  });
});

describe("updateOnCategory", () => {
  it("Modifier une Category correct. - S", (done) => {
    CategoryService.updateOneCategory(
      id_Category_valid,
      { name: "cat1", imageURL: "ObjectId" },
      null,
      function (err, value) {
        expect(value).to.be.a("object");
        expect(value).to.haveOwnProperty("name");
        expect(value).to.haveOwnProperty("imageURL");
        expect(value).to.haveOwnProperty("updated_at");
        expect(value["name"]).to.be.equal("cat1");
        expect(value["imageURL"]).to.be.equal("ObjectId");
        done();
      }
    );
  });
  it("Modifier une Category avec id incorrect. - E", (done) => {
    CategoryService.updateOneCategory(
      "1200",
      { name: "cat2", imageURL: "NewObjectId" },
      null,
      function (err, value) {
        expect(err).to.be.a("object");
        expect(err).to.haveOwnProperty("msg");
        expect(err).to.haveOwnProperty("type_error");
        expect(err["type_error"]).to.be.equal("no-valid");
        done();
      }
    );
  });
  it("Modifier une Category avec des champs requis vide. - E", (done) => {
    CategoryService.updateOneCategory(
      id_Category_valid,
      { name: "", imageURL: "NewObjectId" },
      null,
      function (err, value) {
        expect(value).to.be.undefined;
        expect(err).to.haveOwnProperty("msg");
        expect(err).to.haveOwnProperty("fields_with_error").with.lengthOf(1);
        expect(err).to.haveOwnProperty("fields");
        expect(err["fields"]).to.haveOwnProperty("name");
        expect(err["fields"]["name"]).to.equal("Path `name` is required.");
        done();
      }
    );
  });
});

describe("updateManyCategories", () => {
  it("Modifier plusieurs Categories correctement. - S", (done) => {
    CategoryService.updateManyCategories(
      tab_id_Categories,
      { name: "cat2", type: "pop" },
      null,
      function (err, value) {
        expect(value).to.haveOwnProperty("modifiedCount");
        expect(value).to.haveOwnProperty("matchedCount");
        expect(value["matchedCount"]).to.be.equal(tab_id_Categories.length);
        expect(value["modifiedCount"]).to.be.equal(tab_id_Categories.length);
        done();
      }
    );
  });
  it("Modifier plusieurs Categorys avec id incorrect. - E", (done) => {
    CategoryService.updateManyCategories(
      "1200",
      { name: "punk", imageURL: "NewObjectId" },
      null,
      function (err, value) {
        expect(err).to.be.a("object");
        expect(err).to.haveOwnProperty("msg");
        expect(err).to.haveOwnProperty("type_error");
        expect(err["type_error"]).to.be.equal("no-valid");
        done();
      }
    );
  });
  it("Modifier plusieurs Categorys avec des champs requis vide. - E", (done) => {
    CategoryService.updateManyCategories(
      tab_id_Categories,
      { name: "", type: "test" },
      null,
      function (err, value) {
        expect(value).to.be.undefined;
        expect(err).to.haveOwnProperty("msg");
        expect(err).to.haveOwnProperty("fields_with_error").with.lengthOf(1);
        expect(err).to.haveOwnProperty("fields");
        expect(err["fields"]).to.haveOwnProperty("name");
        expect(err["fields"]["name"]).to.equal("Path `name` is required.");
        done();
      }
    );
  });
});

describe("deleteOneCategory", () => {
  it("Supprimer une Category correct. - S", (done) => {
    CategoryService.deleteOneCategory(
      id_Category_valid,
      null,
      function (err, value) {
        //callback
        expect(value).to.be.a("object");
        expect(value).to.haveOwnProperty("imageURL");
        expect(value).to.haveOwnProperty("name");
        done();
      }
    );
  });
  it("Supprimer une Category avec id incorrect. - E", (done) => {
    CategoryService.deleteOneCategory("1200", null, function (err, value) {
      expect(err).to.be.a("object");
      expect(err).to.haveOwnProperty("msg");
      expect(err).to.haveOwnProperty("type_error");
      expect(err["type_error"]).to.be.equal("no-valid");
      done();
    });
  });
  it("Supprimer une Category avec un id inexistant. - E", (done) => {
    CategoryService.deleteOneCategory(
      "665f00c6f64f76ba59361e9f",
      null,
      function (err, value) {
        expect(err).to.be.a("object");
        expect(err).to.haveOwnProperty("msg");
        expect(err).to.haveOwnProperty("type_error");
        expect(err["type_error"]).to.be.equal("no-found");
        done();
      }
    );
  });
});

describe("deleteManyCategories", () => {
  it("Supprimer plusieurs Categories correctements. - S", (done) => {
    CategoryService.deleteManyCategories(
      tab_id_Categorys,
      null,
      function (err, value) {
        expect(value).to.be.a("object");
        expect(value).to.haveOwnProperty("deletedCount");
        expect(value["deletedCount"]).is.equal(tab_id_Categorys.length);
        done();
      }
    );
  });
  it("Supprimer plusieurs Categories avec id incorrect. - E", (done) => {
    CategoryService.deleteManyCategories("1200", null, function (err, value) {
      expect(err).to.be.a("object");
      expect(err).to.haveOwnProperty("msg");
      expect(err).to.haveOwnProperty("type_error");
      expect(err["type_error"]).to.be.equal("no-valid");
      done();
    });
  });
});

it("Suppression des utilisateurs fictifs", (done) => {
  CategoryService.deleteManyCategories(tab_id_users, null, function (err, value) {
    done();
  });
});
