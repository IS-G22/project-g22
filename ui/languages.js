const languages =
{
    en: {
      giorni:[ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      mesi:["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      menu: {
        prenotazioni: "Reservations",
        guasto: "Reports failure",
        nuovaprenotazione: "New Reservation"
      },
      prenotazioni: {
        titolo:"",
        caricamento:"",
        caricamentofallito:"",
        pren:{
          prenotazione:"",
          lavatrice:"",
          cancella:"",
          apri:"",
        },
        confermacancella:"",
        nuovaprenotazione:"",
        maxpren:"",
      }
    },
    it: {
      giorni:["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"],
      mesi:["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
      menu: {
        prenotazioni: "Prenotazioni",
        guasto: "Segnala guasto",
        nuovaprenotazione: "Nuova Prenotazione"
      },
      prenotazioni: {
        titolo:"Lista Prenotazioni",
        caricamento:"Caricamento Prenotazioni in corso...",
        caricamentofallito:"Ci sta mettendo troppo tempo! L'API potrebbe essere non raggiungibile.",
        pren:{
          prenotazione:"Prenotazione",
          lavatrice:"Lavatrice",
          cancella:"Cancella Prenotazione",
          apri:"APRI SPORTELLO",
        },
        confermatesto:"Sei sicuro che vuoi cancellare questa prenotazione?",
        confermacancella:"Conferma",
        annulla:"Annulla",
        successocancellazione:"La Prenotazione è stata cancellata con successo!",
        fallimentocancellazione:"ERRORE! Non è stato possibile cancellare la prenotazione!",
        nuovaprenotazione:"Effettua nuova Prenotazione",
        maxpren:"Hai raggiunto il numero massimo di Prenotazioni!"
      }
    }
}