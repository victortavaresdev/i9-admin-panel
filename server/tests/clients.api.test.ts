import request from "supertest";
import { app } from "../src/api/v1/app";

const client_data = {
  full_name: "Maria Clara",
  profession: "Arquiteta",
  marital_status: "casado",
  cpf: "15039960033",
  phone: "980802424",
  cep: "250300777",
  uf: "SP",
  city: "São Paulo",
  neighborhood: "Liberdade",
  street: "Rua Lopes Dias",
  number: "15C",
};

describe("Clients API", () => {
  test("GET /api/clients", async () => {
    const response = await request(app)
      .get("/api/clients")
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
    expect(response.body).toHaveLength(4);
  });

  test("POST /api/clients", async () => {
    const response = await request(app)
      .post("/api/clients")
      .send(client_data)
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
    expect(response.body).toBeTruthy();
  });

  test("GET /api/clients/uf", async () => {
    const response = await request(app)
      .get("/api/clients/uf")
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
    expect(response.body).toHaveLength(27);
  });

  test("GET /api/clients/search/:name", async () => {
    const response = await request(app)
      .get("/api/clients/search/amanda%20lopes")
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
  });

  test("GET /api/clients/:id", async () => {
    const response = await request(app)
      .get("/api/clients/c60f5c0f-99d1-4279-a80a-c5c56a970a17")
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
    expect(response.body).toBeTruthy();
  });

  test("PUT /api/clients/:id", async () => {
    const response = await request(app)
      .put("/api/clients/c60f5c0f-99d1-4279-a80a-c5c56a970a17")
      .send({ full_name: "Amanda Lopes" })
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
    expect(response.body.full_name).toBe("Amanda Lopes");
  });

  test("DELETE /api/clients/:id", async () => {
    const response = await request(app)
      .delete("/api/clients/ebfa5541-3b13-42f5-8231-7c6604d96d22")
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
  });
});
