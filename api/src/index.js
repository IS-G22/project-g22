console.log("Lavandry API started");
const Express = require('express');
const app = Express();
const path = require('path');

require('dotenv').config('./.env');//carico il file che contiene la password per connettersi al database
const MongoClient = require("mongodb").MongoClient;
const CONNECTION_STRING = "mongodb+srv://admin:" + process.env.DB_PASSWORD + "@lavandry.nmnxj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const DATABASE = "lavandry";
global.database;
global.tipiLavaggio;
global.lavatrici;
global.prenotazioni;
global.slots;
//da aggiungere swagger per documentare l'API

const cors = require('cors')
app.use(cors())

const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var Prenotazioni = require("./prenotazioni");
var CreaPrenotazione = require("./crea-prenotazione");
var Lavatrici = require("./lavatrici");
var TipoLavaggio = require("./tipo-lavaggio");


app.listen(49146, () => {
    MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true }, (error, client) => {
        if (error) {
            console.log(error)
        }
        global.database = client.db(DATABASE);
        console.log("Mongo DB Connection Successfull");

        global.tipiLavaggio = global.database.collection("tipo-lavaggio");
        global.lavatrici = global.database.collection("lavatrici");
        global.prenotazioni = global.database.collection("prenotazione_tipo_lavaggio");
        global.slots = global.database.collection("slots");
    })
    console.log("Lavandry API is running!");
});

app.get("/api/tipo-lavaggio", TipoLavaggio.list);

app.get("/api/lavatrici", Lavatrici.lista);
app.post("/api/lavatrici/add", Lavatrici.add);

app.get("/api/prenotazioni/attive/utente", Prenotazioni.prenotazioni_attive_utente);
app.get("/api/prenotazioni/utente", Prenotazioni.prenotazioni_utente);

app.get("/api/giorni-prenotabili", CreaPrenotazione.giorniPrenotabili);
app.get("/api/v2/giorni-prenotabili", CreaPrenotazione.giorniPrenotabiliV2)