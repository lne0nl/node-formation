var Contact = require("./Contact");
var fs = require("fs");
var JSONStream = require("JSONStream");
const { Transform } = require("stream");
const _ = require("lodash");

const path = "contacts.json";

exports.original = (callback) => {
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log("error loading file", err);
        }
        try {
            var contacts = _.map(
                JSON.parse(data),
                (contact) => new Contact(contact)
            );

            if (callback) {
                callback(contacts);
            }
        } catch (error) {
            console.log("error parsing", error);
        }
    });
};

exports.stream = (callback) => {
    var contacts = [];

    fs.createReadStream(path)
        .pipe(JSONStream.parse("*"))
        .pipe(
            new Transform({
                objectMode: true,
                transform: (contact, _, done) => {
                    contacts.push(new Contact(contact));
                    done();
                },
            })
        )
        .on("finish", () => {
            if (callback) {
                callback(contacts);
            }
        });
};
