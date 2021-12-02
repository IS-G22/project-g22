db.slot_liberi.drop();
db.createView(
    "slot_liberi",
    "slots",
    [
        { "$match": { "stato": "libero" } }
    ]
)