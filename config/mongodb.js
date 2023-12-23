const mongoose = require('mongoose');

async function conectToMongo(url) {
    return mongoose.connect(url);
}


module.exports = {
    conectToMongo
}