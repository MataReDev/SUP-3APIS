const chai = require("chai");
const request = require("supertest");

const expect = chai.expect;

describe("POST /user/signup",  () => {
  it("Doit créer un nouvel utilisateur et retourner un token jwt", () =>  {
    async () => {
      await request
        .post("/signup")
        .send({ 
          email: "user@example.com", 
          pseudo: "user", 
          password: "password", 
          role: "User" 
        })
        .then(res => {
          expect(res.statusCode).to.equal(400);
          console.log(res.statusCode);
          console.log(res.body.token);
        })
        .catch(error => {
          throw new Error(error);
      })
    }
  });

  it("Doit retourner une erreur 400 si l'email est déjà utilisé", () =>  {
    async () => {
      await request
        .post("/signup")
        .send({ 
          email: "user@example.com", 
          pseudo: "user", 
          password: "password", 
          role: "user" 
        })
        .then(res => {
          expect(res.statusCode).to.equal(400);
          console.log(res.statusCode);
        })
        .catch(error => {
          throw new Error(error);
      })
    }
  });

  it("Doit retourner une erreur 500 si il y a un problème serveur", () =>  {
    async () => {
    await request
      .post("/signup")
      .send({ 
        pseudo: "user", 
        password: "password", 
        role: "user" 
      })
      .then(res => {
        expect(res.statusCode).to.equal(400);
        console.log(res.statusCode);
      })
      .catch(error => {
        throw new Error(error);
      })
    }
  });
});

describe("POST /user/login", () => {
  it("Doit retourner un token JWT", () =>  {
    async () => {
      await request
        .post("/login")
        .send({ 
          email: "test@example.com", 
          password: "password" 
        })
        .then(res => {
          expect(res.statusCode).to.equal(200);
          console.log(res.statusCode);
          console.log(res.body.token);
        })
        .catch(error => {
          throw new Error(error);
        })
      }
    });

  it("Doit retourner une erreur si aucune email ne correspond", () =>  {
    async () => {
      await request
        .post("/login")
        .send({ email: "invalid@example.com", password: "password" })
        .then(res => {
          expect(res.statusCode).to.equal(500);
          console.log(res.statusCode);
        })
        .catch(error => {
          throw new Error(error);
        })
    }
  });

  it("Doit retourner une erreur 400 si le mot passe est mauvais", () =>  {
    async () => {
      await request
        .post("/login")
        .send({ email: "test@example.com", password: "invalid" })
        .then(res => {
          expect(res.statusCode).to.equal(400);
          console.log(res.statusCode);
        })
        .catch(error => {
          throw new Error(error);
        })
    }
  });
});

describe("GET /user/:pseudo", () => {
  it("Doit retourner l'utilisateur", () =>  {
    async () => {
      await request
      .get("/testuser")
      .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiYzRiMzI1ZWY2MTQ5NGQxNTBmOTBiIiwicm9sZSI6IkFkbWluIiwicHNldWRvIjoiTWF0YVJlZCIsImVtYWlsIjoiZ291ZGFsbWF0aHlzQGdtYWlsLmNvbSJ9LCJpYXQiOjE2NzMyOTQ4MjcsImV4cCI6MTY3MzI5ODQyN30.4cLHPV-psdYGFM2C95Vbkxc1X4uwPia5MUAOyUw8scI")
      .then(res => {
        expect(res.statusCode).to.equal(200);
        console.log(res.statusCode);
      })
      .catch(error => {
        throw new Error(error);
      })
    }
  });

  it("Doit retourner une erreur 404 si l'utilisateur n'existe pas", () =>  {
    async () => {
      await request
        .get("/invaliduser")
        .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiYzRiMzI1ZWY2MTQ5NGQxNTBmOTBiIiwicm9sZSI6IkFkbWluIiwicHNldWRvIjoiTWF0YVJlZCIsImVtYWlsIjoiZ291ZGFsbWF0aHlzQGdtYWlsLmNvbSJ9LCJpYXQiOjE2NzMyOTQ4MjcsImV4cCI6MTY3MzI5ODQyN30.4cLHPV-psdYGFM2C95Vbkxc1X4uwPia5MUAOyUw8scI")
        .then(res => {
          expect(res.statusCode).to.equal(404);
          console.log(res.statusCode);
        })
        .catch(error => {
          throw new Error(error);
        })
      }
    });

  it("Doit retourner une erreur 401 si l'utilisateur n'est pas authentifié", () =>  {
    async () => {
      await request
      .get("/testuser")
      .then(res => {
        expect(res.statusCode).to.equal(401);
        console.log(res.statusCode);
      })
      .catch(error => {
        throw new Error(error);
      })
    }
  });

  it("Doit retourner une erreur 401 si l'utilisateur n'est pas acrédité", () =>  {
    async () => {
      await request
      .get("/otheruser")
      .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiYzRiMzI1ZWY2MTQ5NGQxNTBmOTBiIiwicm9sZSI6IkFkbWluIiwicHNldWRvIjoiTWF0YVJlZCIsImVtYWlsIjoiZ291ZGFsbWF0aHlzQGdtYWlsLmNvbSJ9LCJpYXQiOjE2NzMyOTQ4MjcsImV4cCI6MTY3MzI5ODQyN30.4cLHPV-psdYGFM2C95Vbkxc1X4uwPia5MUAOyUw8scI")
      .then(res => {
        expect(res.statusCode).to.equal(401);
        console.log(res.statusCode);
      })
      .catch(error => {
        throw new Error(error);
      })
    }
  });
});

describe("PUT /user/:pseudo", () => {
  it("Doit mettre à jour l'utilisateur", () =>  {
    async () => {
      await request
      .put("/testuser")
      .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiYzRiMzI1ZWY2MTQ5NGQxNTBmOTBiIiwicm9sZSI6IkFkbWluIiwicHNldWRvIjoiTWF0YVJlZCIsImVtYWlsIjoiZ291ZGFsbWF0aHlzQGdtYWlsLmNvbSJ9LCJpYXQiOjE2NzMyOTQ4MjcsImV4cCI6MTY3MzI5ODQyN30.4cLHPV-psdYGFM2C95Vbkxc1X4uwPia5MUAOyUw8scI")
      .send({ email: "test@example.com", password: "newpassword" })
      .then(res => {
        expect(res.statusCode).to.equal(200);
        console.log(res.statusCode);
      })
      .catch(error => {
        throw new Error(error);
      })
    }
  });

  it("Doit retourner une erreur 404 si l'utilisateur n'existe pas", () =>  {
    async () => {
      await request
      .put("/invaliduser")
      .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiYzRiMzI1ZWY2MTQ5NGQxNTBmOTBiIiwicm9sZSI6IkFkbWluIiwicHNldWRvIjoiTWF0YVJlZCIsImVtYWlsIjoiZ291ZGFsbWF0aHlzQGdtYWlsLmNvbSJ9LCJpYXQiOjE2NzMyOTQ4MjcsImV4cCI6MTY3MzI5ODQyN30.4cLHPV-psdYGFM2C95Vbkxc1X4uwPia5MUAOyUw8scI")
      .send({ email: "test@example.com", password: "newpassword" })
      .then(res => {
        expect(res.statusCode).to.equal(404);
        console.log(res.statusCode);
      })
      .catch(error => {
        throw new Error(error);
      })
    }
  });

  it("Doit retourner une erreur 401 si l'utilisateur n'est pas authentifié", () =>  {
    async () => {
      await request
      .put("/testuser")
      .send({ email: "test@example.com", password: "newpassword" })
      .then(res => {
        expect(res.statusCode).to.equal(401);
        console.log(res.statusCode);
      })
      .catch(error => {
        throw new Error(error);
      })
    }
  });

  it("Doit retourner une erreur 401 si l'utilisateur n'est pas acrédité", () =>  {
    async () => {
      await request
        .put("/otheruser")
        .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiYzRiMzI1ZWY2MTQ5NGQxNTBmOTBiIiwicm9sZSI6IkFkbWluIiwicHNldWRvIjoiTWF0YVJlZCIsImVtYWlsIjoiZ291ZGFsbWF0aHlzQGdtYWlsLmNvbSJ9LCJpYXQiOjE2NzMyOTQ4MjcsImV4cCI6MTY3MzI5ODQyN30.4cLHPV-psdYGFM2C95Vbkxc1X4uwPia5MUAOyUw8scI")
        .then(res => {
          expect(res.statusCode).to.equal(401);
          console.log(res.statusCode);
        })
        .catch(error => {
          throw new Error(error);
        })
    }
  });
});

describe("DELETE /user/:pseudo", () => {
  it("Doit supprimer l'utilisateur", () =>  {
    async () => {
      await request
        .delete("/testuser")
        .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiYzRiMzI1ZWY2MTQ5NGQxNTBmOTBiIiwicm9sZSI6IkFkbWluIiwicHNldWRvIjoiTWF0YVJlZCIsImVtYWlsIjoiZ291ZGFsbWF0aHlzQGdtYWlsLmNvbSJ9LCJpYXQiOjE2NzMyOTQ4MjcsImV4cCI6MTY3MzI5ODQyN30.4cLHPV-psdYGFM2C95Vbkxc1X4uwPia5MUAOyUw8scI")
        .then(res => {
          expect(res.statusCode).to.equal(200);
          console.log(res.statusCode);
        })
        .catch(error => {
          throw new Error(error);
        })
      }
    });

    it("Doit retourner une erreur 404 si l'utilisateur n'existe pas", () =>  {
      async () => {
        await request
          .delete("/invaliduser")
          .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiYzRiMzI1ZWY2MTQ5NGQxNTBmOTBiIiwicm9sZSI6IkFkbWluIiwicHNldWRvIjoiTWF0YVJlZCIsImVtYWlsIjoiZ291ZGFsbWF0aHlzQGdtYWlsLmNvbSJ9LCJpYXQiOjE2NzMyOTQ4MjcsImV4cCI6MTY3MzI5ODQyN30.4cLHPV-psdYGFM2C95Vbkxc1X4uwPia5MUAOyUw8scI")
          .then(res => {
            expect(res.statusCode).to.equal(404);
            console.log(res.statusCode);
          })
          .catch(error => {
            throw new Error(error);
          })
      }
    });
    
    it("Doit retourner une erreur 401 si l'utilisateur n'est pas authentifié", () =>  {
      async () => {
        await request
          .delete("/testuser")
          .then(res => {
            expect(res.statusCode).to.equal(401);
            console.log(res.statusCode);
          })
          .catch(error => {
            throw new Error(error);
          })
      }
    });
    
    it("Doit retourner une erreur 401 si l'utilisateur n'est pas acrédité", () =>  {
      async () => {
        await request
          .delete("/otheruser")
          .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiYzRiMzI1ZWY2MTQ5NGQxNTBmOTBiIiwicm9sZSI6IkFkbWluIiwicHNldWRvIjoiTWF0YVJlZCIsImVtYWlsIjoiZ291ZGFsbWF0aHlzQGdtYWlsLmNvbSJ9LCJpYXQiOjE2NzMyOTQ4MjcsImV4cCI6MTY3MzI5ODQyN30.4cLHPV-psdYGFM2C95Vbkxc1X4uwPia5MUAOyUw8scI")
          .then(res => {
            expect(res.statusCode).to.equal(401);
            console.log(res.statusCode);
          })
          .catch(error => {
            throw new Error(error);
          })
      }
    });
    
});
