const fs = require("fs");

const { readFile, writeFile, unlink, rename } = fs.promises;

const path = "contacts.json";
const backupPath = path + ".back";

function callbacks(contacts, callback) {
    fs.readFile(path, (err, data) => {
        if (err) {
            console.error(err);
        } else {
            fs.writeFile(backupPath, data, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    fs.writeFile(
                        path,
                        JSON.stringify(contacts, undefined, 2),
                        (err) => {
                            if (err) {
                                console.error(err);

                                fs.rename(backupPath, path, (err) => {
                                    if (err) {
                                        console.error(err);
                                    }

                                    if (callback) {
                                        callback();
                                    }
                                });
                            } else {
                                fs.unlink(backupPath, (err) => {
                                    if (err) {
                                        console.error(err);
                                    }

                                    if (callback) {
                                        callback();
                                    }
                                });
                            }
                        }
                    );
                }
            });
        }
    });
}

function promise(contacts, callback) {
    return readFile(path)
        .then((data) => {
            console.log("Read", data.toString());
            return writeFile(backupPath, data);
        })
        .then(() => {
            console.log("Write");
            return writeFile(path, JSON.stringify(contacts, undefined, 2)).then(
                () => unlink(backupPath),
                (err) => {
                    console.log("Error writing file", err);
                    return rename(backupPath, path);
                }
            );
        })
        .then(() => {
            if (callback) {
                callback();
            }
        })
        .catch((err) => {
            console.error("Error", err);
        });
}

async function asyncAwait(contacts, callback) {
    const data = await readFile(path);
    await writeFile(backupPath, data);

    try {
        await writeFile(path, JSON.stringify(contacts, undefined, 2));
    } catch (err) {
        console.log("Error writing file", err);
        await rename(backupPath, path);
    } finally {
        await unlink(backupPath);
    }

    callback();
}

module.exports = {
    callbacks,
    promise,
    asyncAwait,
};
