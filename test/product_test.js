
var chai = require("chai")
let server = require("../index")
let chaiHttp = require("chai-http")
const routes = require("../routes/productRouter")
const utils = require("../models/productModelSchema")

chai.should();
chai.use(chaiHttp);

describe("POST/api/product", () => {
    it("It  should return add product :", (done) => {
        const data = {
            prodName: "Watch",
            prodDescription: "Latest pieces are available",
            prodPrice: "1000",
            prodFeature: "In good quality and light colours are available",
            prodSpecification: "Good",
            venderId: "640cee97087fa4ec9a32f706"
        };
        chai
            .request(server)
            .post("/product/add_product")
            .set("Content-Type", "application/x-www-form-urlencoded")
            .field(data)
            .attach("prodPic", "/Users/a/Desktop/image1.jpg", "image1.jpg")
            .attach("prodPic", "/Users/a/Desktop/image2.jpg", "image2.jpg")
            .send(data)
            .end((err, res) => {
                res.should.have.status(201);
                res.should.be.a("object");
                res.body.should.have.property("success").eq(true);
                res.body.should.have.property("message").eq("Product successfully added");
                done();
            })
    })
})

describe("GET/api/product", () => {
    it("It  should return product list :", (done) => {
        const data = {};
        chai
            .request(server)
            .get("/product/prod_list")
            .send(data)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a("object");
                res.body.should.have.property("success").eq(true);
                res.body.should.have.property("message").eq("Show product list here");
                done();
            })
    })

    it("It  should return product details :", (done) => {
        const data = {};
        chai
            .request(server)
            .get("/product/prod_detail/64106a3cf4ccd84e01198724")
            .send(data)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a("object");
                res.body.should.have.property("success").eq(true);
                res.body.should.have.property("message").eq("Show product details here");
                done();
            })
    })
})

describe("DELETE/api/product", () => {
    it("It  should return product delete :", (done) => {
        const data = {};
        chai
            .request(server)
            .delete("/product/prod_delete/64106a3cf4ccd84e01198724")
            .send(data)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a("object");
                res.body.should.have.property("success").eq(true);
                res.body.should.have.property("message").eq("Your product successfully deleted");
                done();
            })
    })
})

describe("PATCH/api/product", () => {
    it("It  should return product update :", (done) => {
        const data = {};
        chai
            .request(server)
            .patch("/product/prod_update/6411639c33fd021a4389cb0a")
            .send(data)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a("object");
                res.body.should.have.property("success").eq(true);
                res.body.should.have.property("message").eq("Product successfully update");
                done();
            })
    })
})
