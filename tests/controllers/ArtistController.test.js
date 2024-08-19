const ArtistService = require("../../services/ArtistService");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const server = require("./../../server");
let should = chai.should();
const _ = require("lodash");
var tab_id_artists = [];
var Artists = [];

let Artists = [
  {
    artist_name: "Yayalamenace",
    imageURL: "imgURL",
    artist_id: "ObjectId",
  },
  {
    artist_name: "Yayalameumeu",
    imageURL: "imgURL",
    artist_id: "ObjectId",
  },
  {
    artist_name: "Yayalamala",
    imageURL: "imgURL",
    artist_id: "ObjectId",
  },
  {
    artist_name: "Yayalamelo",
    imageURL: "imgURL",
    artist_id: "ObjectId",
  },
];

it("Création d' Artists fictifs", (done) => {
  ArtistService.addManyArtists(artists, null, function (err, value) {
    tab_id_artists = _.map(value, "_id");
    done();
  });
});

function rdm_track(tab) {
  let rdm_id = tab[Math.floor(Math.random() * tab.length)];
  return rdm_id;
}

chai.use(chaiHttp);

describe("POST - /Artist", () => {
  it("Ajouter un Artist. - S", (done) => {
    chai
      .request(server)
      .post("/Artist")
      .send({
        
        artist_id:  "art1570",
        artist_name: "artistman",
        })
        
      .end((err, res) => {
        expect(res).to.have.status(201);
        Artists.push(res.body);
        done();
      });
  });
  it("Ajouter un Artist incorrecte. (Sans name) - E", (done) => {
    chai
      .request(server)
      .post("/Artist")
      .send({
        artist_id:  "art157x",
      })
      .end((err, res) => {
        expect(res).to.have.status(405);
        done();
      });
  });
  it("Ajouter un Artist incorrect. (Avec une quantité de membre < 0 ) - E", (done) => {
    chai
      .request(server)
      .post("/Artist")
      .send({
        artist_id:  "art1571",
        artist_name: "artistman1",
        quantity: -3,
      })
      .end((err, res) => {
        expect(res).to.have.status(405);
        done();
      });
  });
  it("Ajouter un artist incorrect. (Avec un champ vide) - E", (done) => {
    chai
      .request(server)
      .post("/artist")
      .send({
         artist_id:  "art1571x",
        artist_name: "",
      })
      .end((err, res) => {
        expect(res).to.have.status(405);
        done();
      });
  });
});

describe("GET - /artist/:id", () => {
  it("Chercher un artist correct. - S", (done) => {
    chai
      .request(server)
      .get("/Artist/" + Artist[0]._id)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("Chercher un artist incorrect (avec un id inexistant). - E", (done) => {
    chai
      .request(server)
      .get("/Artist/665f18739d3e171be5daf092")
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it("Chercher une Artist incorrecte (avec un id invalide). - E", (done) => {
    chai
      .request(server)
      .get("/Artist/1570")
      .end((err, res) => {
        res.should.have.status(405);
        done();
      });
  });
});

describe("GET - /Artists", () => {
  it("Chercher plusieurs Tracks. - S", (done) => {
    chai
      .request(server)
      .get("/Artists")
      .query({ id: _.map(Artists, "_id") })
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });

  it("Chercher plusieurs Artists incorrects (avec un id inexistant). - E", (done) => {
    chai
      .request(server)
      .get("/Artists")
      .query({ id: ["66791a552b38d81d8c6e9ee7", "66791a822b38d81d8c6e9eed"] })
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it("Chercher plusieurs Artists incorrects (avec un id invalide). - E", (done) => {
    chai
      .request(server)
      .get("/Artists")
      .query({ id: ["457", "458"] })
      .end((err, res) => {
        res.should.have.status(405);
        done();
      });
  });
});

describe("PUT - /Artist", () => {
  it("Modifier un Artist. - S", (done) => {
    chai
      .request(server)
      .put("/Artist/" + Artists[0]._id)
      .send({ artist_name: "artistmanx" })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("Modifier un Artist avec un id invalide. - E", (done) => {
    chai
      .request(server)
      .put("/Artist/123456789")
      .send({ artist_name: "theartistx", artist_id: "art1x" })
      .end((err, res) => {
        res.should.have.status(405);
        done();
      });
  });

  it("Modifier un artist avec un id inexistant. - E", (done) => {
    chai
      .request(server)
      .put("/Track/66791a552b31d88d8c6e9ee4")
      .send({ artist_name:"theartistxx", artist_id: "art1xx" })
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it("Modifier un artist avec un champ requis vide. - E", (done) => {
    chai
      .request(server)
      .put("/artist/" + artists[0]._id)
      .send({ artist_name: "", artist_id: "157x" })
      .end((err, res) => {
        res.should.have.status(405);
        done();
      });
  });
});

describe("PUT - /Artists", () => {
  it("Modifier plusieurs Artists. - S", (done) => {
    chai
      .request(server)
      .put("/Artists")
      .query({ artist_id: _.map })
      .send({ artist_name: "theartizt" })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("Modifier plusieurs artists avec des ids invalides. - E", (done) => {
    chai
      .request(server)
      .put("/Artists")
      .query({ artist_id: ["45700", "45701"] })
      .send({ artist_name: "theartist" })
      .end((err, res) => {
        res.should.have.status(405);
        done();
      });
  });

  it("Modifier plusieurs artists avec des ids inexistant. - E", (done) => {
    chai
      .request(server)
      .put("/Artists")
      .query({ artist_id: ["16791a552b38d88d8c6e9ee7", "267980886db560087464d3a7"] })
      .send({ artist_name: "ouais c'est artiste" })
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });s
  });

  it("Modifier des artists avec un champ requis vide. - E", (done) => {
    chai
      .request(server)
      .put("/Artists")
      .query({ id: _.map(artists, "group_id") })
      .send({ group_name: "" })
      .end((err, res) => {
        res.should.have.status(405);
        done();
      });
  });
});

describe("DELETE - /Artist", () => {
  it("Supprimer un artist. - S", (done) => {
    chai
      .request(server)
      .delete("/artist/" + artists[0].group_id)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it("Supprimer un artist incorrecte (avec un id inexistant). - E", (done) => {
    chai
      .request(server)
      .delete("/Artist/165f18739d3e172be5daf091")
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
  it("Supprimer une Artist incorrect (avec un id invalide). - E", (done) => {
    chai
      .request(server)
      .delete("/Artist/457")
      .end((err, res) => {
        res.should.have.status(405);
        done();
      });
  });
});

describe("DELETE - /Artists", () => {
  it("Supprimer plusieurs articles. - S", (done) => {
    chai
      .request(server)
      .delete("/Artists")
      .query({ group_id: _.map(artists, "_id") })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it("Supprimer plusieurs Artists incorrectes (avec un id inexistant). - E", (done) => {
    chai
      .request(server)
      .delete("/Artists/165f18739d3e172be5daf092&665f18739d3e172be5daf091")
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
  it("Supprimer plusieurs Artists incorrects (avec un id invalide). - E", (done) => {
    chai
      .request(server)
      .delete("/Artists")
      .query({ group_id: ["457", "456"] })
      .end((err, res) => {
        res.should.have.status(405);
        done();
      });
  });
});

it("Suppression des utilisateurs fictif", (done) => {
  ArtistService.deleteManyArtists(tab_id_artists, null, function (err, value) {
    done();
  });
});
