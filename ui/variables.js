const variables ={
    API_URL:"http://localhost:49146/api/",
}

function formattaData(data){
    let giorno;
    switch(data.getDay()){
        case 0:giorno="Lunedì"; break;
        case 1:giorno="Martedì"; break;
        case 2:giorno="Mercoledì"; break;
        case 3:giorno="Giovedì"; break;
        case 4:giorno="Venerdì"; break;
        case 5:giorno="Sabato"; break;
        case 6:giorno="Domenica"; break;
        default:giorno="Boh";
    }
    return giorno;
}