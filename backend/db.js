const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/iNotebook"

const ConnectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    }
}

module.exports = ConnectToMongo;