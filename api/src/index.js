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
        Prenotazioni = database.collection("prenotazione_tipo_lavaggio");
    })
    console.log("Lavandry API is running!");
});

app.get("/tipi-lavaggio", async (_, response) => {
    response.send(await TipiLavaggio.find().toArray());
});

app.get("/lavatrici", async (_, response) => {
    response.send(await Lavatrici.find().toArray());
});

app.post("/lavatrici/add", async (request, response) => {
    response.send(await Lavatrici.insertOne(request.query));
});

app.get("/prenotazioni/attive/utente", async (request, response) => {
    let query = {
        id_utente: -1,
        data_max_fine: { $gte: (new Date()).getTime() }
    };


    if (request.query.id_utente) {
        query.id_utente = parseInt(request.query.id_utente)
    } else {
        response.send("Inserisci il parametro <b>id_utente</b>")
    }


    response.send(await Prenotazioni.find(query).toArray());
});


app.get("/prenotazioni/utente", async (request, response) => {
    let query = {
        id_utente: -1,
    };


    if (request.query.id_utente) {
        query.id_utente = parseInt(request.query.id_utente)
    } else {
        response.send("Inserisci il parametro <b>id_utente</b>")
    }


    response.send(await Prenotazioni.find(query).toArray());

});
