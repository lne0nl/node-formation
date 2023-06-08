#!/usr/bin/env node

const MongoContactService = require("./MongoContactService");
const { init, runCli } = require("./Cli");

/* Execution */
const myContacts = new MongoContactService();
init(myContacts);
runCli();
