const variables ={
    API_URL:"http://localhost:49146/api/",
}

function addZero(min){
    if(min<=9){
        return '0'+min;
    }else{
        return min;
    }
}

function formattaSlot(data_init, data_fine){
    let minuti_init=data_init.getMinutes();
    let minuti_fine=data_fine.getMinutes();
    return `${data_init.getHours()}:${addZero(minuti_init)} - ${data_fine.getHours()}:${addZero(minuti_fine)}`;
}