const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const app = require("../app");
const fs = require("fs");

chai.use(chaiHttp);

describe("API ENDPOINT TESTING", () => {
  it("GET Landing Page", (done) => {
    chai
      .request(app)
      .get("/api/v1/member/landing-page")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("Object");
        expect(res.body).to.have.property("hero");
        expect(res.body.hero).to.have.all.keys("treasure", "traveller", "city");
        expect(res.body).to.have.property("mostPicked");
        expect(res.body.mostPicked).to.have.an("array");
        expect(res.body).to.have.property("categories");
        expect(res.body.categories).to.have.an("array");
        expect(res.body).to.have.property("testimonial");
        expect(res.body.testimonial).to.have.an("Object");
        done();
      });
  });
});

describe("API ENDPOINT TESTING", () => {
  it("GET Details Page", (done) => {
    chai
      .request(app)
      .get("/api/v1/member/details-page/5e96cbe292b97300fc902222")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("Object");
        expect(res.body).to.have.property("country");
        expect(res.body).to.have.property("isPopular");
        expect(res.body).to.have.property("unit");
        expect(res.body).to.have.property("sumBooking");
        expect(res.body).to.have.property("imageId");
        expect(res.body.imageId).to.have.an("array");
        expect(res.body).to.have.property("featureId");
        expect(res.body.featureId).to.have.an("array");
        expect(res.body).to.have.property("activityId");
        expect(res.body.activityId).to.have.an("array");
        expect(res.body).to.have.property("title");
        expect(res.body).to.have.property("price");
        expect(res.body).to.have.property("city");
        expect(res.body).to.have.property("description");
        expect(res.body).to.have.property("_id");
        expect(res.body).to.have.property("__v");
        expect(res.body.bank).to.have.an("array");
        expect(res.body).to.have.property("testimonial");
        expect(res.body.testimonial).to.have.an("Object");
        done();
      });
  });
});

describe("API ENDPOINT TESTING", () => {
  it("POST Booking Page", (done) => {
    const image = __dirname + "/bukti-bayar.jpeg";
    const dataSample = {
      image,
      idItem: "5e96cbe292b97300fc902229",
      duration: 3,
      bookingDateStart: "08-15-2021",
      bookingDateEnd: "08-18-2021",
      firstName: "Fikhri",
      lastName: "Syahrozi",
      emailAddress: "FikhriSyah@gmail.com",
      phoneNumber: "0895112266565",
      accountHolder: "Fik",
      bankFrom: "Mandiri",
    };
    chai
      .request(app)
      .post("/api/v1/member/booking-page")
      .set("Content-Type", "application/x-www-form-urlencoded")
      .field("idItem", dataSample.idItem)
      .field("duration", dataSample.duration)
      .field("bookingDateStart", dataSample.bookingDateStart)
      .field("bookingDateEnd", dataSample.bookingDateEnd)
      .field("firstName", dataSample.firstName)
      .field("lastName", dataSample.lastName)
      .field("emailAddress", dataSample.emailAddress)
      .field("phoneNumber", dataSample.phoneNumber)
      .field("accountHolder", dataSample.accountHolder)
      .field("bankFrom", dataSample.bankFrom)
      .attach("image", fs.readFileSync(dataSample.image), "bukti-bayar.jpeg")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res).to.have.an("Object");
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal("Success Booking");
        expect(res.body).to.have.property("booking");
        expect(res.body.booking).to.have.an("Object");
        expect(res.body.booking).to.have.all.keys(
          "payments",
          "bookingStartDate",
          "_id",
          "bookingEndDate",
          "invoice",
          "itemId",
          "total",
          "memberId",
          "__v"
        );
        expect(res.body.booking.payments).to.have.an("Object");
        expect(res.body.booking.payments).to.have.all.keys(
          "status",
          "proofPayment",
          "bankFrom",
          "accountHolder"
        );
        expect(res.body.booking.itemId).to.have.an("Object");
        expect(res.body.booking.itemId).to.have.all.keys(
          "_id",
          "title",
          "price",
          "duration"
        );
        done();
      });
  });
});
