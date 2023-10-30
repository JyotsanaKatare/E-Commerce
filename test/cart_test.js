
var chai = require("chai")
let server = require("../index")
let chaiHttp = require("chai-http")
const routes = require("../routes/cartRouter")
const utils = require("../models/cartModelSchema")

chai.should();
chai.use(chaiHttp);

describe("POST/api/review", () => {
    it("It  should return add cart :", (done) => {
        const data = {
            quantity:"0",
            deliveryStatus:"true",
            paymentStatus:"true" 
        };
        chai
            .request(server)
            .post("/cart/add_cart/640acfb81a4c7fb7ebdfe50f/64106ae0f4ccd84e01198726")
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
})
