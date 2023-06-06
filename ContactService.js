const Contact = require("./Contact");
const data = require("./contacts.json");

class ContactService {
    constructor() {
        this.contacts = data.map((contact) => new Contact(contact));
    }

    /**
     * La méthode get renvoie le tableau de contacts
     */
    get() {
        return this.contacts;
    }

    print() {
        console.log(this.get().join(", "));
    }
}

module.exports = ContactService;