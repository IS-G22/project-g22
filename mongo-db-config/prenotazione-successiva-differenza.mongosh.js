db.prenotazione_successiva_differenza.drop();
db.createView(
    "prenotazione_successiva_differenza",
    "prenotazione_prenotazione_successiva",
    [
        {
            $set: {
                "differenza": {
                    $subtract: [
                        { $arrayElemAt: ["$successive.data", 0] },
                        "$data_max_fine"
                    ]
                },
                "data_figa_inizio_successiva": {
                    $dateToString: { format: "%d-%m-%Y %H:%M:%S", date: { $toDate: { $arrayElemAt: ["$successive.data", 0] } } }
                },
                "data_figa_fine": {
                    $dateToString: { format: "%d-%m-%Y %H:%M:%S", date: { $toDate: "$data_max_fine" } }
                }
            }
        }
    ]
)