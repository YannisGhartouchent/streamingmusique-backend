const TchatService = require("../../services/TchatService");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const server = require("./../../server");
let should = chai.should();
const _ = require("lodash");
var tab_id_tchats = [];
var Tchats = [];

let Tchats = [
  {
    username: "yaya00",
    group_id:  "gp10",
    group_name: "groupmusic",
    member_id: "mb10",
  },
  {
    iusername: "yaya01",
    group_id:  "gp11",
    group_name: "groupmusic1",
    member_id: "mb11",
  },
  {
    username: "yaya02",
    group_id:  "gp12",
    group_name: "groupmusic2",
    member_id: "mb12",
  },
  {
    username: "yaya03",
    group_id:  "gp13",
    group_name: "groupmusic3",
    member_id: "mb13",
  },
];

it("Création des Tracks fictif", (done) => {
  TrackService.addManyTchats(users, null, function (err, value) {
    tab_id_tchats = _.map(value, "_id");
    done();
  });
});

function rdm_track(tab) {
  let rdm_id = tab[Math.floor(Math.random() * tab.length)];
  return rdm_id;
}

chai.use(chaiHttp);

describe("POST - /Tchat", () => {
  it("Ajouter un Tchat. - S", (done) => {
    chai
      .request(server)
      .post("/Tchat")
      .send({
        group_id:  "gp00",
        group_name: "groupmusic0",
        })
        
      .end((err, res) => {
        expect(res).to.have.status(201);
        Tchats.push(res.body);
        done();
      });
  });
  it("Ajouter un Tchat incorrecte. (Sans name) - E", (done) => {
    chai
      .request(server)
      .post("/Tchat")
      .send({
        username: "yaya03",
        group_id:  "gp13",
        group_name: "groupmusic3",
        member_id: "mb13",

      })
      .end((err, res) => {
        expect(res).to.have.status(405);
        done();
      });
  });
  it("Ajouter un Tchat incorrect. (Avec une quantité de membre < 0 ) - E", (done) => {
    chai
      .request(server)
      .post("/Tchat")
      .send({
        username: "yaya03",
        group_id:  "gp13",
        group_name: "groupmusic3",
        member_id: "mb13",
        quantity: -3,
      })
      .end((err, res) => {
        expect(res).to.have.status(405);
        done();
      });
  });
  it("Ajouter un tchat incorrect. (Avec un champ vide) - E", (done) => {
    chai
      .request(server)
      .post("/tchat")
      .send({
        group_id:  "gp13",
        group_name: "",
        member_id: "mb13",
      })
      .end((err, res) => {
        expect(res).to.have.status(405);
        done();
      });
  });
});

describe("GET - /tchat/:id", () => {
  it("Chercher un tchat correct. - S", (done) => {
    chai
      .request(server)
      .get("/Tchat/" + Tchat[0]._id)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("Chercher un tchat incorrect (avec un id inexistant). - E", (done) => {
    chai
      .request(server)
      .get("/Tchat/665f18739d3e172be5daf092")
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it("Chercher une Tchat incorrecte (avec un id invalide). - E", (done) => {
    chai
      .request(server)
      .get("/Tchat/123")
      .end((err, res) => {
        res.should.have.status(405);
        done();
      });
  });
});

describe("GET - /Tchats", () => {
  it("Chercher plusieurs Tracks. - S", (done) => {
    chai
      .request(server)
      .get("/Tchats")
      .query({ id: _.map(Tchats, "_id") })
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });

  it("Chercher plusieurs Tchats incorrects (avec un id inexistant). - E", (done) => {
    chai
      .request(server)
      .get("/Tchats")
      .query({ id: ["66791a552b38d88d8c6e9ee7", "66791a822b38d88d8c6e9eed"] })
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it("Chercher plusieurs Tchats incorrects (avec un id invalide). - E", (done) => {
    chai
      .request(server)
      .get("/Tchats")
      .query({ id: ["123", "456"] })
      .end((err, res) => {
        res.should.have.status(405);
        done();
      });
  });
});

describe("PUT - /Tchat", () => {
  it("Modifier un Tchat. - S", (done) => {
    chai
      .request(server)
      .put("/Tchat/" + Tchats[0]._id)
      .send({ group_name: "groupmusicx" })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("Modifier un Tchat avec un id invalide. - E", (done) => {
    chai
      .request(server)
      .put("/Tchat/123456789")
      .send({ group_name: "themusicx", group_id: "gpx" })
      .end((err, res) => {
        res.should.have.status(405);
        done();
      });
  });

  it("Modifier un tchat avec un id inexistant. - E", (done) => {
    chai
      .request(server)
      .put("/Track/66791a552b38d88d8c6e9ee7")
      .send({ group_name: "themusicxx", group_id: "gpx" })
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it("Modifier un tchat avec un champ requis vide. - E", (done) => {
    chai
      .request(server)
      .put("/tchat/" + tchats[0]._id)
      .send({ group_name: "", group_id: "gpx" })
      .end((err, res) => {
        res.should.have.status(405);
        done();
      });
  });
});

describe("PUT - /Tchats", () => {
  it("Modifier plusieurs Tchats. - S", (done) => {
    chai
      .request(server)
      .put("/Tchats")
      .query({ group_id: _.map(Tchat, "group_id") })
      .send({ username: "yayaz" })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("Modifier plusieurs tchats avec des ids invalides. - E", (done) => {
    chai
      .request(server)
      .put("/Tchats")
      .query({ group_id: ["gpxxx", "gpxxx"] })
      .send({ group_name: "groupmusicxxx" })
      .end((err, res) => {
        res.should.have.status(405);
        done();
      });
  });

  it("Modifier plusieurs tchats avec des ids inexistant. - E", (done) => {
    chai
      .request(server)
      .put("/Tchats")
      .query({ id: ["66791a552b38d88d8c6e9ee7", "667980886db560087464d3a7"] })
      .send({ group_name: "ouais c'est greg" })
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });s
  });

  it("Modifier des tchats avec un champ requis vide. - E", (done) => {
    chai
      .request(server)
      .put("/Tchats")
      .query({ id: _.map(tchats, "group_id") })
      .send({ group_name: "" })
      .end((err, res) => {
        res.should.have.status(405);
        done();
      });
  });
});

describe("DELETE - /Tchat", () => {
  it("Supprimer un tchat. - S", (done) => {
    chai
      .request(server)
      .delete("/tchat/" + tchats[0].group_id)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it("Supprimer un tchat incorrecte (avec un id inexistant). - E", (done) => {
    chai
      .request(server)
      .delete("/Tchat/665f18739d3e172be5daf092")
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
  it("Supprimer une Tchat incorrect (avec un id invalide). - E", (done) => {
    chai
      .request(server)
      .delete("/Tchat/123")
      .end((err, res) => {
        res.should.have.status(405);
        done();
      });
  });
});

describe("DELETE - /Tchats", () => {
  it("Supprimer plusieurs articles. - S", (done) => {
    chai
      .request(server)
      .delete("/Tchats")
      .query({ group_id: _.map(tchats, "_id") })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it("Supprimer plusieurs Tchats incorrectes (avec un id inexistant). - E", (done) => {
    chai
      .request(server)
      .delete("/Tchats/665f18739d3e172be5daf092&665f18739d3e172be5daf093")
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
  it("Supprimer plusieurs Tchats incorrects (avec un id invalide). - E", (done) => {
    chai
      .request(server)
      .delete("/Tchats")
      .query({ group_id: ["123", "456"] })
      .end((err, res) => {
        res.should.have.status(405);
        done();
      });
  });
});

it("Suppression des utilisateurs fictif", (done) => {
  TchatService.deleteManyTchats(tab_id_tchats, null, function (err, value) {
    done();
  });
});
