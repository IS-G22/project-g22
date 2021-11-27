console.log("Lavandry API started");
const Express = require('express');
const app = Express();

require('dotenv').config('./.env');//carico il file che contiene la password per connettersi al database
const MongoClient = require("mongodb").MongoClient;
const CONNECTION_STRING = "mongodb+srv://admin:"+process.env.DB_PASSWORD+"@lavandry.nmnxj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const DATABASE = "lavandry";//nome del database
let database;

const cors = require('cors')
app.use(cors())

const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(49146, () => {
    MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true }, (error, client) => {
        database = client.db(DATABASE);
        console.log("Mongo DB Connection Successfull");
    })
    console.log("Lavandry API is running!");
});