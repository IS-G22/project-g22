console.log("Lavandry API started");
const Express = require('express');
const app = Express();

require('dotenv').config('./.env');//carico il file che contiene la password per connettersi al database
const MongoClient = require("mongodb").MongoClient;
const CONNECTION_STRING = "mongodb+srv://admin:" + process.env.DB_PASSWORD + "@lavandry.nmnxj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const DATABASE = "lavandry";//nome del database
let database;
let tipiLavaggio;
let lavatrici;
let prenotazioni;

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

        tipiLavaggio = database.collection("tipo-lavaggio");
        lavatrici = database.collection("lavatrici");
        Utenti = database.collection("lavatrici");
        prenotazioni = database.collection("prenotazione_tipo_lavaggio");
    })
    console.log("Lavandry API is running!");
});

app.get("/api/tipo-lavaggio", async (_, response) => {
    response.send(await tipiLavaggio.find().toArray());
});

app.get("/api/lavatrici", async (_, response) => {
    response.send(await lavatrici.find().toArray());
});

app.post("/api/lavatrici/add", async (request, response) => {
    response.send(await lavatrici.insertOne(request.query));
});

app.get("/api/prenotazioni/attive/utente", async (request, response) => {
    let query = {
        id_utente: -1,
        data_max_fine: { $gte: (new Date()).getTime() }
    };


    if (request.query.id_utente) {
        query.id_utente = parseInt(request.query.id_utente);
        response.send(await prenotazioni.find(query).toArray());
    } else {
        response.send("Inserisci il parametro <b>id_utente</b>")
    }
});


app.get("/api/prenotazioni/utente", async (request, response) => {
    let query = {
        id_utente: -1,
    };


    if (request.query.id_utente) {
        query.id_utente = parseInt(request.query.id_utente)
        response.send(await prenotazioni.find(query).toArray());
    } else {
        response.send("Inserisci il parametro <b>id_utente</b>")
    }
});

app.get("/api/giorni-prenotabili", async (request, response) => {
    let id_tipo_lavaggio;
    let tipoLavaggio;
    let durata_lavaggio = null;
    if (request.query.id_tipo_lavaggio) {
        
        id_tipo_lavaggio = parseInt(request.query.id_tipo_lavaggio)
        console.log(id_tipo_lavaggio)
        tipoLavaggio = await tipiLavaggio.findOne({ id: id_tipo_lavaggio });
        durata_lavaggio = tipoLavaggio.durata;
        let prenotazioni_disponibili = await prenotazioni.find().toArray();
        console.log(tipoLavaggio);
    } else {
        response.send("Inserisci il parametro <b>id_tipo_lavaggio</b>")
    }

    let oggi = new Date();
    let a = Array.apply(null, { length: 14 }).map((_, number) => {
        let date = new Date(oggi.getTime() + number * 24 * 60 * 60 * 1000);
        return { i: number, display_date: convertDate(date), date: date }
    });
    response.send(JSON.stringify(a));
});

function convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
}






app.get("/v2/giorni-prenotabili", async (request, response) => {
    let aa = database.collection('prenotazione_prenotazione_successiva').find();

    let json = await aa.toArray();
    response.send(json);
    console.log(json[2]);
})
