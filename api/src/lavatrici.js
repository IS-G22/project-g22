exports.lista = async (_, response) => {
    response.send(await lavatrici.find().toArray());
}

exports.add = async (request, response) => {
    response.send(await lavatrici.insertOne(request.query));
}