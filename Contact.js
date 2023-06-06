const { getCommandOptions } = require("./Cli");
const chalk = require("chalk");

class Contact {
    constructor(contact) {
        Object.assign(this, contact);
    }

    toString() {
        let lastName = this.lastName.toUpperCase();
        let firstName = this.firstName;

        const { colors } = getCommandOptions();

        if (colors) {
            lastName = chalk.blue(lastName);
            firstName = chalk.red(firstName);
        }
        return `${lastName} ${firstName}`;
    }
}

module.exports = Contact;