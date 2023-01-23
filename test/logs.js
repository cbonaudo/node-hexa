process.env.NODE_ENV = "test";

let chai = require("chai");
let chaiHttp = require("chai-http");
let { app: server, sqlLogAdapter } = require("../server");
let should = chai.should();

chai.use(chaiHttp);

const LOGGING = false;

describe("Logs", () => {
  beforeEach(async (done) => {
    await sqlLogAdapter.deleteAll();
    done();
  });

  describe("/GET logs", () => {
    it("it should GET 0 logs if none", (done) => {
      chai
        .request(server)
        .get("/api/logs")
        .end((err, res) => {
          if (LOGGING) console.log(res);
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
    it("it should GET all logs", async (done) => {
      await sqlLogAdapter.create({ message: "One log" });
      await sqlLogAdapter.create({ message: "Two log" });
      await sqlLogAdapter.create({ message: "Three log" });

      chai
        .request(server)
        .get("/api/logs")
        .end((err, res) => {
          if (LOGGING) console.log(res);
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(3);
          done();
        });
    });
    it("it should GET only warn logs", async (done) => {
      await sqlLogAdapter.create({ message: "One log" });
      await sqlLogAdapter.create({ message: "Two log", level: "WARN" });
      await sqlLogAdapter.create({ message: "Three log", level: "WARN" });

      chai
        .request(server)
        .get("/api/logs?level=WARN")
        .end((err, res) => {
          if (LOGGING) console.log(res);
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(2);
          done();
        });
    });
  });

  describe("/POST logs", () => {
    it("it should not POST a log without message", (done) => {
      let log = {
        level: "WARN",
      };
      chai
        .request(server)
        .post("/api/logs")
        .send(log)
        .end((err, res) => {
          if (LOGGING) console.log(res);
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          res.body.message.should.be.equal("Message can not be empty!");
          done();
        });
    });

    it("it should POST a log", (done) => {
      let log = {
        level: "WARN",
        message: "My first test log",
      };
      chai
        .request(server)
        .post("/api/logs")
        .send(log)
        .end((err, res) => {
          if (LOGGING) console.log(res);
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          res.body.message.should.be.equal("My first test log");
          done();
        });
    });
    it("it should POST a log without level", (done) => {
      let log = {
        message: "My second test log",
      };
      chai
        .request(server)
        .post("/api/logs")
        .send(log)
        .end((err, res) => {
          if (LOGGING) console.log(res);
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("level");
          res.body.level.should.be.equal("INFO");
          res.body.should.have.property("message");
          res.body.message.should.be.equal("My second test log");
          done();
        });
    });
  });
  describe("/DELETE logs", () => {
    it("it should delete 0 logs if none", (done) => {
      chai
        .request(server)
        .delete("/api/logs")
        .end((err, res) => {
          if (LOGGING) console.log(res);
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          res.body.message.should.be.equal("0 Logs were deleted successfully!");
          done();
        });
    });
    it("it should delete all logs", async (done) => {
      await sqlLogAdapter.create({ message: "One log that won't stay long" });
      await sqlLogAdapter.create({ message: "Two log that won't stay long" });

      chai
        .request(server)
        .delete("/api/logs")
        .end((err, res) => {
          if (LOGGING) console.log(res);
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          res.body.message.should.be.equal("2 Logs were deleted successfully!");
          done();
        });
    });
  });
});
