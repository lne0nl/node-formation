module.exports = (app, myContacts, io) => {
    app.get("/rest/contacts", (req, res) => {
        myContacts.get((contacts) => res.send(contacts));
    });

    app.get("/rest/contacts/:id", (req, res) => {
        const id = parseInt(req.params.id);

        myContacts.get((contacts) => {
            const contact = contacts.find((c) => c.id === id);

            res.send(contact);
        });
    });

    app.post("/rest/contacts", (req, res) => {
        myContacts.add(
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                address: req.body.address,
            },
            () => {
                res.sendStatus(200);
            }
        );
    });

    app.put("/rest/contacts/:id", (req, res) => {
        const id = parseInt(req.params.id);

        myContacts.delete(id, () => {
            myContacts.add(req.body.firstName, req.body.lastName, () => {
                res.sendStatus(200);
            });
        });
    });

    io.on("connection", function (socket) {
        console.log("New client connected", socket.id);
    });

    myContacts.watch(function (err, contacts) {
        io.emit("contacts", contacts);
    });
};
