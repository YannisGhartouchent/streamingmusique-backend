const CategoryService = require("../../services/CategoryService");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const server = require("./../../server");
let should = chai.should();
const _ = require("lodash");
var tab_id_categories = [];
var Categories = [];

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
];

it("Création des Categories fictif", (done) => {
  CategoryService.addManyCategories(users, null, function (err, value) {
    tab_id_categories = _.map(value, "_id");
    done();
  });
});

function rdm_category(tab) {
  let rdm_id = tab[Math.floor(Math.random() * tab.length)];
  return rdm_id;
}

chai.use(chaiHttp);

describe("POST - /Category", () => {
  it("Ajouter une Category. - S", (done) => {
    chai
      .request(server)
      .post("/Category")
      .send({
        name: "latino",
        imageURL: "imgURL",
        category_id: "ObjectId",
        })
        
      .end((err, res) => {
        expect(res).to.have.status(201);
        Categories.push(res.body);
        done();
      });
  });
  it("Ajouter une Category incorrecte. (Sans name) - E", (done) => {
    chai
      .request(server)
      .post("/Category")
      .send({
        name: "afro",
        imageURL: "imgURL",
        category_id: "ObjectId",
  
      })
      .end((err, res) => {
        expect(res).to.have.status(405);
        done();
      });
  });

  it("Ajouter un category incorrect. (Avec un champ vide) - E", (done) => {
    chai
      .request(server)
      .post("/category")
      .send({
        name: "",
        imageURL: "imgURL",
        category_id: "ObjectId",
      })
      .end((err, res) => {
        expect(res).to.have.status(405);
        done();
      });
  });
});

describe("GET - /category/:id", () => {
  it("Chercher une category correct. - S", (done) => {
    chai
      .request(server)
      .get("/Category/" + Category[0]._id)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("Chercher une category incorrect (avec un id inexistant). - E", (done) => {
    chai
      .request(server)
      .get("/Category/665f18739d3e172be5daf092")
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it("Chercher une Category incorrecte (avec un id invalide). - E", (done) => {
    chai
      .request(server)
      .get("/Category/154")
      .end((err, res) => {
        res.should.have.status(405);
        done();
      });
  });
});

describe("GET - /Categories", () => {
  it("Chercher plusieurs categories. - S", (done) => {
    chai
      .request(server)
      .get("/Categories")
      .query({ id: _.map(Categories, "_id") })
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });

  it("Chercher plusieurs Categories incorrects (avec un id inexistant). - E", (done) => {
    chai
      .request(server)
      .get("/Categories")
      .query({ id: ["66791a552b38d88d8c6e9ee9", "66791a822b38d88d8c6e9med"] })
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it("Chercher plusieurs Categories incorrects (avec un id invalide). - E", (done) => {
    chai
      .request(server)
      .get("/Categories")
      .query({ id: ["123", "456"] })
      .end((err, res) => {
        res.should.have.status(405);
        done();
      });
  });
});

describe("PUT - /Category", () => {
  it("Modifier une Category. - S", (done) => {
    chai
      .request(server)
      .put("/Category/" + Categories[0]._id)
      .send({name: "electro" })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("Modifier un Category avec un id invalide. - E", (done) => {
    chai
      .request(server)
      .put("/Category/123456784")
      .send({name: "reggae", category_id: "rxx" })
      .end((err, res) => {
        res.should.have.status(405);
        done();
      });
  });

  it("Modifier un category avec un id inexistant. - E", (done) => {
    chai
      .request(server)
      .put("/Category/66791a552b38d88d8c6e9ee7")
      .send({ group_name: "themusicxx", group_id: "gpx" })
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it("Modifier un category avec un champ requis vide. - E", (done) => {
    chai
      .request(server)
      .put("/category/" + categories[0]._id)
      .send({name: "", group_id: "cxx" })
      .end((err, res) => {
        res.should.have.status(405);
        done();
      });
  });
});

describe("PUT - /Categories", () => {
  it("Modifier plusieurs Categories. - S", (done) => {
    chai
      .request(server)
      .put("/Categories")
      .query({ category_id: _.map(Category, "category_id") })
      .send({ name: "soul" })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("Modifier plusieurs categories avec des ids invalides. - E", (done) => {
    chai
      .request(server)
      .put("/Categories")
      .query({ category_id: ["cxxx", "cxxl"] })
      .send({ name: "pop" })
      .end((err, res) => {
        res.should.have.status(405);
        done();
      });
  });

  it("Modifier plusieurs categories avec des ids inexistant. - E", (done) => {
    chai
      .request(server)
      .put("/Categories")
      .query({ id: ["66791a552b38d88d8c6e9ee7", "667980886db560087464d3a7"] })
      .send({ group_name: "ouais c'est greg" })
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });s
  });

  it("Modifier des categories avec un champ requis vide. - E", (done) => {
    chai
      .request(server)
      .put("/Categories")
      .query({ id: _.map(categories, "category_id") })
      .send({ name: "" })
      .end((err, res) => {
        res.should.have.status(405);
        done();
      });
  });
});

describe("DELETE - /Category", () => {
  it("Supprimer un category. - S", (done) => {
    chai
      .request(server)
      .delete("/category/" + categories[0].group_id)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it("Supprimer un category incorrecte (avec un id inexistant). - E", (done) => {
    chai
      .request(server)
      .delete("/Category/665f18739d3e172be5daf093")
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
  it("Supprimer une Category incorrect (avec un id invalide). - E", (done) => {
    chai
      .request(server)
      .delete("/Category/128")
      .end((err, res) => {
        res.should.have.status(405);
        done();
      });
  });
});

describe("DELETE - /Categories", () => {
  it("Supprimer plusieurs articles. - S", (done) => {
    chai
      .request(server)
      .delete("/Categories")
      .query({ category_id: _.map(categories, "_id") })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it("Supprimer plusieurs Categories incorrectes (avec un id inexistant). - E", (done) => {
    chai
      .request(server)
      .delete("/Categories/665f18739d3e172be5daf092&665f18739d3e172be5daf093")
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
  it("Supprimer plusieurs Categories incorrects (avec un id invalide). - E", (done) => {
    chai
      .request(server)
      .delete("/Categories")
      .query({ category_id: ["123", "456"] })
      .end((err, res) => {
        res.should.have.status(405);
        done();
      });
  });
});

it("Suppression des utilisateurs fictif", (done) => {
  CategoryService.deleteManyCategories(tab_id_categories, null, function (err, value) {
    done();
  });
});
