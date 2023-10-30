
var chai = require("chai")
let server = require("../index")
let chaiHttp = require("chai-http")
const routes = require("../routes/venderRouter")
const utils = require("../models/venderModelSchema")

chai.should();
chai.use(chaiHttp)

describe("POST/api/vender", () => {
    it("It  should return signUp vender detail :", (done) => {
        const data = {
            venderName: "Shreya Shikhawat",
            venderEmail: "ashreyaa0@gmail.com",
            venderPassword: "shrey01UU&&",
            venderContact: "9875768970",
            city: "Indore",
            address: "324/F,shree building Indore",
            aboutVender: "Selling television and laptop"
        };
        chai
            .request(server)
            .post("/vender/vender_signUp")
            .send(data)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a("object");
                res.body.should.have.property("success").eq(true);
                res.body.should.have.property("message").eq("Vender's data successfully registered");
                done();
            })
    })

    it("It  should return signUp vender detail with email error:", (done) => {
        const data = {
            venderName: "Shreya Shikhawat",
            venderEmail: "shreyaa0@gmail.com",
            venderPassword: "shrey01UU&&",
            venderContact: "9875768970",
            city: "Indore",
            address: "324/F,shree building Indore",
            aboutVender: "Selling television and laptop"
        };
        chai
            .request(server)
            .post("/vender/vender_signUp")
            .send(data)
            .end((err, res) => {
                res.should.have.status(400);
                res.should.be.a("object");
                res.body.should.have.property("success").eq(false);
                res.body.should.have.property("message").eq("Vender's email is already exists");
                done();
            })
    })

    it("It  should return logIn vender detail :", (done) => {
        const data = {
            venderEmail: "shreyaa0@gmail.com",
            venderPassword: "shrey01UU&&",
            venderRole: "vender"
        };
        chai
            .request(server)
            .post("/vender/vender_login")
            .send(data)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a("object");
                res.body.should.have.property("success").eq(true);
                res.body.should.have.property("message").eq("Vender successfully login");
                res.body.should.have.property("token");
                done();
            })
    })
    
    it("It  should return logIn vender detail with email error :", (done) => {
        const data = {
            venderEmail: "shreyaa001@gmail.com",
            venderPassword: "shrey01UU&&",
            venderRole: "vender"
        };
        chai
            .request(server)
            .post("/vender/vender_login")
            .send(data)
            .end((err, res) => {
                res.should.have.status(400);
                res.should.be.a("object");
                res.body.should.have.property("success").eq(false);
                res.body.should.have.property("message").eq("You are not registered vender");
                done();
            })
    })

    it("It  should return logIn vender detail with pass error :", (done) => {
        const data = {
            venderEmail: "shreyaa01@gmail.com",
            venderPassword: "shrey01UU&&@@",
            venderRole: "vender"
        };
        chai
            .request(server)
            .post("/vender/vender_login")
            .send(data)
            .end((err, res) => {
                res.should.have.status(400);
                res.should.be.a("object");
                res.body.should.have.property("success").eq(false);
                res.body.should.have.property("message").eq("Email or Password is invalid");
                done();
            })
    })

    it("It  should return reset pass email vender detail :", (done) => {
        const data = {
            venderEmail: "shreyaa01@gmail.com",
        };
        chai
            .request(server)
            .post("/vender/vender_reset_pass_email")
            .send(data)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a("object");
                res.body.should.have.property("success").eq(true);
                res.body.should.have.property("message").eq("Email send to vender successfully");
                done();
            })
    })

    it("It  should return reset pass email vender detail with error :", (done) => {
        const data = {
            venderEmail: "shrey01@gmail.com",
        };
        chai
            .request(server)
            .post("/vender/vender_reset_pass_email")
            .send(data)
            .end((err, res) => {
                res.should.have.status(403);
                res.should.be.a("object");
                res.body.should.have.property("success").eq(false);
                res.body.should.have.property("message").eq("Vender's email is not found");
                done();
            })
    })

    it("It  should return reset pass vender detail :", (done) => {
        const data = {
            newPassword: "shreyaShikha",
            confirmPassword: "shreyaShikha"
        };
        chai
            .request(server)
            .post("/vender/vender_pass_reset/640bbb6ab2cd61a22148002c/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Nzg1NzEwMzcsImV4cCI6MTY3ODU3NDYzN30.HPDuWvEwXDJcrI44jrs-L5GR1R8ZwO6dQcMDzlbo6Gs")
            .send(data)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a("object");
                res.body.should.have.property("success").eq(true);
                res.body.should.have.property("message").eq("Vender's password successfully update");
                done();
            })
    })

    it("It  should return reset pass vender detail with pass not match error:", (done) => {
        const data = {
            newPassword: "shreyaShikha",
            confirmPassword: "shreyaShikh"
        };
        chai
            .request(server)
            .post("/vender/vender_pass_reset/640bbb6ab2cd61a22148002c/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Nzg1NzEwMzcsImV4cCI6MTY3ODU3NDYzN30.HPDuWvEwXDJcrI44jrs-L5GR1R8ZwO6dQcMDzlbo6Gs")
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
 