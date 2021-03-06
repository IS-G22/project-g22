db.prenotazione_tipo_lavaggio.drop();
db.createView(
    "prenotazione_tipo_lavaggio",
    "prenotazioni",
    [
        { $lookup: { from: "tipo-lavaggio", localField: "id_tipo_lavaggio", foreignField: "id", as: "durata" } },
        {
            $set: {
                "durata": { $arrayElemAt: ["$durata.durata", 0] },
                "data_max_fine": {
                    $add: [
                        "$data",
                        {
                            $multiply: [
                                {
                                    $add: [
                                        { $arrayElemAt: ["$durata.durata", 0] },
                                        30
                                    ]
                                },
                                60000
                            ]
                        }
                    ]
                },
                "data_max_apertura_sportello": {
                    $add: [
                        "$data",
                        {
                            $multiply: [
                                15,
                                60000
                            ]
                        }
                    ]
                },
                "data_max_avvio_lavatrice": {
                    $add: [
                        "$data",
                        {
                            $multiply: [
                                30,
                                60000
                            ]
                        }
                    ]
                },
                "data_figa_inizio": {
                    $dateToString: { format: "%d-%m-%Y %H:%M:%S", date: { $toDate: "$data" } }
                },
                "data_figa_fine": {
                    $dateToString: {
                        format: "%d-%m-%Y %H:%M:%S", date: {
                            $toDate: {
                                $add: [
                                    "$data",
                                    {
                                        $multiply: [
                                            {
                                                $add: [
                                                    { $arrayElemAt: ["$durata.durata", 0] },
                                                    30
                                                ]
                                            },
                                            60000
                                        ]
                                    }
                                ]
                            }
                        }
                    }
                }
            }
        }
    ]
)