const variables ={
    API_URL:"http://localhost:49146/api/",
}

function formattaSlot(data_init, durata){
    let data_fine = new Date(data_init.getTime() + durata*60000);
    return `${data_init.getHours()}:${data_init.getSeconds()} - ${data_fine.getHours()}:${data_fine.getSeconds()}`;
}