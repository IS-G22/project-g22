console.log("Lavandry API started");
const Express = require('express');
const app = Express();

require('dotenv').config('./.env');//carico il file che contiene la password per connettersi al database
const MongoClient = require("mongodb").MongoClient;
const CONNECTION_STRING = "mongodb+srv://admin:" + process.env.DB_PASSWORD + "@lavandry.nmnxj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const DATABASE = "lavandry";//nome del database
let database;
let TipiLavaggio;
let Lavatrici;

//da aggiungere swagger per documentare l'API

const cors = require('cors')
app.use(cors())

const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(49146, () => {
    MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true }, (error, client) => {
        if (error) {
            console.log(error)
        }
        database = client.db(DATABASE);
        console.log("Mongo DB Connection Successfull");

        TipiLavaggio = database.collection("tipo-lavaggio");
        Lavatrici = database.collection("lavatrici");
        Utenti = database.collection("lavatrici");
        Prenotazioni = database.collection("prenotazioni");
    })
    console.log("Lavandry API is running!");
});

app.get("/tipi-lavaggio", (request, response) => {
    TipiLavaggio.find().toArray(function (err, result) {
        if (err) {
            response.send(err);
        } else {
            response.send(JSON.stringify(result));
        }
    });
});

app.get("/lavatrici", (request, response) => {
    Lavatrici.find().toArray(function (err, result) {
        if (err) {
            response.send(err);
        } else {
            response.send(JSON.stringify(result));
        }
    });

    console.log((new Date()).getTime())
});

app.get("/prenotazioni-utente", (request, response) => {
    let query = {
        id_utente: -1,
    }

    if (request.query.id_utente) {
        query.id_utente = parseInt(request.query.id_utente)
    } else {
        response.send("Inserisci il parametro <b>id_utente</b>")
    }



    Prenotazioni.find(query).toArray(function (err, result) {
        if (err) {
            response.send(err);
        } else {
            response.send(JSON.stringify(result));
        }
    });
});

