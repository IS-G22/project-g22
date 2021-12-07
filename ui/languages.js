const languages =
{
  en: {
    giorni: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    mesi: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    menu: {
      prenotazioni: "Reservations",
      guasto: "Report failure",
      nuovaprenotazione: "New Reservation",
      tecnico:"Technician"
    },
    prenotazioni: {
      titolo: "Reservations List",
      caricamento: "Loading...",
      caricamentofallito: "Error: taking too much time to load. The API might be currently not reachable.",
      pren: {
        prenotazione: "Reservation",
        lavatrice: "Washing Machine",
        cancella: "Delete Reservation",
        apri: "OPEN DOOR",
      },
      confermatesto: "Are you sure you want to delete this Reservation?",
      confermacancella: "Delete",
      annulla: "Cancel",
      successocancellazione: "Your Reservation has been successfully deleted.",
      fallimentocancellazione: "ERROR: it is not possible to delete the Reservation.",
      successoapertura: "The door has been successfully opened.",
      fallimentoapertura: "ERROR: it is not possible to open the door",
      nuovaprenotazione: "Make a new Reservation",
      maxpren: "ERROR: maximum number of active Reservations has been reached.",
      caricamento: "Loading..."
    },
    nuovaprenotazione: {
      titolo: "New Reservation",
      minuti: "minutes",
      conferma: "Confirm this Reservation?",
      buttonconferma: "Confirm",
      successo: "Your Reservation has been successfully saved.",
      lista: "Go back to the Reservations List",
      max: "ERROR: maximum number of active Reservations has been reached."
    },
    guasto: {
      titolo: "Report failure",
    },
    tipolavaggio: ["", "Fast", "Delicate", "30 Degrees"],
    lavatrice: { bottone: { bloccata: "Unlock", sbloccata: "Lock" } },
    tecnico: { titolo: "Whasing Machines" }
  },
  it: {
    errorapi: "Ci sta mettendo troppo tempo! L'API potrebbe essere non raggiungibile.",
    giorni: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"],
    mesi: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
    menu: {
      prenotazioni: "Prenotazioni",
      guasto: "Segnala guasto",
      nuovaprenotazione: "Nuova Prenotazione",
      tecnico:"Tecnico"
    },
    prenotazioni: {
      titolo: "Lista Prenotazioni",
      caricamento: "Caricamento in corso...",
      caricamentofallito: "Ci sta mettendo troppo tempo! L'API potrebbe essere non raggiungibile.",
      pren: {
        prenotazione: "Prenotazione",
        lavatrice: "Lavatrice",
        cancella: "Cancella Prenotazione",
        apri: "APRI SPORTELLO",
      },
      confermatesto: "Sei sicuro che vuoi cancellare questa prenotazione?",
      confermacancella: "Conferma",
      annulla: "Annulla",
      successocancellazione: "La Prenotazione è stata cancellata con successo",
      fallimentocancellazione: "ERRORE: Non è stato possibile cancellare la prenotazione",
      successoapertura: "Lo sportello è stato aperto con successo!",
      fallimentoapertura: "ERRORE: Non è stato possibile aprire la lavatrice",
      nuovaprenotazione: "Effettua nuova Prenotazione",
      maxpren: "ERRORE: hai raggiunto il numero massimo di Prenotazioni.",
      caricamento: "Caricamento in corso..."
    },
    nuovaprenotazione: {
      titolo: "Nuova Prenotazione",
      minuti: "minuti",
      conferma: "Confermare la seguente Prenotazione?",
      buttonconferma: "Conferma Prenotazione",
      successo: "La Prenotazione è stata effettuata con successo!",
      lista: "Torna alla lista delle Prenotazioni",
      max: "Numero massimo di prenotazioni raggiunto!"
    },
    guasto: {
      titolo: "Segnala un Guasto",
    },
    tipolavaggio: ["", "Rapido", "Delicati", "30 Gradi"],
    lavatrice: { bottone: { bloccata: "Sblocca", sbloccata: "Blocca" } },
    tecnico: { titolo: "Lavatrici" }
  }
}
