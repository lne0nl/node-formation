const fs = require("fs");
const Contact = require("./Contact");
const _ = require("lodash");
const path = "contacts.json";

class FileContactService {
    read(callback) {
        fs.readFile(path, (err, raw) => {
            if (err) {
                console.error("error loading file", err);
            }
            try {
                const data = JSON.parse(raw);
                const contacts = data.map((contact) => new Contact(contact));

                !!callback && callback(contacts);
            } catch (error) {
                console.error("error parsing", error);
            }
        });
    }

    get(callback) {
        this.read(callback);
    }

    write(contacts, callback) {
        fs.writeFile(path, JSON.stringify(contacts, null, 2), callback);
    }

    add({ firstName, lastName, address, phone }, callback) {
      console.log({ firstName, lastName, address, phone })
        this.read((contacts) => {
            contacts.push(
                new Contact({
                    id: contacts[contacts.length - 1].id + 1,
                    lastName,
                    firstName,
                    phone,
                    address,
                })
            );

            this.write(contacts, callback);
        });
    }

    delete(id, callback) {
        this.read((contacts) => {
            this.write(
                contacts.filter((c) => c.id !== id),
                callback
            );
        });
    }

    watch(callback) {
        this.read((referenceContacts) => {
            let previousContacts = referenceContacts;
            fs.watch(path, () => {
                this.read((newContacts) => {
                    const minus = _.differenceWith(
                        previousContacts,
                        newContacts,
                        _.isEqual
                    );
                    const plus = _.differenceWith(
                        newContacts,
                        previousContacts,
                        _.isEqual
                    );

                    if (minus.length > 0 || plus.length > 0) {
                        previousContacts = newContacts;
                        console.log("watched", { minus, plus });

                        if (callback) {
                            callback(null, newContacts);
                        }
                    }
                });
            });
        });
    }

    print() {
        this.get((data) => console.log(data.join(", ")));
    }
}

module.exports = FileContactService;