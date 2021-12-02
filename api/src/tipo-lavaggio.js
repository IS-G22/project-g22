exports.list = async (_, response) => {
    response.send(await tipiLavaggio.find().toArray());
}