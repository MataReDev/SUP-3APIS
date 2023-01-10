const chai = require("chai");
const request = require("supertest");

const expect = chai.expect;

describe("POST /ticket/book", () => {
  it("Doit créer un nouveau ticket de train", () => {
    async () => {
      await request
        .post("/book")
        .send({
          pseudo: "MataRed",
          train: "YESGO-100",
        })
        .then((res) => {
          expect(res.statusCode).to.equal(200);
          console.log(res.statusCode);
          console.log(res.body.ticket);
        })
        .catch((error) => {
          throw new Error(error);
        });
    };
  });

  it("Doit renvoyer une 400 si le pseudo n'existe pas", () => {
    async () => {
      await request
        .post("/book")
        .send({
          pseudo: "InvalidUser",
          train: "YESGO-100",
        })
        .then((res) => {
          expect(res.statusCode).to.equal(400);
          console.log(res.statusCode);
        })
        .catch((error) => {
          throw new Error(error);
        });
    };
  });

  it("Doit renvoyer une 400 si le train n'existe pas", () => {
    async () => {
      await request
        .post("/book")
        .send({
          pseudo: "MataRed",
          train: "YESGO-Invalid",
        })
        .then((res) => {
          expect(res.statusCode).to.equal(400);
          console.log(res.statusCode);
        })
        .catch((error) => {
          throw new Error(error);
        });
    };
  });
});

describe("POST /ticket/validate", () => {
  it("Doit créer un nouveau ticket de train", () => {
    async () => {
      await request
        .put("/validate")
        .send({
            isValidate: true
        })
        .query({pseudo: "MataRed", train: "YESGO-100"})
        .then((res) => {
          expect(res.statusCode).to.equal(200);
          console.log(res.statusCode);
          console.log(res.body.ticket);
        })
        .catch((error) => {
          throw new Error(error);
        });
    };
  });

  it("Doit renvoyer une 400 si le pseudo n'existe pas", () => {
    async () => {
      await request
        .post("/book")
        .query({pseudo: "InvalidPseudo", train: "YESGO-100"})
        .then((res) => {
          expect(res.statusCode).to.equal(400);
          console.log(res.statusCode);
        })
        .catch((error) => {
          throw new Error(error);
        });
    };
  });
});
