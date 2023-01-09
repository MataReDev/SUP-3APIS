const chai = require("chai");
const request = require("supertest");
const app = require("../app");

const expect = chai.expect;

describe("POST /signup",  async () => {
  it("Doit créer un nouvel utilisateur et retourner un token jwt", async (done) => {
    await request(app)
      .post("/signup")
      .send({ email: "user@example.com", pseudo: "user", password: "password", role: "User" })
      .end((err, res) => {
        if (err) return done(err);

        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property("token");

        done();
      });
  });

  it("Doit retourner une erreur 400 si l'email est déjà utilisé", async (done) => {
    await request(app)
      .post("/signup")
      .send({ email: "user@example.com", pseudo: "user", password: "password", role: "user" })
      .end((err, res) => {
        if (err) return done(err);

        expect(res.statusCode).to.equal(400);
        expect(res.body).to.have.property("message", "Email ou pseudo déjà utilisé");

        done();
      });
  });

  it("Doit retourner une erreur 500 si il y a un problème serveur", async (done) => {
    // Création requete sans adresse mail
    await request(app)
      .post("/signup")
      .send({ pseudo: "user", password: "password", role: "user" })
      .end((err, res) => {
        if (err) return done(err);

        expect(res.statusCode).to.equal(500);
        expect(res.body).to.have.property("message", "Erreur serveur");

        done();
      });
  });
});
