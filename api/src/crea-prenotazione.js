var Formatter = require('./tools/formatter')

exports.giorniPrenotabili = async (request, response) => {
    let id_tipo_lavaggio;
    let tipoLavaggio;
    let durata_lavaggio = null;
    if (request.query.id_tipo_lavaggio) {

        id_tipo_lavaggio = parseInt(request.query.id_tipo_lavaggio)
        tipoLavaggio = await tipiLavaggio.findOne({ id: id_tipo_lavaggio });
        durata_lavaggio = tipoLavaggio.durata;

        let data_inizio_ricerca = new Date();
        let data_fine_ricerca = new Date(data_inizio_ricerca.getTime() + 14 * 24 * 60 * 60 * 1000);


        let slots = await database.collection('slot_liberi_attivi').find({
            $and: [
                { "data_inizio": { "$lte": data_fine_ricerca.getTime() - durata_lavaggio } },
                { "data_fine": { "$gte": data_inizio_ricerca.getTime() + durata_lavaggio } },
                { "id_lavatrice": { $in: await lavatrici_sbloccate.distinct('id') } }
            ]
        }).toArray()
        let oggi = new Date(data_inizio_ricerca.getUTCDate());
        let array_giorni = Array.apply(null, { length: 14 }).map((_, number) => {
            let date = new Date(oggi.getTime() + number * 24 * 60 * 60 * 1000);
            return { i: number, display_date: Formatter.asDate(date), date: date }
        });

        array_giorni.filter((value, index) => {
            console.log(value);
            return (slots.some((slot) => {
                console.log(slot)
                return (slot.data_inizio <= value.date.getTime() && slot.data_fine >= value.date.getTime() + durata_lavaggio)
            }));
        })

        response.send(array_giorni);

    } else {
        response.send("Inserisci il parametro <b>id_tipo_lavaggio</b>")
    }
}

exports.slotDisponibili = async (request, response) => {
    if (!global.database) {
        response.send({ error: "DataBase non raggiungibile" })
        return;
    }
    let id_tipo_lavaggio;
    let tipoLavaggio;
    let durata_lavaggio = null;

    let giorno;
    /** 
     * Controllo ci sia l'id del tipo di lavaggio
     */
    if (request.query.id_tipo_lavaggio) {
        id_tipo_lavaggio = parseInt(request.query.id_tipo_lavaggio)
        tipoLavaggio = await tipiLavaggio.findOne({ id: id_tipo_lavaggio });
        durata_lavaggio = tipoLavaggio.durata;
    } else {
        response.send({ error: "Inserisci il parametro <b>id_tipo_lavaggio</b>" })
        return;
    }
    /**
     * Controllo ci sia il giorno
     */
    if (request.query.giorno) {
        /**
         * giorno indica la differenza tra oggi e quando voglio prenotare la lavatrice:
         * 0 -> oggi
         * 1 -> domani
         * 2 -> tra due giorni
         * n -> tra n giorni
         * fino ad un massimo di 14 giorni (due settimane)
         */
        giorno = parseInt(request.query.giorno)
        if (giorno > 14) {
            response.send({ error: "Il campo <b> giorno </b> deve essere compreso tra 0 e 14" });
            return;
        }
    } else {
        response.send({ error: "Inserisci il parametro <b>giorno</b>" })
        return;
    }

    /**
     * cerco gli slot disponibili per questo giorno:
     */

    let tempo_inizio = new Date((new Date()).getTime() + giorno * 24 * 60 * 60 * 1000);

    tempo_inizio = new Date(tempo_inizio.toDateString())
    tempo_inizio.setHours(8);
    let tempo_fine = new Date(tempo_inizio.getTime() + 24 * 60 * 60 * 1000);

    if (giorno == 0) tempo_inizio.setHours((new Date()).getHours() + 1)

    let slots = await database.collection('slot_liberi_attivi').find({
        $and: [
            { "data_inizio": { "$lte": tempo_fine.getTime() - durata_lavaggio } },
            { "data_fine": { "$gte": tempo_inizio.getTime() + durata_lavaggio } },
            { "id_lavatrice": { $in: await lavatrici_sbloccate.distinct('id') } }
        ]
    }).toArray()

    let ora_inizio = tempo_inizio.getHours()
    let numero_slot = 24 - ora_inizio;

    console.log(tempo_inizio)

    let array_slots = Array.apply(null, { length: numero_slot }).map((_, number) => {
        let date = new Date(tempo_inizio.getTime() + number * 60 * 60 * 1000);
        return { i: number, display_date: Formatter.asTime(date), date: date }
    });
    array_slots.filter((value, index) => {
        console.log(value);
        return (slots.some((slot) => {
            console.log(slot)
            return (slot.data_inizio <= value.date.getTime() && slot.data_fine >= value.date.getTime() + durata_lavaggio)
        }));
    })

    response.send(array_slots)
}

exports.creaPrenotazione = async (request, response) => {
    if (!global.database) {
        response.send({ error: "DataBase non raggiungibile" })
        return;
    }
    let id_tipo_lavaggio = -1;
    let durata_lavaggio = -1;
    let slot = -1;
    if ((id_tipo_lavaggio = request.query.id_tipo_lavaggio)) {
        durata_lavaggio = (await tipiLavaggio.findOne({ id: parseInt(id_tipo_lavaggio) })).durata;
        response.send({ durata_lavaggio });
    } else {
        response.send({ error: "Inserisci il parametro <b>id_tipo_lavaggio</b>" })
    }

    if ((slot = request.query.slot)) {
        durata_lavaggio = (await tipiLavaggio.findOne({ id: parseInt(id_tipo_lavaggio) })).durata;
        response.send({ durata_lavaggio });
    } else {
        response.send({ error: "Inserisci il parametro <b>id_tipo_lavaggio</b>" })
    }

}