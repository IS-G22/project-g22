db.prenotazione_prenotazione_successiva.drop();
db.createView(
    "prenotazione_prenotazione_successiva",
    "prenotazione_tipo_lavaggio",
    [
        {
            $lookup: {
                from: "prenotazione_tipo_lavaggio",
                let: {
                    data_n: "$data",
                    id_lavatrice_n: "$id_lavatrice"
                },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $gt: ["$$data_n", "$data_max_fine"] },
                                    // { $not: { $gte: ["$$data_n", "$data_max_fine"] } },
                                    { $eq: ["$id_lavatrice", "$$id_lavatrice_n"] },
                                    { $ne: ["$data", "$$data_n"] }
                                ]
                            }
                        }
                    },
                    { $sort: { data: 1 } },
                    { $limit: 10 }
                ],
                as: "successive"
            }
        }
    ]
)
