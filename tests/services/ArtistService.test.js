Artistconst = require("../../services/ArtistService");
const ArtistService = require("../../services/ArtistService");
const chai = require("chai");
let expect = chai.expect;
const _ = require("lodash");
var id_Artist_valid = "";
var tab_id_Artists = [];
var Artist = [];

let artists = [

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

it("Création des utilisateurs fictif", (done) => {
  UserService.addManyArtists(artists, null, function (err, value) {
    tab_id_artists = _.map(value, "_id");
    done();
  });
});

  function rdm_user(tab) {
  let rdm_id = tab[Math.floor(Math.random() * (tab.length - 1))];
  return rdm_id;
}

describe("addOneArtist", () => {
  it("Artist correct. - S", (done) => {
    var Artist = {
      artist_name: "test",
      imageURL: "imgURL",
      artist_id: "45777" ,
      user_id: rdm_user(tab_id_users),
    };
    ArtistService.addOneArtist(Artist, null, function (err, value) {
      console.log(err);
      expect(value).to.be.a("object");
      expect(value).to.haveOwnProperty("_id");
      expect(value).to.haveOwnProperty("artist_id");
      id_Artist_valid = value._id;
      Artist.push(value);
      done();
    });
  });
  it("Artist incorrect. (Sans name) - E", (done) => {
    var article_no_valid = {
      artist_name: "test",
      imageURL: "imgURL",
      artist_id: "45777" ,
      user_id: rdm_user(tab_id_users),
    }
    ArtistService.addOneArticle(
      Artist_no_valid,
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

describe("addManyArtists", () => {
  it("Artists à ajouter, valide. - S", (done) => {
    var Artists_tab = [
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

    ArticleService.addManyArtists(Artists_tab, null, function (err, value) {
      tab_id_Artists = _.map(value, "_id");
      Artists = [...value, ...tarcks];
      expect(value).lengthOf(3);
      //console.log(value);
      done();
    });
  });
  it("Artists à ajouter, non valide. - E", (done) => {
    var Artists_tab_error = [
      {
      artist_name: "artist0",
      imageURL: "imgURL",
      artist_id: "art0" ,
      user_id: rdm_user(tab_id_users),
      },
      {
      artist_name: "artist1",
      imageURL: "imgURL",
      artist_id: "art1" ,
      user_id: rdm_user(tab_id_users),
      },
      {
       artist_name: "",
      imageURL: "imgURL",
      artist_id: "art3" ,
      user_id: rdm_user(tab_id_users),
      user_id: rdm_user(tab_id_users),
      }
    ];

    ArtistService.addManyArtists(
      Artists_tab_error,
      null,
      function (err, value) {
        done();
      }
    );
  });
});

describe("findOneArtistById", () => {
  it("Chercher un Artist existant correct. - S", (done) => {
    console.log(id_Artist_valid);
    ArtistService.findOneArtistById(
      id_Artist_valid,
      null,
      function (err, value) {
        //   console.log(err, id_article_valid);
        expect(value).to.be.a("object");
        expect(value).to.haveOwnProperty("artist_id");
        expect(value).to.haveOwnProperty("artist_name");
        done();
      }
    );
  });
  it("Chercher un Artist non-existant correct. - E", (done) => {
    ArtistService.findOneArtistById("100", null, function (err, value) {
      expect(err).to.haveOwnProperty("msg");
      expect(err).to.haveOwnProperty("type_error");
      expect(err["type_error"]).to.equal("no-valid");
      done();
    });
  });
});

describe("findManyArtistsById", () => {
  it("Chercher des Artists existant correct. - S", (done) => {
    ArtistService.findManyArtistsById(
      tab_id_Artists,
      null,
      function (err, value) {
        expect(value).lengthOf(3);
        done();
      }
    );
  });
});

describe("findOneArtist", () => {
  it("Chercher une Artist par les champs selectionnées. - S", (done) => {
    ArtistService.findOneArtist(
      ["artist_name", "artist_id"],
      Artists[0].artist_name,
      null,
      function (err, value) {
        expect(value).to.haveOwnProperty("artist_name");
        done();
      }
    );
  });
  it("Chercher une Artist sans tableau de champ. - E", (done) => {
    ArtistService.findOneArticle(
      "artist_name",
      Artists[0].artist_name,
      null,
      function (err, value) {
        expect(err).to.haveOwnProperty("type_error");
        done();
      }
    );
  });
  it("Chercher une Artist inexistant. - E", (done) => {
    ArtistService.findOneArtist(
      ["artist_name"],
      "Artists[0].artist_name",
      null,
      function (err, value) {
        expect(err).to.haveOwnProperty("type_error");
        done();
      }
    );
  });
});

describe("findManyArtists", () => {
  it("Retourne 3 Artists - S", (done) => {
    ArtistService.findManyArtists(null, 3, 1, null, function (err, value) {
      expect(value).to.haveOwnProperty("count");
      expect(value).to.haveOwnProperty("results");
      expect(value["count"]).to.be.equal(4);
      expect(value["results"]).lengthOf(3);
      expect(err).to.be.null;
      done();
    });
  });
  it("Faire une recherche avec 0 résultats correspondant - S", (done) => {
    ArtistService.findManyArtists(
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
    ArtistService.findManyArtists(
      null,
      "artist1",
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
  it("Modifier une Artist correct. - S", (done) => {
    ArtistService.updateOneArtist(
      id_Artist_valid,
      { name: "artist2" },
      null,
      function (err, value) {
        expect(value).to.be.a("object");
        expect(value).to.haveOwnProperty("artist_id");
        expect(value).to.haveOwnProperty("updated_at");
        expect(value["name"]).to.be.equal("artist2");
        done();
      }
    );
  });
  it("Modifier une Artist avec id incorrect. - E", (done) => {
    ArtistService.updateOneArtist(
      "1200",
      { artist_name: "artist3", artist_id: "400"  },
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
  it("Modifier une Artist avec des champs requis vide. - E", (done) => {
    ArtistService.updateOneArtist(
      id_Artist_valid,
      { artist_name: "", artist_id: "rock" },
      null,
      function (err, value) {
        expect(value).to.be.undefined;
        expect(err).to.haveOwnProperty("msg");
        expect(err).to.haveOwnProperty("fields_with_error").with.lengthOf(1);
        expect(err).to.haveOwnProperty("fields");
        expect(err["fields"]).to.haveOwnProperty("artist_name");
        expect(err["fields"]["artist_name"]).to.equal("Path `artist_name` is required.");
        done();
      }
    );
  });
});

describe("updateManyArtists", () => {
  it("Modifier plusieurs Artists correctement. - S", (done) => {
    ArtistService.updateManyArtists(
      tab_id_Artists,
      { name: "artist3", artist_id: "410" },
      null,
      function (err, value) {
        expect(value).to.haveOwnProperty("modifiedCount");
        expect(value).to.haveOwnProperty("matchedCount");
        expect(value["matchedCount"]).to.be.equal(tab_id_Artists.length);
        expect(value["modifiedCount"]).to.be.equal(tab_id_Artists.length);
        done();
      }
    );
  });
  it("Modifier plusieurs Artists avec id incorrect. - E", (done) => {
    ArtistService.updateManyArtists(
      "1200",
      { artist_name: "lartist", artist_id: "lartist0" },
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
  it("Modifier plusieurs Artists avec des champs requis vide. - E", (done) => {
    ArtistService.updateManyArtists(
      tab_id_Artists,
      { name: "", artist_id: "art0101" },
      null,
      function (err, value) {
        expect(value).to.be.undefined;
        expect(err).to.haveOwnProperty("msg");
        expect(err).to.haveOwnProperty("fields_with_error").with.lengthOf(1);
        expect(err).to.haveOwnProperty("fields");
        expect(err["fields"]).to.haveOwnProperty("artist_name");
        expect(err["fields"]["artist_name"]).to.equal("Path `artist_name` is required.");
        done();
      }
    );
  });
});

describe("deleteOneArtist", () => {
  it("Supprimer une Artist correct. - S", (done) => {
    ArtistService.deleteOneArtist(
      id_Artist_valid,
      null,
      function (err, value) {
        //callback
        expect(value).to.be.a("object");
        expect(value).to.haveOwnProperty("artist_id");
        expect(value).to.haveOwnProperty("artist_name");
        done();
      }
    );
  });
  it("Supprimer une Artist avec id incorrect. - E", (done) => {
    ArticleService.deleteOneArticle("1200", null, function (err, value) {
      expect(err).to.be.a("object");
      expect(err).to.haveOwnProperty("msg");
      expect(err).to.haveOwnProperty("type_error");
      expect(err["type_error"]).to.be.equal("no-valid");
      done();
    });
  });
  it("Supprimer une Artist avec un id inexistant. - E", (done) => {
    ArtistService.deleteOneArtist(
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

describe("deleteManyArtists", () => {
  it("Supprimer plusieurs Artists correctements. - S", (done) => {
    ArtistService.deleteManyArtists(
      tab_id_Artists,
      null,
      function (err, value) {
        expect(value).to.be.a("object");
        expect(value).to.haveOwnProperty("deletedCount");
        expect(value["deletedCount"]).is.equal(tab_id_Artists.length);
        done();
      }
    );
  });
  it("Supprimer plusieurs Artists avec id incorrect. - E", (done) => {
    ArtistService.deleteManyArtists("1200", null, function (err, value) {
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
