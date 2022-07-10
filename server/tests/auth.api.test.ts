import request from "supertest";
import { app } from "../src/api/v1/app";

const user_data_register = {
  name: "Teste Teste",
  username: "teste",
  password: "123",
};

const user_data_login = {
  username: "teste",
  password: "123",
};

describe("Auth API", () => {
  test("POST /api/auth/register", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send(user_data_register)
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
  });

  test("POST /api/auth/login", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send(user_data_login)
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
  });

  test("POST /api/auth/refresh-token", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
  });
});
