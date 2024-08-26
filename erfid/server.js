const express = require('express');
const connectDB = require('./config/db');
const colors = require('colors');
const axios = require('axios');
const RfidCard = require('./model/rfid-model');


const app = express();
const port = 8080;

connectDB();

const apiUrl = "http://localhost:8000/api/v1/rfid/insert"


app.get('/insert', async (req, res) => {
    try {
        const { rfid } = req.query;

        const response = await axios.post(apiUrl, { rfid: rfid });

        console.log(`Successfully inserted rfid card entry of card : ${rfid}`);
    } catch (error) {
        console.log(`Error while inserting rfid card entry: ${error.message}`)
    }
});

app.listen(port, () => {

    console.log(`Server is running on port ${port}`.bgBlue.white);
});