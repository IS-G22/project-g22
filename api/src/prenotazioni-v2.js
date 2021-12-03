exports.prenotazioni_utente = async (request, response) => {
    let query = {
        id_utente: -1,
    };


    if (request.query.id_utente) {
        query.id_utente = parseInt(request.query.id_utente)
        response.send(await slots.find(query).toArray());
    } else {
        response.send("Inserisci il parametro <b>id_utente</b>")
    }
}

exports.prenotazioni_attive_utente = async (request, response) => {
    let query = {
        id_utente: -1,
        data_fine: { $gte: (new Date()).getTime() }
    };


    if (request.query.id_utente) {
        query.id_utente = parseInt(request.query.id_utente);
        response.send(await slots.find(query).toArray());
    } else {
        response.send("Inserisci il parametro <b>id_utente</b>")
    }
}