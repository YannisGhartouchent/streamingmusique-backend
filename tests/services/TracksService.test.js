const TrackService = require("../../services/TrackService");
const UserService = require("../../services/UserService");
const chai = require("chai");
let expect = chai.expect;
const _ = require("lodash");
var id_Track_valid = "";
var tab_id_Tracks = [];
var tab_id_users = [];
var Track = [];

let users = [
  {
    user_id: "abcd",
    dayofbirth: "01/06/1999",
    username: "yayagator",
    email: "yayagator@gmail.com",
    password: "12345",
  },
  {
    id_user: "abcdj",
    dayofbirth: "03/04/1996",
    username: "oui2",
    email: "iencli2@gmail.com",
    password: "12345",
  },
  {
    id_user: "abcdje",
    dayofbirth: "09/04/1996",
    username: "oui3",
    email: "iencli3@gmail.com",
    password: "12345",
  },
  {
    id_user: "abcdjl",
    dayofbirth: "05/04/1996",
    username: "oui4",
    email: "iencli4@gmail.com",
    password: "12345",
  },
];

it("Création des utilisateurs fictif", (done) => {
  UserService.addManyUsers(users, null, function (err, value) {
    tab_id_users = _.map(value, "_id");
    done();
  });
});

function rdm_user(tab) {
  let rdm_id = tab[Math.floor(Math.random() * (tab.length - 1))];
  return rdm_id;
}

describe("addOneTrack", () => {
  it("Track correct. - S", (done) => {
    var Track = {
      name: "test",
      imageURL: imgURL,
      type: String,
      duration: 198000,
      user_id: rdm_user(tab_id_users),
    };
    TrackService.addOneTrack(Track, null, function (err, value) {
      console.log(err);
      expect(value).to.be.a("object");
      expect(value).to.haveOwnProperty("_id");
      expect(value).to.haveOwnProperty("user_id");
      id_Track_valid = value._id;
      Track.push(value);
      done();
    });
  });
  it("Track incorrect. (Sans name) - E", (done) => {
    var article_no_valid = {
     name: "test",
      imageURL: imgURL,
      type: String,
      duration: 198000,
      user_id: rdm_user(tab_id_users),
    }
    TrackService.addOneArticle(
      Track_no_valid,
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

describe("addManyTracks", () => {
  it("Tracks à ajouter, valide. - S", (done) => {
    var Tracks_tab = [
      {
       name: "classic",
      imageURL: imgURL,
      type: String,
      duration: 198000,
      user_id: rdm_user(tab_id_users),
      },
      {
        name: "classic1",
      imageURL: imgURL,
      type: String,
      duration: 198000,
      user_id: rdm_user(tab_id_users),
      },
      {
      name: "classic2",
      imageURL: imgURL,
      type: String,
      duration: 198000,
      user_id: rdm_user(tab_id_users),
      },
    ];

    ArticleService.addManyTracks(Tracks_tab, null, function (err, value) {
      tab_id_Tracks = _.map(value, "_id");
      Tracks = [...value, ...tarcks];
      expect(value).lengthOf(3);
      //console.log(value);
      done();
    });
  });
  it("Tracks à ajouter, non valide. - E", (done) => {
    var Tracks_tab_error = [
      {
        name: "classic",
      imageURL: imgURL,
      type: String,
      duration: 198000,
      user_id: rdm_user(tab_id_users),
      },
      {
         name: "classic1",
      imageURL: imgURL,
      type: String,
      duration: 198000,
      user_id: rdm_user(tab_id_users),
      },
      {
         name: "",
      imageURL: imgURL,
      type: String,
      duration: 198000,
      user_id: rdm_user(tab_id_users),
      }
    ];

    TrackService.addManyTracks(
      Tracks_tab_error,
      null,
      function (err, value) {
        done();
      }
    );
  });
});

describe("findOneTrackById", () => {
  it("Chercher un Track existant correct. - S", (done) => {
    console.log(id_Track_valid);
    TrackService.findOneTrackById(
      id_Track_valid,
      null,
      function (err, value) {
        //   console.log(err, id_article_valid);
        expect(value).to.be.a("object");
        expect(value).to.haveOwnProperty("_id");
        expect(value).to.haveOwnProperty("name");
        done();
      }
    );
  });
  it("Chercher un Track non-existant correct. - E", (done) => {
    TrackService.findOneTrackById("100", null, function (err, value) {
      expect(err).to.haveOwnProperty("msg");
      expect(err).to.haveOwnProperty("type_error");
      expect(err["type_error"]).to.equal("no-valid");
      done();
    });
  });
});

describe("findManyTracksById", () => {
  it("Chercher des Tracks existant correct. - S", (done) => {
    TrackService.findManyTracksById(
      tab_id_Tracks,
      null,
      function (err, value) {
        expect(value).lengthOf(3);
        done();
      }
    );
  });
});

describe("findOneTrack", () => {
  it("Chercher une Track par les champs selectionnées. - S", (done) => {
    TrackService.findOneTrack(
      ["name", "type"],
      Tracks[0].name,
      null,
      function (err, value) {
        expect(value).to.haveOwnProperty("name");
        done();
      }
    );
  });
  it("Chercher une Track sans tableau de champ. - E", (done) => {
    TrackService.findOneArticle(
      "name",
      Tracks[0].name,
      null,
      function (err, value) {
        expect(err).to.haveOwnProperty("type_error");
        done();
      }
    );
  });
  it("Chercher une Track inexistant. - E", (done) => {
    TrackService.findOneTrack(
      ["name"],
      "Tracks[0].name",
      null,
      function (err, value) {
        expect(err).to.haveOwnProperty("type_error");
        done();
      }
    );
  });
});

describe("findManyTracks", () => {
  it("Retourne 3 Tracks - S", (done) => {
    TrackService.findManyTracks(null, 3, 1, null, function (err, value) {
      expect(value).to.haveOwnProperty("count");
      expect(value).to.haveOwnProperty("results");
      expect(value["count"]).to.be.equal(4);
      expect(value["results"]).lengthOf(3);
      expect(err).to.be.null;
      done();
    });
  });
  it("Faire une recherche avec 0 résultats correspondant - S", (done) => {
    TrackService.findManyTracks(
      "classic",
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
    TrackService.findManyTracks(
      null,
      "classic1",
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

describe("updateOneArticle", () => {
  it("Modifier une Track correct. - S", (done) => {
    TrackService.updateOneTrack(
      id_Track_valid,
      { name: "classic2", type: "rap" },
      null,
      function (err, value) {
        expect(value).to.be.a("object");
        expect(value).to.haveOwnProperty("_id");
        expect(value).to.haveOwnProperty("name");
        expect(value).to.haveOwnProperty("type");
        expect(value).to.haveOwnProperty("updated_at");
        expect(value["name"]).to.be.equal("classic2");
        expect(value["type"]).to.be.equal("rap");
        done();
      }
    );
  });
  it("Modifier une Track avec id incorrect. - E", (done) => {
    TrackService.updateOneTrack(
      "1200",
      { name: "classic3", duration: 200000 },
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
  it("Modifier une Track avec des champs requis vide. - E", (done) => {
    TrackService.updateOneTrack(
      id_Track_valid,
      { name: "", type: "rock" },
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

describe("updateManyTracks", () => {
  it("Modifier plusieurs Tracks correctement. - S", (done) => {
    TrackService.updateManyTracks(
      tab_id_Tracks,
      { name: "classic3", type: "pop" },
      null,
      function (err, value) {
        expect(value).to.haveOwnProperty("modifiedCount");
        expect(value).to.haveOwnProperty("matchedCount");
        expect(value["matchedCount"]).to.be.equal(tab_id_Tracks.length);
        expect(value["modifiedCount"]).to.be.equal(tab_id_Tracks.length);
        done();
      }
    );
  });
  it("Modifier plusieurs Tracks avec id incorrect. - E", (done) => {
    TrackService.updateManyTracks(
      "1200",
      { name: "banger", type: "kpop" },
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
  it("Modifier plusieurs Tracks avec des champs requis vide. - E", (done) => {
    TrackService.updateManyTracks(
      tab_id_Tracks,
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

describe("deleteOneTrack", () => {
  it("Supprimer une Track correct. - S", (done) => {
    TrackService.deleteOneTrack(
      id_Track_valid,
      null,
      function (err, value) {
        //callback
        expect(value).to.be.a("object");
        expect(value).to.haveOwnProperty("_id");
        expect(value).to.haveOwnProperty("name");
        expect(value).to.haveOwnProperty("duration");
        done();
      }
    );
  });
  it("Supprimer une Track avec id incorrect. - E", (done) => {
    ArticleService.deleteOneArticle("1200", null, function (err, value) {
      expect(err).to.be.a("object");
      expect(err).to.haveOwnProperty("msg");
      expect(err).to.haveOwnProperty("type_error");
      expect(err["type_error"]).to.be.equal("no-valid");
      done();
    });
  });
  it("Supprimer une Track avec un id inexistant. - E", (done) => {
    TrackService.deleteOneTrack(
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

describe("deleteManyTracks", () => {
  it("Supprimer plusieurs Tracks correctements. - S", (done) => {
    TrackService.deleteManyTracks(
      tab_id_Tracks,
      null,
      function (err, value) {
        expect(value).to.be.a("object");
        expect(value).to.haveOwnProperty("deletedCount");
        expect(value["deletedCount"]).is.equal(tab_id_Tracks.length);
        done();
      }
    );
  });
  it("Supprimer plusieurs Tracks avec id incorrect. - E", (done) => {
    TrackService.deleteManyTracks("1200", null, function (err, value) {
      expect(err).to.be.a("object");
      expect(err).to.haveOwnProperty("msg");
      expect(err).to.haveOwnProperty("type_error");
      expect(err["type_error"]).to.be.equal("no-valid");
      done();
    });
  });
});

it("Suppression des utilisateurs fictifs", (done) => {
  UserService.deleteManyUsers(tab_id_users, null, function (err, value) {
    done();
  });
});
