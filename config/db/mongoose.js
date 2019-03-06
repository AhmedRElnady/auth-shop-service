const mongoose = require('mongoose');

function connect(dbHost, dbName) {
    return new Promise ((resolve, reject) => {
        mongoose.connect(`mongodb://localhost/${dbName}`)
            .then(() => {
                console.log(".... Shops DB connected successfully ....");
                resolve();
            })
            .catch((err)=> {
                reject(err);
            })
    });
}

module.exports = {connect};


