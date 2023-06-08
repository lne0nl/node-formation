const { Command } = require("commander");
const web = require("./Server");
const { version } = require("./package.json");
const program = new Command();

const getCommandOptions = program.opts.bind(program);
exports.getCommandOptions = getCommandOptions;
exports.runCli = program.parse.bind(program);

exports.init = function (myContacts) {
    program.option("-c --colors", "Use colors in console").version(version);

    program
        .command("list")
        .description("List all contacts")
        .action(() => myContacts.print(() => myContacts.close()));

    program
        .command("add")
        .description("Add contact")
        .arguments("<firstName> <lastName>")
        .option("-a --address <address>", "Contact's address")
        .option("-p --phone <phone>", "Contact's phone number")
        .action((firstName, lastName, { address, phone }) => {
            const newContact = { firstName, lastName, phone, address };
            myContacts.add(newContact, () =>
                myContacts.print(() => myContacts.close())
            );
        });

    program
        .command("delete")
        .description("Delete contact")
        .arguments("<id>")
        .action((id) => {
            myContacts.delete(parseInt(id), (err) => {
                if (!err) {
                    myContacts.print(() => myContacts.close());
                }
            });
        });

    program
        .command("watch")
        .description("Watch contacts")
        .action(() => {
            myContacts.watch((err, data) => {
                if (!err) {
                    console.log("New version", data);
                }
            });
        });

    program
        .command("serve")
        .description("Launch server (express)")
        .action(() => web(myContacts));
};
