const TrackService = require("../../services/TrackService");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const server = require("./../../server");
let should = chai.should();
const _ = require("lodash");
var tab_id_users = [];
var Tracks = [];

let tracks = [
  {
    name: "melodie",
    imageURL: imgURL,
    duration: "198000",
    type: rap,
    track_id: t00,
  },
  {
    name: "melodie1",
    imageURL: imgURL,
    duration: "198000",
    type: rap,
    track_id: t01,
  },
  {
    name: "melodie2",
    imageURL: imgURL,
    duration: "198000",
    type: rap,
    track_id: t02,
  },
  {
    name: "melodie3",
    imageURL: imgURL,
    duration: "198000",
    type: rap,
    track_id: t03,
  },
];

it("Création des utilisateurs fictif", (done) => {
  UserService.addManyTracks(users, null, function (err, value) {
    tab_id_tracks = _.map(value, "_id");
    done();
  });
});

function rdm_user(tab) {
  let rdm_id = tab[Math.floor(Math.random() * tab.length)];
  return rdm_id;
}

chai.use(chaiHttp);

describe("POST - /Track", () => {
  it("Ajouter unen Track. - S", (done) => {
    chai
      .request(server)
      .post("/Track")
      .send({
        name: "themusic",
        id: rdm_user(tab_id_users),
        imageURL: "imgURL",
        duration: 198000,
        type: music,

      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        Tracks.push(res.body);
        done();
      });
  });
  it("Ajouter une Track incorrecte. (Sans name) - E", (done) => {
    chai
      .request(server)
      .post("/Track")
      .send({
        name: "themusic",
        id: rdm_user(tab_id_users),
        imageURL: "imgURL",
        duration: 198000,
        type: music,

      })
      .end((err, res) => {
        expect(res).to.have.status(405);
        done();
      });
  });
  it("Ajouter une Track incorrect. (Avec une quantité < 0 ) - E", (done) => {
    chai
      .request(server)
      .post("/Track")
      .send({
        name: "themusic1",
        description: "ceci est une description",
        duration: 198000,
        quantity: -3,
        user_id: rdm_user(tab_id_tracks),
      })
      .end((err, res) => {
        expect(res).to.have.status(405);
        done();
      });
  });
  it("Ajouter un article incorrect. (Avec un champ vide) - E", (done) => {
    chai
      .request(server)
      .post("/article")
      .send({
        name: "",
        price: 20,
        quantity: 7,
        user_id: rdm_user(tab_id_tracks),
      })
      .end((err, res) => {
        expect(res).to.have.status(405);
        done();
      });
  });
});

describe("GET - /article/:id", () => {
  it("Chercher une Track correcte. - S", (done) => {
    chai
      .request(server)
      .get("/Track/" + Track[0]._id)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("Chercher une Track incorrecte (avec un id inexistant). - E", (done) => {
    chai
      .request(server)
      .get("/Track/665f18739d3e172be5daf092")
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it("Chercher une Track incorrecte (avec un id invalide). - E", (done) => {
    chai
      .request(server)
      .get("/Track/123")
      .end((err, res) => {
        res.should.have.status(405);
        done();
      });
  });
});

describe("GET - /Tracks", () => {
  it("Chercher plusieurs Tracks. - S", (done) => {
    chai
      .request(server)
      .get("/Tracks")
      .query({ id: _.map(Tracks, "_id") })
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });

  it("Chercher plusieurs Tracks incorrects (avec un id inexistant). - E", (done) => {
    chai
      .request(server)
      .get("/Tracks")
      .query({ id: ["66791a552b38d88d8c6e9ee7", "66791a822b38d88d8c6e9eed"] })
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it("Chercher plusieurs Trackss incorrects (avec un id invalide). - E", (done) => {
    chai
      .request(server)
      .get("/Tracks")
      .query({ id: ["123", "456"] })
      .end((err, res) => {
        res.should.have.status(405);
        done();
      });
  });
});

describe("PUT - /Track", () => {
  it("Modifier un Track. - S", (done) => {
    chai
      .request(server)
      .put("/Track/" + Tracks[0]._id)
      .send({ name: "melomelo" })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("Modifier un Track avec un id invalide. - E", (done) => {
    chai
      .request(server)
      .put("/Track/123456789")
      .send({ name: "themusicx", type: "type" })
      .end((err, res) => {
        res.should.have.status(405);
        done();
      });
  });

  it("Modifier un article avec un id inexistant. - E", (done) => {
    chai
      .request(server)
      .put("/Track/66791a552b38d88d8c6e9ee7")
      .send({ name: "themusicxx", type: "type" })
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it("Modifier un article avec un champ requis vide. - E", (done) => {
    chai
      .request(server)
      .put("/article/" + articles[0]._id)
      .send({ name: "", type: "type" })
      .end((err, res) => {
        res.should.have.status(405);
        done();
      });
  });
});

describe("PUT - /Tracks", () => {
  it("Modifier plusieurs Tracks. - S", (done) => {
    chai
      .request(server)
      .put("/Tracks")
      .query({ id: _.map(Track, "_id") })
      .send({ price: 30 })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("Modifier plusieurs Tracks avec des ids invalides. - E", (done) => {
    chai
      .request(server)
      .put("/Tracks")
      .query({ id: ["267428142", "41452828"] })
      .send({ name: "Yannis" })
      .end((err, res) => {
        res.should.have.status(405);
        done();
      });
  });

  it("Modifier plusieurs articles avec des ids inexistant. - E", (done) => {
    chai
      .request(server)
      .put("/Track")
      .query({ id: ["66791a552b38d88d8c6e9ee7", "667980886db560087464d3a7"] })
      .send({ name: "Nabil" })
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it("Modifier des articles avec un champ requis vide. - E", (done) => {
    chai
      .request(server)
      .put("/Tracks")
      .query({ id: _.map(articles, "_id") })
      .send({ name: "" })
      .end((err, res) => {
        res.should.have.status(405);
        done();
      });
  });
});

describe("DELETE - /Track", () => {
  it("Supprimer une Track. - S", (done) => {
    chai
      .request(server)
      .delete("/article/" + articles[0]._id)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it("Supprimer une Track incorrecte (avec un id inexistant). - E", (done) => {
    chai
      .request(server)
      .delete("/Track/665f18739d3e172be5daf092")
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
  it("Supprimer une Track incorrect (avec un id invalide). - E", (done) => {
    chai
      .request(server)
      .delete("/Track/123")
      .end((err, res) => {
        res.should.have.status(405);
        done();
      });
  });
});

describe("DELETE - /Tracks", () => {
  it("Supprimer plusieurs articles. - S", (done) => {
    chai
      .request(server)
      .delete("/Tracks")
      .query({ id: _.map(articles, "_id") })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it("Supprimer plusieurs Tracks incorrectes (avec un id inexistant). - E", (done) => {
    chai
      .request(server)
      .delete("/Tracks/665f18739d3e172be5daf092&665f18739d3e172be5daf093")
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
  it("Supprimer plusieurs Tracks incorrects (avec un id invalide). - E", (done) => {
    chai
      .request(server)
      .delete("/Tracks")
      .query({ id: ["123", "456"] })
      .end((err, res) => {
        res.should.have.status(405);
        done();
      });
  });
});

it("Suppression des utilisateurs fictif", (done) => {
  UserService.deleteManyUsers(tab_id_users, null, function (err, value) {
    done();
  });
});
