const AlbumService = require("../../services/AlbumService");
const UserService = require("../../services/UserService");
const chai = require("chai");
let expect = chai.expect;
const _ = require("lodash");
var id_Album_valid = "";
var tab_id_Albums = [];
var Album = [];

let albums = [
  {
    album_name: "the album",
    album_id:"alb123",
    date: "19/08/2024",
    duration: "3600000 ", 
    artist_name: "the artist",
    artist_id: "artxx0",
    },
  {
    album_name: "the black album",
    album_id:"albb123",
    date: "20/08/2024",
    duration: "3500000 ", 
    artist_name: "the artist",
    artist_id: "artxx0",
  },
  {
    album_name: "the white album",
    album_id:"albw123",
    date: "21/08/2024",
    duration: "3400000 ", 
    artist_name: "the artist",
    artist_id: "artxx0",
  },
  {
    album_name: "the golden album",
    album_id:"albg123",
    date: "22/08/2024",
    duration: "3300000 ", 
    artist_name: "the artist",
    artist_id: "artxx00",
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

describe("addOneAlbum", () => {
  it("Album correct. - S", (done) => {
    var Album = {
    album_name: "the album",
    album_id:"alb123",
    date: "19/08/2024",
    duration: "3600000 ", 
    artist_name: "the artist",
    artist_id: "artxx0",
    user_id: rdm_user(tab_id_users),
    };
    AlbumService.addOneAlbum(Album, null, function (err, value) {
      console.log(err);
      expect(value).to.be.a("object");
      expect(value).to.haveOwnProperty("_id");
      expect(value).to.haveOwnProperty("user_id");
      id_Album_valid = value._id;
      Album.push(value);
      done();
    });
  });
  it("Album incorrect. (Sans name) - E", (done) => {
    var article_no_valid = {
    album_name: "the bad album",
    album_id:"alb000",
    date: "01/08/2024",
    duration: "3600000 ", 
    artist_name: "the artist",
    artist_id: "artxx0",
    user_id: rdm_user(tab_id_users),
    }
    AlbumService.addOneArticle(
      Album_no_valid,
      null,
      // rdm_user(tab_id_users),
      function (err, value) {
        expect(err).to.haveOwnProperty("msg");
        expect(err).to.haveOwnProperty("fields_with_error").with.lengthOf(1);
        expect(err).to.haveOwnProperty("fields");
        expect(err["fields"]).to.haveOwnProperty("album_name");
        expect(err["fields"]["name"]).to.equal("Path `name` is required.");
        console.log(err);
        console.log(value);
        done();
      }
    );
  });
});

describe("addManyAlbums", () => {
  it("Albums à ajouter, valide. - S", (done) => {
    var Albums_tab = [
      {
       album_name: "the perfect album",
       album_id:"albp123",
       date: "10/08/2024",
       duration: "3600000 ", 
       artist_name: "the artist",
       artist_id: "artxx1",
       user_id: rdm_user(tab_id_users),
      },
      {
       album_name: "the great album",
       album_id:"albgr123",
       date: "11/08/2024",
       duration: "3600000 ", 
       artist_name: "the artist",
       artist_id: "artxx2",
      user_id: rdm_user(tab_id_users),
      },
      {
       album_name: "the sucess album",
       album_id:"albs123",
       date: "12/08/2024",
       duration: "3600000 ", 
       artist_name: "the artist",
       artist_id: "artxx2",
      user_id: rdm_user(tab_id_users),
      },
    ];

      ArticleService.addManyAlbums(Albums_tab, null, function (err, value) {
      tab_id_Albums = _.map(value, "_id");
      Albums = [...value, ...tarcks];
      expect(value).lengthOf(3);
      //console.log(value);
      done();
    });
  });
  it("Albums à ajouter, non valide. - E", (done) => {
    var Albums_tab_error = [
      {
        album_name: "the dog album",
        album_id:"albd123",
        date: "05/08/2024",
        duration: "3600000 ", 
        artist_name: "the artist",
        artist_id: "album0",
        user_id: rdm_user(tab_id_users),
      },
      {
      album_name: "the cat album",
        album_id:"albc123",
        date: "04/08/2024",
        duration: "3600000 ", 
        artist_name: "the artist",
        artist_id: "album1",
      user_id: rdm_user(tab_id_users),
      },
      {
        album_name: "",
        album_id:"albc123",
        date: "04/08/2024",
        duration: "3600000 ", 
        artist_name: "the artist",
        artist_id: "album2",
      user_id: rdm_user(tab_id_users),
      }
    ];

    AlbumService.addManyAlbums(
      Albums_tab_error,
      null,
      function (err, value) {
        done();
      }
    );
  });
});

describe("findOneAlbumById", () => {
  it("Chercher un Album existant correct. - S", (done) => {
    console.log(id_Album_valid);
    AlbumService.findOneAlbumById(
      id_Album_valid,
      null,
      function (err, value) {
        //   console.log(err, id_article_valid);
        expect(value).to.be.a("object");
        expect(value).to.haveOwnProperty("album_id");
        expect(value).to.haveOwnProperty("artist_id");
        expect(value).to.haveOwnProperty("artist_name");
        expect(value).to.haveOwnProperty("album_name");
        expect(value).to.haveOwnProperty("date");
        done();
      }
    );
  });
  it("Chercher un Album non-existant correct. - E", (done) => {
    AlbumService.findOneAlbumById("100", null, function (err, value) {
      expect(err).to.haveOwnProperty("msg");
      expect(err).to.haveOwnProperty("type_error");
      expect(err["type_error"]).to.equal("no-valid");
      done();
    });
  });
});

describe("findManyAlbumsById", () => {
  it("Chercher des Albums existant correct. - S", (done) => {
    AlbumService.findManyAlbumsById(
      tab_id_Albums,
      null,
      function (err, value) {
        expect(value).lengthOf(3);
        done();
      }
    );
  });
});

describe("findOneAlbum", () => {
  it("Chercher une Album par les champs selectionnées. - S", (done) => {
    AlbumService.findOneAlbum(
      ["album_name", "album_id", "date"],
      Albums[0].album_name,
      null,
      function (err, value) {
        expect(value).to.haveOwnProperty("name");
        done();
      }
    );
  });
  it("Chercher une Album sans tableau de champ. - E", (done) => {
    AlbumService.findOneArticle(
      "album_name", "album_id", "date",
      Albums[0].name,
      null,
      function (err, value) {
        expect(err).to.haveOwnProperty("type_error");
        done();
      }
    );
  });
  it("Chercher une Album inexistant. - E", (done) => {
    AlbumService.findOneAlbum(
      ["album_name", "album_id", "date",],
      "Albums[0].album_name","Albums[0].album_id",
      null,
      function (err, value) {
        expect(err).to.haveOwnProperty("type_error");
        done();
      }
    );
  });
});

describe("findManyAlbums", () => {
  it("Retourne 3 Albums - S", (done) => {
    AlbumService.findManyAlbums(null, 3, 1, null, function (err, value) {
      expect(value).to.haveOwnProperty("count");
      expect(value).to.haveOwnProperty("results");
      expect(value["count"]).to.be.equal(4);
      expect(value["results"]).lengthOf(3);
      expect(err).to.be.null;
      done();
    });
  });
  it("Faire une recherche avec 0 résultats correspondant - S", (done) => {
    AlbumService.findManyAlbums(
      "albumclassic",
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
    AlbumService.findManyAlbums(
      null,
      "albumclassic1",
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
  it("Modifier une Album correct. - S", (done) => {
    AlbumService.updateOneAlbum(
      id_Album_valid,
      { album_name: "albumclassic2", album_id: "albcl2" },
      null,
      function (err, value) {
        expect(value).to.be.a("object");
        expect(value).to.haveOwnProperty("album_id");
        expect(value).to.haveOwnProperty("album_name");
        expect(value).to.haveOwnProperty("artist_name");
        expect(value).to.haveOwnProperty("artist_id");
        expect(value).to.haveOwnProperty("updated_at");
        expect(value["album_name"]).to.be.equal("albumclassic2");
        done();
      }
    );
  });
  it("Modifier une Album avec id incorrect. - E", (done) => {
    AlbumService.updateOneAlbum(
      "1200",
      { name: "albumclassic3", duration: 200000 },
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
  it("Modifier une Album avec des champs requis vide. - E", (done) => {
    AlbumService.updateOneAlbum(
      id_Album_valid,
      { album_name: "",  album_id: "albbb" },
      null,
      function (err, value) {
        expect(value).to.be.undefined;
        expect(err).to.haveOwnProperty("msg");
        expect(err).to.haveOwnProperty("fields_with_error").with.lengthOf(1);
        expect(err).to.haveOwnProperty("fields");
        expect(err["fields"]).to.haveOwnProperty("album_name");
        expect(err["fields"]["album_name"]).to.equal("Path `album_name` is required.");
        done();
      }
    );
  });
});

describe("updateManyAlbums", () => {
  it("Modifier plusieurs Albums correctement. - S", (done) => {
    AlbumService.updateManyAlbums(
      tab_id_Albums,
      { name: "albumclassic3", album_id: "albc3" },
      null,
      function (err, value) {
        expect(value).to.haveOwnProperty("modifiedCount");
        expect(value).to.haveOwnProperty("matchedCount");
        expect(value["matchedCount"]).to.be.equal(tab_id_Albums.length);
        expect(value["modifiedCount"]).to.be.equal(tab_id_Albums.length);
        done();
      }
    );
  });
  it("Modifier plusieurs Albums avec id incorrect. - E", (done) => {
    AlbumService.updateManyAlbums(
      "1200",
      { album_name: "the project", album_id: "thepr0" },
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
  it("Modifier plusieurs Albums avec des champs requis vide. - E", (done) => {
    AlbumService.updateManyAlbums(
      tab_id_Albums,
      { album_name: "", album_id: "0123" },
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

describe("deleteOneAlbum", () => {
  it("Supprimer un Album correct. - S", (done) => {
    AlbumService.deleteOneAlbum(
      id_Album_valid,
      null,
      function (err, value) {
        //callback
        expect(value).to.be.a("object");
        expect(value).to.haveOwnProperty("album_id");
        expect(value).to.haveOwnProperty("album_name");
        expect(value).to.haveOwnProperty("artist_id");
        expect(value).to.haveOwnProperty("artist_name");
        expect(value).to.haveOwnProperty("duration");
        done();
      }
    );
  });
  it("Supprimer un Album avec id incorrect. - E", (done) => {
    ArticleService.deleteOneArticle("1200", null, function (err, value) {
      expect(err).to.be.a("object");
      expect(err).to.haveOwnProperty("msg");
      expect(err).to.haveOwnProperty("type_error");
      expect(err["type_error"]).to.be.equal("no-valid");
      done();
    });
  });
  it("Supprimer un Album avec un id inexistant. - E", (done) => {
    AlbumService.deleteOneAlbum(
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

describe("deleteManyAlbums", () => {
  it("Supprimer plusieurs Albums correctements. - S", (done) => {
    AlbumService.deleteManyAlbums(
      tab_id_Albums,
      null,
      function (err, value) {
        expect(value).to.be.a("object");
        expect(value).to.haveOwnProperty("deletedCount");
        expect(value["deletedCount"]).is.equal(tab_id_Albums.length);
        done();
      }
    );
  });
  it("Supprimer plusieurs Albums avec id incorrect. - E", (done) => {
    AlbumService.deleteManyAlbums("1200", null, function (err, value) {
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
