/* eslint-env jest */
const assert = require("assert");
const ContactService = require("../ContactService");

describe("Contacts object", () => {
    let myContacts;

    describe("toString", () => {
        beforeEach(() => {
            myContacts = new ContactService();
        });

        it("should return lastName in upper case", () => {
            const contact = myContacts.contacts[0];
            const spy = jest.spyOn(contact, "toString");
            const string = contact.toString();
            const test = /^[A-Z]* [A-Za-z]*/.test(string);

            // L'un ou l'autre
            assert(test);
            expect(test).toBe(true);
            expect(string).toMatch(/^[A-Z]* [A-Za-z]*/);

            expect(spy).toHaveBeenCalledTimes(1);
        });
    });
});
