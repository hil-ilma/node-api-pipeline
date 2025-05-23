import { expect } from "chai";
import request from "supertest";
import app from "../src/app.js";
import { pool } from "../src/db.js";

describe("Employees Routes", () => {
  it("should respond a list of employees", async () => {
    const res = await request(app).get("/api/employees");
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body[0]).to.have.all.keys("id", "name", "salary");
  });
before((done) => {
  setTimeout(() => {
    console.log("⏳ Waiting extra 2 seconds before tests to ensure DB is ready...");
    done();
  }, 2000); // Wait 2 seconds to ensure MySQL is ready
});

  it("should create a new employee", async () => {
    const res = await request(app).post("/api/employees").send({
      name: "John Doe",
      salary: 1000,
    });
    expect(res.statusCode).to.equal(201);
    expect(res.body).to.include({
      name: "John Doe",
      salary: 1000,
    });
    expect(res.body).to.have.property("id").that.is.a("number");
  });

  it("should get an employee by id", async () => {
    const res = await request(app).get("/api/employees/1");
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.all.keys("id", "name", "salary");
    expect(res.body.id).to.equal(1);
  });

  it("should delete an employee by id", async () => {
    const res = await request(app).delete("/api/employees/1");
    expect(res.statusCode).to.equal(204);
  });

  after(async () => {
    await pool.end();
  });
});
