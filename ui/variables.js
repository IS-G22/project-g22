const variables ={
    API_URL:"http://localhost:49146/api/",
}

function formattaData(data){
    const giorno =["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"];
    const mese=["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
    return `${giorno[data.getDay()]} ${data.getDate()} ${mese[data.getMonth()]} ${data.getFullYear()}`;
}

function formattaSlot(data_init, durata){
    let data_fine = new Date(data_init.getTime() + durata*60000);
    return `${data_init.getHours()}:${data_init.getSeconds()} - ${data_fine.getHours()}:${data_fine.getSeconds()}`;
}