
var chai = require("chai")
let server = require("../index")
let chaiHttp = require("chai-http")
const routes = require("../routes/userRouter")
const utils = require("../models/userModelSchema")
var randomEmail = require("random-email")

chai.should();
chai.use(chaiHttp);

describe("POST/api/user", () => {
    it("It  should return signUp user detail :", (done) => {
        let email = (randomEmail({domain:'gmail.com'}))
        const data = {
            userName: "Aayushi Sharma",
            userEmail: "aaayushisharma637@gmail.com",
            userPassword: "aayuHHH$#@99",
            city: "Indore",
            state: "Indore",
            userContact: "9789543879",
            gender: "female",
        };
        chai
            .request(server)
            .post("/user/user_signUp")
            .set("Content-Type", "application/x-www-form-urlencoded")
            .field(data)
            .attach("profilePic", "/Users/a/Desktop/image2.jpg", "image2.jpg")
            .send(data)
            .end((err, res) => {
                res.should.have.status(201);
                res.should.be.a("object");
                res.body.should.have.property("success").eq(true);
                res.body.should.have.property("message").eq("User's data successfully registered");
                done();
            })
    })

    it("It  should return signUp user detail with email error:", (done) => {
        const data = {
            userName: "Aayushi Sharma",
            userEmail: "aayushisharma630@gmail.com",
            userPassword: "aayuHHH$#@99",
            city: "Indore",
            state: "Indore",
            userContact: "9789543879",
            gender: "female",
        };
        chai
            .request(server)
            .post("/user/user_signUp")
            .set("Content-Type", "application/x-www-form-urlencoded")
            .field(data)
            .attach("profilePic", "/Users/a/Desktop/image2.jpg", "image2.jpg")
            .send(data)
            .end((err, res) => {
                res.should.have.status(400);
                res.should.be.a("object");
                res.body.should.have.property("success").eq(false);
                res.body.should.have.property("message").eq("User email is already exists");
                done();
            })
    })


    it("It  should return logIn user detail :", (done) => {
        const data = {
            userEmail: "aayushisharma630@gmail.com",
            userPassword: "aayuHHH$#@99",
            userRole: "user"
        };
        chai
            .request(server)
            .post("/user/user_logIn")
            .send(data)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a("object");
                res.body.should.have.property("success").eq(true);
                res.body.should.have.property("message").eq("User successfully login");
                res.body.should.have.property("token");
                done();
            })
    })

    it("It  should return logIn user detail with email error:", (done) => {
        const data = {
            userEmail: "aayushiiSharma630@gmail.com",
            userPassword: "aayuHHH$#@99",
            userRole: "user"
        };
        chai
            .request(server)
            .post("/user/user_logIn")
            .send(data)
            .end((err, res) => {
                res.should.have.status(400);
                res.should.be.a("object");
                res.body.should.have.property("success").eq(false);
                res.body.should.have.property("message").eq("You are not registered user");
                done();
            })
    })

    it("It  should return login user detail Error message:", (done) => {
        const data = {
            userEmail: "aayushisharma630@gmail.com",
            userPassword: "aayuHHH$#@99@",
            userRole: "user"
        };
        chai
            .request(server)
            .post("/user/user_login")
            .send(data)
            .end((err, res) => {
                res.should.have.status(400);
                res.should.be.a("object");
                res.body.should.have.property("success").eq(false);
                res.body.should.have.property("message").eq("Email or Password is invalid");
                done();
            })
    })

    it("It  should return user reset pass email detail:", (done) => {
        const data = {
            userEmail: "aayushisharma630@gmail.com"
        };
        chai
            .request(server)
            .post("/user/user_reset_pass_email")
            .send(data)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a("object");
                res.body.should.have.property("success").eq(true);
                res.body.should.have.property("message").eq("Email send to user successfully");
                done();
            })
    })

    it("It  should return user reset pass email detail with email error:", (done) => {
        const data = {
            userEmail: "yushisharma630@gmail.com"
        };
        chai
            .request(server)
            .post("/user/user_reset_pass_email")
            .send(data)
            .end((err, res) => {
                res.should.have.status(403);
                res.should.be.a("object");
                res.body.should.have.property("success").eq(false);
                res.body.should.have.property("message").eq("Email user is not found");
                done();
            })
    })

    it("It  should return user reset pass detail:", (done) => {
        const data = {
            newPassword: "aayuSSH$#@99",
            confirmPassword: "aayuSSH$#@99"
        };
        chai
            .request(server)
            .post("/user/user_reset_password/640acfb81a4c7fb7ebdfe50f/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Nzg1Njc3NzgsImV4cCI6MTY3ODU3MTM3OH0.mprLNfnu2c2vdapG0uUkU1pFqiwj3rMYI9g80mtDbAI")
            .send(data)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a("object");
                res.body.should.have.property("success").eq(true);
                res.body.should.have.property("message").eq("User's password update successfully");
                done();
            })
    })

    it("It  should return user reset pass detail with pass not match error:", (done) => {
        const data = {
            newPassword: "aayuSSH$#@99",
            confirmPassword: "aayuSSH$#@9990"
        };
        chai
            .request(server)
            .post("/user/user_reset_password/640acfb81a4c7fb7ebdfe50f/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Nzg1Njc3NzgsImV4cCI6MTY3ODU3MTM3OH0.mprLNfnu2c2vdapG0uUkU1pFqiwj3rMYI9g80mtDbAI")
            .send(data)
            .end((err, res) => {
                res.should.have.status(403);
                res.should.be.a("object");
                res.body.should.have.property("success").eq(false);
                res.body.should.have.property("message").eq("Newpassword and Confirmpassword is not match");
                done();
            })
    })
 })
