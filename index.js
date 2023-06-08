const FileContactService = require("./FileContactService");
const { init, runCli } = require("./Cli");

const myContacts = new FileContactService();
init(myContacts);
runCli();
