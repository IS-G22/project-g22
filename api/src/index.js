console.log("Hello World!");

require('dotenv').config('./.env');

const CONNECTION_STRING = "mongodb+srv://admin:"+process.env.DB_PASSWORD+"@lavandry.nmnxj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
