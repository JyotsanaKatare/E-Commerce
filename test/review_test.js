
var chai = require("chai")
let server = require("../index")
let chaiHttp = require("chai-http")
const routes = require("../routes/reviewRouter")
const utils = require("../models/reviewModelSchema")

chai.should();
chai.use(chaiHttp);

describe("POST/api/review", () => {
    it("It  should return add review :", (done) => {
        const data = {
            enterYourReview: "It's a good.",
            rating: "3",
        };
        chai
            .request(server)
            .post("/review/add_review/640b93494223e4aa38905047/641300d609481759601240a3")
            .set("Content-Type", "application/x-www-form-urlencoded")
            .field(data)
            .attach("reviewImage", "/Users/a/Desktop/image2.jpg", "image2.jpg")
            .send(data)
            .end((err, res) => {
                res.should.have.status(201);
                res.should.be.a("object");
                res.body.should.have.property("success").eq(true);
                res.body.should.have.property("message").eq("Review added successfully");
                done();
            })
    })

    it("It  should return add review with error message :", (done) => {
        const data = {
            enterYourReview: "It's a good.",
            rating: "3",
        };
        chai
            .request(server)
            .post("/review/add_review/640b93494223e4aa38905047/641300d609481759601240a3")
            .set("Content-Type", "application/x-www-form-urlencoded")
            .field(data)
            .attach("reviewImage", "/Users/a/Desktop/image2.jpg", "image2.jpg")
            .send(data)
            .end((err, res) => {
                res.should.have.status(409);
                res.should.be.a("object");
                res.body.should.have.property("success").eq(false);
                res.body.should.have.property("message").eq("Review is already exist");
                done();
           })
        })
})

describe("GET/api/review", () => {
    it("It  should return list review :", (done) => {
        const data = {};
        chai
            .request(server)
            .get("/review/list_review")
            .send(data)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a("object");
                res.body.should.have.property("success").eq(true);
                res.body.should.have.property("message").eq("Show review list here");
                done();
            })
    })
})

describe("PATCH/api/review", () => {
    it("It  should return update review :", (done) => {
        const data = {
            enterYourReview: "Great",
            rating: "5"
        };
        chai
            .request(server)
            .patch("/review/update_review/6412fc3e0fcc27280aa5bf35")
            .send(data)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a("object");
                res.body.should.have.property("success").eq(true);
                res.body.should.have.property("message").eq("Review update successfully");
                done();
            })
    })
})

describe("DELETE/api/review", () => {
    it("It  should return delete review :", (done) => {
        const data = {};
        chai
            .request(server)
            .delete("/review/delete_review/64130face240ceb300849157")
            .send(data)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a("object");
                res.body.should.have.property("success").eq(true);
                res.body.should.have.property("message").eq("Your successfully deleted");
                done();
            })
    })
})
