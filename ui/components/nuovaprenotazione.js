const nuovaprenotazione = {
    template:`<div class="main-content">
    <h2 class="main-title">{{ $t("nuovaprenotazione.titolo") }}</h2>
    <hr></hr>
    <div class="list" v-if="fullStatus=='charging'">
        <lottie-player src="./lottie/loading.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop autoplay></lottie-player>
        <span id="caricamento">{{ $t("prenotazioni.caricamento") }}</span>
    </div>
    <div class="list" v-if="fullStatus=='failure'">
        <p class="red ordered">{{ $t("errorapi")}}</p>
    </div>
    <div class="list" v-if="fullStatus=='full'">
        <h3>{{ $t("nuovaprenotazione.max") }}</h3>
        <button class="new-prenot">
            <router-link to="/prenotazioni" onClick="app.setActive()" class="menutext">{{$t("nuovaprenotazione.lista")}}</router-link>    
        </button>
    </div>
    <div class="list" v-if="fullStatus=='ready'">
        <h3>Scegli il tipo di lavaggio che vuoi effettuare:</h3>
        <div v-for="lavaggio in tipo_lavaggio">
            <div  class="lavaggio" @click="selectLavaggio(lavaggio)">
                <div>{{ lavaggio.nome }}</div> <div>{{lavaggio.durata}} {{$t("nuovaprenotazione.minuti")}}</div><span>></span>
            </div>
        </div>
    </div>
    <div class="list" v-if="fullStatus=='setdays'">
        <div class="back" @click="backToStart"><span><</span></div>
        <div  class="lavaggio">
            <div>{{ tipo_lavaggio_selezionato.nome }}</div> <div>{{tipo_lavaggio_selezionato.durata}} {{$t("nuovaprenotazione.minuti")}}</div>
        </div>
        <h3>Seleziona il giorno:</h3>
        <div v-for="giorno in giorni_disponibili">
            <div  class="lavaggio" @click="selectGiorno(giorno)">
                <div>{{$t("giorni")[giorno.formatted_day]}} {{giorno.formatted_date}} {{$t("mesi")[giorno.formatted_month]}}</div> <span>></span>
            </div>
        </div>
    </div>
    <div class="list" v-if="fullStatus=='setinterval'">
        <div class="back" @click="backToDays"><span><</span></div>
        <div  class="lavaggio">
            <div>{{ tipo_lavaggio_selezionato.nome }}</div> <div>{{tipo_lavaggio_selezionato.durata}} {{$t("nuovaprenotazione.minuti")}}</div>
        </div>
        <div  class="lavaggio">
            <div>{{$t("giorni")[giorno_selezionato.formatted_day]}} {{giorno_selezionato.formatted_date}} {{$t("mesi")[giorno_selezionato.formatted_month]}}</div>
        </div>

        <h3>Seleziona  l'ora:</h3>
        <div v-for="slot in slot_disponibili">
            <div  class="lavaggio" @click="selectSlot(slot)">
                <div>{{slot.formatted_slot}}</div> <span>></span>
            </div>
        </div>
    </div>
    <div class="list" v-if="fullStatus=='summary'">
        <div class="back" @click="backToSlots"><span><</span></div>
        <div  class="lavaggio">
            <div>{{ tipo_lavaggio_selezionato.nome }}</div> <div>{{tipo_lavaggio_selezionato.durata}} {{$t("nuovaprenotazione.minuti")}}</div>
        </div>
        <div  class="lavaggio">
            <div>{{$t("giorni")[giorno_selezionato.formatted_day]}} {{giorno_selezionato.formatted_date}} {{$t("mesi")[giorno_selezionato.formatted_month]}}</div>
        </div>
        <div  class="lavaggio">
            <div>{{slot_selezionato.formatted_slot}}</div>
        </div>
        <h3>{{$t("nuovaprenotazione.conferma")}}</h3>
        <button class="new-prenot" @click="confermaPrenotazione">{{$t("nuovaprenotazione.buttonconferma")}}</button>
    </div>
    <div class="list" v-if="fullStatus=='end'">
        <h3>{{$t("nuovaprenotazione.successo")}}</h3>
        <button class="new-prenot">
            <router-link to="/prenotazioni" onClick="app.setActive()" class="menutext">{{$t("nuovaprenotazione.lista")}}</router-link>    
        </button>
    </div>
    </div>
    `,
    data(){
        return{
            full:false,
            fullStatus:'charging',
            tipo_lavaggio:[],
            tipo_lavaggio_selezionato:{},
            giorni_disponibili:[],
            giorno_selezionato:{},
            slot_disponibili:[],
            slot_selezionato:{},
        }
    },
    methods:{
        refreshData(){
            //timer per aspettare 
            this.fullStatus='charging';
            let timer = setTimeout(()=>{
                this.fullStatus='failure';
            },5000);
            axios.get(variables.API_URL+"prenotazioni/attive/utente?id_utente="+variables.ID_UTENTE)
            .then((response)=>{
                clearTimeout(timer);
                //console.log(response.data)
                if(response.data.length<2){
                    this.full= false;
                    //prendi tutti i tipi di lavaggio
                    axios.get(variables.API_URL+"tipo-lavaggio")
                    .then((response)=>{
                        this.tipo_lavaggio=response.data;
                        this.fullStatus='ready';
                        //console.log(this.tipo_lavaggio)
                    })
                }else{this.full=true; this.fullStatus='full';}
            });
        },
        selectLavaggio(id){
            this.tipo_lavaggio_selezionato=id;
            this.fullStatus='charging';
            let timer = setTimeout(()=>{
                this.fullStatus='failure';
            },5000);
            axios.get(variables.API_URL+"giorni-prenotabili?id_tipo_lavaggio="+this.tipo_lavaggio_selezionato.id)
            .then((response)=>{
                clearTimeout(timer);
                this.giorni_disponibili=response.data;
                //formattiamo i giorni!
                let oggi = new Date();
                this.giorni_disponibili.forEach((element, index, arr) => {
                    let giorno= oggi.addDays(element.giorno);
                    arr[index].formatted_day = giorno.getDay();
                    arr[index].formatted_date = giorno.getDate();
                    arr[index].formatted_month = giorno.getMonth();
                });
                this.fullStatus='setdays';
                //console.log(response);
            });
        },
        selectGiorno(giorno){
            this.giorno_selezionato=giorno;
            this.fullStatus='charging';
            let timer = setTimeout(()=>{
                this.fullStatus='failure';
            },5000);
            axios.get(variables.API_URL+"slot-disponibili?id_tipo_lavaggio="+this.tipo_lavaggio_selezionato.id+"&giorno="+this.giorno_selezionato.giorno)
            .then((response)=>{
                clearTimeout(timer);
                //SISTEMARE L'API!
                //console.log(response.data)
                this.slot_disponibili=response.data;
                this.slot_disponibili.forEach((slot, index, array)=>{
                    array[index].formatted_slot = formattaSlotPrenotazione(new Date(slot.slot));
                })
                this.fullStatus='setinterval';
            });
        },
        selectSlot(slot){
            this.slot_selezionato=slot;
            this.fullStatus='summary';
        },
        backToStart(){
            this.fullStatus='ready';
        },
        backToDays(){
            this.fullStatus='setdays';
        },
        backToSlots(){
            this.fullStatus='setinterval';
        },
        confermaPrenotazione(){
            this.fullStatus='charging';
            let timer = setTimeout(()=>{
                this.fullStatus='failure';
            },5000);
            axios.post(variables.API_URL+"crea-prenotazione?id_tipo_lavaggio="+this.tipo_lavaggio_selezionato.id+"&slot="+this.slot_selezionato.slot+"&id_utente="+variables.ID_UTENTE)
            .then((response)=>{
                clearTimeout(timer);
                //console.log(response.data);
                this.fullStatus="end";
            })
        }
    },
    mounted:function(){
        this.refreshData();
    }
}




/*
1: controlla se l'utente ha meno di 2 prenotazioni attive
2: mostra i tipi di lavaggio selezionabili

*/