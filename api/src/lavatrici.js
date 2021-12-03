exports.BLOCCATA = 'bloccata';
exports.SBLOCCATA = 'sbloccata';

exports.lista = async (_, response) => {
    response.send(await lavatrici.find().toArray());
}

exports.add = async (request, response) => {
    response.send(await lavatrici.insertOne(request.query));
}
exports.apri = async (request, response) => {
    let id_lavatrice = -1;
    if (!request.query.id_lavatrice) {
        response.send({ error: "Inserisci il parametro <b>id_lavatrice</b>", status:'err' })
        return;
    }
    id_lavatrice = parseInt(request.query.id_lavatrice);
    console.log(id_lavatrice)
    console.log(await lavatrici.findOne({ id: id_lavatrice }))
    response.send(await lavatrici.findOne({ id: id_lavatrice }));
}

exports.blocca = async (request, response) => {
    let id_lavatrice = -1;
    if (!request.query.id_lavatrice) {
        response.send({ error: "Inserisci il parametro <b>id_lavatrice</b>" })
        return;
    }
    id_lavatrice = parseInt(request.query.id_lavatrice);

    lavatrici.updateOne({ id: id_lavatrice }, { $set: { stato: this.BLOCCATA } }, { upsert: true });

    cancellaSlotFuturi(id_lavatrice);

    response.send("Lavatrice bloccata");

}

exports.sblocca = async (request, response) => {
    let id_lavatrice = -1;
    if (!request.query.id_lavatrice) {
        response.send({ error: "Inserisci il parametro <b>id_lavatrice</b>" })
        return;
    }
    id_lavatrice = parseInt(request.query.id_lavatrice);

    lavatrici.updateOne({ id: id_lavatrice }, { $set: { stato: this.SBLOCCATA } }, { upsert: true });

    cancellaSlotFuturi(id_lavatrice);

    let inserito = await slots.insertOne({
        data_inizio: (new Date()).getTime(),
        data_fine: 9999999999999,
        stato: "libero",
        id_lavatrice: id_lavatrice
    });
    console.log("inserito: ", inserito);

    response.send("Lavatrice sbloccata");
}


async function cancellaSlotFuturi(id_lavatrice) {
    let cancellati = await slots.deleteMany({
        $and: [
            { "id_lavatrice": id_lavatrice },
            { "data_inizio": { $gte: (new Date()).getTime() } }
        ]
    });
    let modificati = await slots.updateMany(
        {
            $and: [
                { "id_lavatrice": id_lavatrice },
                { "data_fine": { $gte: (new Date()).getTime() } }
            ]
        },
        { $set: { data_fine: (new Date()).getTime() } },
        { upsert: true }
    );
    console.log("cancellati: ", cancellati);
    console.log("modificati: ", modificati);
}