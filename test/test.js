const expect = require("chai").expect;
const request = require("request");

const dbo = require("../db/conn");


describe("get all comments", () => {
    const url = "http://localhost:8080/api/comments";

    before((done) => {
        dbo.connect(() => {
            const commentsCollection = dbo.getDB().collection("comments");
            commentsCollection.deleteMany({});
            console.log("collection object created",commentsCollection);
            for (let index = 1; index < 5; index++) {
                commentsCollection.insertOne({
                    name: 'test' + index,
                    description: 'test description' + index
                })
            }
            setTimeout(() => {
                done();
            }, 1000);
        })
    });

    it("requests return status code 200", (done) => {
        request(url, (err, res, body) => {
            expect(res.statusCode).to.equal(200);
            done();
        });
    });

    it("requests returns status code 200 within the message body", (done) => {
        request(url, (err, res, body) => {
            body = JSON.parse(body);
            expect(body.statusCode).to.equals(200);
            done();
        });
    });

    it("requests body returns 5 tools comments", (done) => {
        request(url, (err, res, body) => {
            body = JSON.parse(body);
            expect(body.length).to.equal(5);
            done();
        });
    });

    after(() => {
        dbo.connect(() => {
            const commentsCollection = dbo.getDB().collection("comments");
            commentsCollection.deleteMany({});
            dbo.disconnect();
        })
    });


});

describe("insert comments", () => {
    const url = "http://localhost:8080/api/comments";

    before((done) => {
        dbo.connect(() => {
            const commentsCollection = dbo.getDB().collection("comments");
            commentsCollection.deleteMany({});
            commentsCollection.insertOne({
                name: 'protractor',
                description: 'This is a good tool to learn'
            })
            setTimeout(() => {
                done();
            }, 1000);
        })
    });

    it("requests return status code 200", (done) => {
        request(url, (err, res, body) => {
            expect(res.statusCode).to.equal(200);
            done();
        });
    });

    it("requests body returns added comment with name priyanka", (done) => {
        request(url, (err, res, body) => {
            body = JSON.parse(body);
            expect(body[0].name).to.equal('protractor');
            done();
        });
    });

    it("requests body returns added comment with description test", (done) => {
        request(url, (err, res, body) => {
            body = JSON.parse(body);
            expect(body[0].description).to.equal('This is a good tool to learn');
            done();
        });
    });


    after(() => {
        dbo.connect(() => {
            const commentsCollection = dbo.getDB().collection("comments");
            commentsCollection.deleteMany({});
            dbo.disconnect();
        })
    });


});