const languages =
{
  en: {
    giorni: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    mesi: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    menu: {
      prenotazioni: "Reservations",
      guasto: "Reports failure",
      nuovaprenotazione: "New Reservation"
    },
    prenotazioni: {
      titolo: "",
      caricamento: "",
      caricamentofallito: "",
      pren: {
        prenotazione: "",
        lavatrice: "",
        cancella: "",
        apri: "",
      },
      confermacancella: "",
      nuovaprenotazione: "",
      maxpren: "",
    }
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
      successocancellazione: "La Prenotazione è stata cancellata con successo!",
      fallimentocancellazione: "ERRORE! Non è stato possibile cancellare la prenotazione!",
      successoapertura: "La Lavatrice è stata aperta con successo!",
      fallimentoapertura: "ERRORE! Non è stato possibile aprire la lavatrice!",
      nuovaprenotazione: "Effettua nuova Prenotazione",
      maxpren: "Hai raggiunto il numero massimo di Prenotazioni!",
      caricamento: "Caricamento in corso..."
    },
    nuovaprenotazione: {
      titolo: "Nuova Prenotazione",
      minuti: "minuti",
      conferma:"Confermare la seguente Prenotazione?",
      buttonconferma:"Conferma Prenotazione",
      successo:"La Prenotazione è stata effettuata con successo!",
      lista:"Torna alla lista delle Prenotazioni",
      max:"Numero massimo di prenotazioni raggiunto!"
    },
    tipolavaggio: ["Rapido", "Delicati", "30 Gradi"],
    lavatrice: { bottone: { bloccata: "Sblocca", sbloccata: "Blocca" } },
    tecnico: { titolo: "Lavatrici" }
  }
}