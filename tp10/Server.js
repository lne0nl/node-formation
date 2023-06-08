const express = require("express");
const socketio = require("socket.io");
const router = require("./Router");

function web(myContacts) {
    const app = express();
    const port = 1234;
    const server = require("http").Server(app);
    const io = socketio(server);

    // Middleware
    app.use(express.json());
    app.use(express.static("./public"));

    // Routes
    router(app, myContacts, io);

    // Listen
    server.listen(port, () => console.log(`App listening on port ${port}`));
}

module.exports = web;
