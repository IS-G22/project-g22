db.slot_liberi_attivi.drop();
db.createView(
    "slot_liberi_attivi",
    "slot_liberi",
    [
        {
            "$match": {
                "$and": [
                    { "stato": "libero" },
                    { "data_fine": { "$gte": new Date().getTime() } },
                ]
            }
        }
    ]
)