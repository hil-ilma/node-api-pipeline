import { expect } from "chai";
import request from "supertest";
import app from "../src/app.js";

describe("Index Routes", () => {
  it("should respond welcome", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.deep.equal({ message: "welcome to my api" });
  });

  it("should respond pong", async () => {
    const res = await request(app).get("/ping");
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.deep.equal({ result: "pong" });
  });
});
