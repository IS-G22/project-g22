var Formatter = require('./tools/formatter')

exports.giorniPrenotabili = async (request, response) => {
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
        return { i: number, display_date: Formatter.asDate(date), date: date }
    });
    response.send(JSON.stringify(a));
}


exports.giorniPrenotabiliV2 = async (request, response) => {
    let id_tipo_lavaggio;
    let tipoLavaggio;
    let durata_lavaggio = null;
    if (request.query.id_tipo_lavaggio) {

        id_tipo_lavaggio = parseInt(request.query.id_tipo_lavaggio)
        console.log(id_tipo_lavaggio)
        tipoLavaggio = await tipiLavaggio.findOne({ id: id_tipo_lavaggio });
        durata_lavaggio = tipoLavaggio.durata;
        console.log(tipoLavaggio);

        let oggi = new Date();
        let a = Array.apply(null, { length: 14 }).map((_, number) => {
            let date = new Date(oggi.getTime() + number * 24 * 60 * 60 * 1000);
            return { i: number, display_date: Formatter.asDate(date), date: date }
        });

        let data_inizio_oggi = oggi.getTime();
        let data_fine_oggi = (new Date(oggi.getTime() + 24 * 60 * 60 * 1000)).getTime();
        let aa = await database.collection('prenotazione_successiva_differenza').distinct('id_lavatrice',
            {
                $or: [
                    { differenza: { $gte: (durata_lavaggio + 30) * 60 * 1000 } },
                    { differenza: null }
                ],
                date: { "$gte": data_inizio_oggi, "$lt": data_fine_oggi }
            }
        );

        console.log(aa)
        // let json = await aa.toArray();
        let json = aa;
        response.send(json);
        console.log(json);

    } else {
        response.send("Inserisci il parametro <b>id_tipo_lavaggio</b>")
    }
}