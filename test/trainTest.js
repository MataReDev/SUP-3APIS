const chai = require("chai");
const request = require("supertest");

const expect = chai.expect;

describe("Liste de test pour les trains", () => {
  describe("GET /train", () => {
    it("Doit lister tous les train", () => {
      async () => {
        await request
          .get("/train")
          .then((res) => {
            expect(res.statusCode).to.equal(200);
            console.log(res.statusCode);
            console.log(res.body.trains);
          })
          .catch((error) => {
            throw new Error(error);
          });
      };
    });
  });

  describe("GET /train/{id}", () => {
    it("Doit retourner le train correspondant à l'id", () => {
      async () => {
        await request
          .get("/train/YESGO-100")
          .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiYzRiMzI1ZWY2MTQ5NGQxNTBmOTBiIiwicm9sZSI6IkFkbWluIiwicHNldWRvIjoiTWF0YVJlZCIsImVtYWlsIjoiZ291ZGFsbWF0aHlzQGdtYWlsLmNvbSJ9LCJpYXQiOjE2NzMyOTQ4MjcsImV4cCI6MTY3MzI5ODQyN30.4cLHPV-psdYGFM2C95Vbkxc1X4uwPia5MUAOyUw8scI")
          .then((res) => {
            expect(res.statusCode).to.equal(200);
            console.log(res.statusCode);
            console.log(res.body.train);
          })
          .catch((error) => {
            throw new Error(error);
          });
      };
    });
  });

  describe("POST /train", () => {
    it("Doit créer un train avec les valeur passé par le body", () => {
      async () => {
        await request
          .post("/train")
          .send({ 
            id: "YESGO-TEST", 
            label: "Train YESGO de TES", 
            start_station: "63bc6e5c9562e2479a570851", // Gare Paris SL
            end_station: "63bc6ec99562e2479a570855", // Gare Rouen
            time_of_departure: "15:00"
          })
          .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiYzRiMzI1ZWY2MTQ5NGQxNTBmOTBiIiwicm9sZSI6IkFkbWluIiwicHNldWRvIjoiTWF0YVJlZCIsImVtYWlsIjoiZ291ZGFsbWF0aHlzQGdtYWlsLmNvbSJ9LCJpYXQiOjE2NzMyOTQ4MjcsImV4cCI6MTY3MzI5ODQyN30.4cLHPV-psdYGFM2C95Vbkxc1X4uwPia5MUAOyUw8scI")
          .then((res) => {
            expect(res.statusCode).to.equal(200);
            console.log(res.statusCode);
          })
          .catch((error) => {
            throw new Error(error);
          });
      };
    });
  });

  describe("PUT /train/:id", () => {
    it("Doit mettre à jour le train", () =>  {
      async () => {
        await request
        .put("/YESGO-TEST")
        .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiYzRiMzI1ZWY2MTQ5NGQxNTBmOTBiIiwicm9sZSI6IkFkbWluIiwicHNldWRvIjoiTWF0YVJlZCIsImVtYWlsIjoiZ291ZGFsbWF0aHlzQGdtYWlsLmNvbSJ9LCJpYXQiOjE2NzMyOTQ4MjcsImV4cCI6MTY3MzI5ODQyN30.4cLHPV-psdYGFM2C95Vbkxc1X4uwPia5MUAOyUw8scI")
        .send({ 
          id: "YESGO-TES", 
          label: "Train YESGO de TEST", 
          start_station: "63bc6e5c9562e2479a570851", // Gare Paris SL
          end_station: "63bc6ec99562e2479a570855", // Gare Rouen
          time_of_departure: "15:00"
        })
        .then(res => {
          expect(res.statusCode).to.equal(200);
          console.log(res.statusCode);
        })
        .catch(error => {
          throw new Error(error);
        })
      }
    });
  });

  describe("DELETE /train/:id", () => {
    it("Doit supprimer le train", () =>  {
      async () => {
        await request
          .delete("/YESGO-100")
          .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiYzRiMzI1ZWY2MTQ5NGQxNTBmOTBiIiwicm9sZSI6IkFkbWluIiwicHNldWRvIjoiTWF0YVJlZCIsImVtYWlsIjoiZ291ZGFsbWF0aHlzQGdtYWlsLmNvbSJ9LCJpYXQiOjE2NzMyOTQ4MjcsImV4cCI6MTY3MzI5ODQyN30.4cLHPV-psdYGFM2C95Vbkxc1X4uwPia5MUAOyUw8scI")
          .querry({id: 'YESGO-100'})
          .then(res => {
            expect(res.statusCode).to.equal(200);
            console.log(res.statusCode);
          })
          .catch(error => {
            throw new Error(error);
          })
        }
      });
  });
});