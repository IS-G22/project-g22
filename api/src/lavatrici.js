const { prenotazioni_attive_utente } = require("./prenotazioni");

exports.lista = async (_, response) => {
    response.send(await lavatrici.find().toArray());
}

exports.add = async (request, response) => {
    response.send(await lavatrici.insertOne(request.query));
}
exports.apri = async (request, response) => {
    response.send("Lavatrice aperta");
}

exports.blocca = async (request, response) => {
    let id_lavatrice = -1;
    if (request.query.id_lavatrice) {
        id_lavatrice = parseInt(request.query.id_lavatrice);
        lavatrici.updateOne({ id: id_lavatrice }, { stato: 'bloccata' }, (err, res) => {
            if (err) throw err;
            console.log("1 document updated");
        });
    } else {
        response.send({ error: "Inserisci il parametro <b>id_lavatrice</b>" })
        return;
    }

    prenotazioni.deleteMany({
        $match: {
            $and: [
                { "id_lavatrice": id_lavatrice },
                { "data": { $gte: (new Date()).getTime() } }
            ]
        }
    }, (err, obj) => {
        if (err) throw err;
        console.log(obj.result.n + " document(s) deleted");
    });

    response.send("Lavatrice bloccata");

}

exports.sblocca = async (request, response) => {
    let id_lavatrice = -1;
    if (request.query.id_lavatrice) {
        id_lavatrice = parseInt(request.query.id_lavatrice);
        lavatrici.updateOne({ id: id_lavatrice }, { stato: 'sbloccata' }, (err, res) => {
            if (err) throw err;
            console.log("1 document updated");
        });
    } else {
        response.send({ error: "Inserisci il parametro <b>id_lavatrice</b>" })
        return;
    }
    response.send("Lavatrice sbloccata");
}