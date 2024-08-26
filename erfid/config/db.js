const mongoose = require('mongoose');
const colors = require('colors');


const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://jayantss:jayantss@cluster.hutm20z.mongodb.net/ecopass");
        console.log(`Connected to Mongodb Database ${conn.connection.host}`.bgMagenta.white)
    } catch (error) {
        console.log(`Error in MongoDB ${error}`.bgRed.white)
    }
}

module.exports = connectDB;
