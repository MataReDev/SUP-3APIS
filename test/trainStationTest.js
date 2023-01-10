const chai = require("chai");
const request = require("supertest");

const expect = chai.expect;

describe("Liste de test pour les gares", () => {
  describe("GET /trainstation", () => {
    it("Doit lister toutes les gares", () => {
      async () => {
        await request
          .get("/trainstation")
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

  describe("GET /trainstation/:label", () => {
    it("Doit retourner la gare correspondant à son label", () => {
      async () => {
        await request
          .get("/trainstation/Paris SL")
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

  describe("POST /trainstation", () => {
    it("Doit créer une gare avec les valeur passé par le body", () => {
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

  describe("PUT /trainstation/:label", () => {
    it("Doit mettre à jour la gare", () =>  {
      async () => {
        await request
        .put("/YESGO-TEST")
        .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiYzRiMzI1ZWY2MTQ5NGQxNTBmOTBiIiwicm9sZSI6IkFkbWluIiwicHNldWRvIjoiTWF0YVJlZCIsImVtYWlsIjoiZ291ZGFsbWF0aHlzQGdtYWlsLmNvbSJ9LCJpYXQiOjE2NzMyOTQ4MjcsImV4cCI6MTY3MzI5ODQyN30.4cLHPV-psdYGFM2C95Vbkxc1X4uwPia5MUAOyUw8scI")
        .querry()
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

  describe("DELETE /trainstation/:label", () => {
    it("Doit supprimer la gare", () =>  {
      async () => {
        await request
          .delete("/Paris SL")
          .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiYzRiMzI1ZWY2MTQ5NGQxNTBmOTBiIiwicm9sZSI6IkFkbWluIiwicHNldWRvIjoiTWF0YVJlZCIsImVtYWlsIjoiZ291ZGFsbWF0aHlzQGdtYWlsLmNvbSJ9LCJpYXQiOjE2NzMyOTQ4MjcsImV4cCI6MTY3MzI5ODQyN30.4cLHPV-psdYGFM2C95Vbkxc1X4uwPia5MUAOyUw8scI")
          .querry({label: 'Paris SL'})
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