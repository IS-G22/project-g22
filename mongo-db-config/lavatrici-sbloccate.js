db.lavatrici_sbloccate.drop();
db.createView(
    "lavatrici_sbloccate",
    "lavatrici",
    [
        { "$match": { $ne: { "stato": "bloccata" } } }
    ]
)