const prenotazioni = {
    template: `<div class="main-content">
    <h2 class="main-title">{{ $t("prenotazioni.titolo") }}</h2>
    <hr></hr>
    <div class="list" v-if="charged">
        <section class="prenotazione" v-for="pren in prenotazioni">
            <div class="box">
                <img src="./photo/lavatrice.jpg" class="img-lavatrice"></img>
                <div class="box-info">
                    <h4>{{ $t("prenotazioni.pren.prenotazione") }}</h4>
                    <h5>{{ $t("prenotazioni.pren.lavatrice") }} {{pren.id_lavatrice}}</h5>
                    <div>{{$t("giorni")[pren.formatted_day]}} {{pren.formatted_date}} {{$t("mesi")[pren.formatted_month]}} {{pren.formatted_year}}</div>
                    <div class="slot">{{pren.formatted_slot}}</div>
                </div>
            </div>
            <div class="delete" @click="toggleCancellaSpecial(pren._id)">{{ $t("prenotazioni.pren.cancella") }}</div>

            <modal v-bind:closeModal="toggleCancella" v-bind:isModalOpen="deleteModalOpen">
                <div class="box2" v-if="deleteStatus=='wait'">
                    <p>{{$t("prenotazioni.confermatesto")}}</p>
                    <div>
                        <button @click="confirmCancella" class="new-prenot backred">{{$t("prenotazioni.confermacancella")}}</button><button class="new-prenot" @click="toggleCancella">{{$t("prenotazioni.annulla")}}</button>
                    </div>
                </div>
                <div class="box2" v-if="deleteStatus=='deleting'">
                    <lottie-player src="./lottie/loading.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop autoplay></lottie-player>
                </div>
                <div class="box2" v-if="deleteStatus=='success'">
                    <p>{{$t("prenotazioni.successocancellazione")}}</p><button class="new-prenot" @click="toggleCancella">{{$t("prenotazioni.confermacancella")}}</button>
                </div>
                <div class="box2" v-if="deleteStatus=='failure'">
                    <p>{{$t("prenotazioni.fallimentocancellazione")}}</p><button class="new-prenot" @click="toggleCancella">{{$t("prenotazioni.confermacancella")}}</button>
                </div>

            </modal>

            <div class="open" @click="apriSportello(pren._id)">{{ $t("prenotazioni.pren.apri") }}</div>
            
            <modal v-bind:closeModal="toggleSportello" v-bind:isModalOpen="openModalOpen">
                <div class="box2" v-if="openStatus=='opening'">
                    <lottie-player src="./lottie/loading.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop autoplay></lottie-player>
                </div>
            </modal>
        
        </section>
        <button v-if="full" class="new-prenot">
            <router-link to="/nuovaprenotazione" onClick="app.setActive()" class="menutext">{{ $t("prenotazioni.nuovaprenotazione") }}</router-link>
        </button>
        <div v-else class="full">{{ $t("prenotazioni.maxpren") }}</div>

        
    </div>
        <div class="list centrated" v-else="charged">
            <lottie-player src="./lottie/loading.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop autoplay></lottie-player>
            <span id="caricamento">Caricamento prenotazioni in corso...</span>
        </div>
    </div>`,
    data(){
        return{
            prenotazioni:[],
            full:false,
            charged:false,
            deleteModalOpen:false,
            deletePrenotazione:0,
            deleteStatus:'wait',
            openModalOpen:false,
            openStatus:'wait'
        }
    },
    methods:{
        refreshData(){
            //timer per aspettare 
            let timer = setTimeout(()=>{
                document.getElementById("caricamento").innerHTML="<div class='red ordered'>Ci sta mettendo troppo tempo! L'API potrebbe essere non raggiungibile.</div>";
            },5000);
            axios.get(variables.API_URL+"prenotazioni/attive/utente?id_utente=1")
            .then((response)=>{
                clearTimeout(timer);
                this.prenotazioni=response.data;
                //console.log(this);
                this.prenotazioni.forEach((el, index, arr)=>{
                    console.log(el)
                    let data = new Date(el.data_inizio);
                    let data2 = new Date(el.data_fine);
                    arr[index].formatted_day = (data).getDay();
                    arr[index].formatted_date = (data).getDate();
                    arr[index].formatted_month = (data).getMonth();
                    arr[index].formatted_year = (data).getFullYear();
                    arr[index].formatted_slot = formattaSlot(data, data2);
                })
                if(this.prenotazioni.lenght<2){
                    this.full= false;
                }else{this.full=true}


                this.charged=true;
            });
        },
        cancella(id){
            console.log(id);
        },
        toggleCancella(){
            this.deleteModalOpen = !this.deleteModalOpen; 
            //console.log(this.deleteModalOpen);
        },
        toggleCancellaSpecial(prenotazione){
            this.deleteModalOpen = !this.deleteModalOpen;
            this.deleteStatus='wait';
            this.deletePrenotazione=prenotazione;
        },
        confirmCancella(){
            this.deleteStatus='deleting';
            let timer = setTimeout(()=>{
                this.deleteStatus='failure';
            },5000);
            axios.post(variables.API_URL+"prenotazioni/cancella?id_prenotazione="+this.deletePrenotazione)
            .then((response)=>{
                clearTimeout(timer);
                console.log(response.data);//comunica che la prenotazione è stata cancellata con successo


                this.deleteStatus='success';
                this.refreshData();//ricarica la prenotazione
            })
        },
        toggleSportello(){
            this.openModalOpen = !this.openModalOpen; 
            //console.log(this.deleteModalOpen);
        },
        apriSportello(prenotazione){
            this.openModalOpen = !this.openModalOpen;
            this.openStatus='opening';
            this.deletePrenotazione=prenotazione;
            axios.get(variables.API_URL+"lavatrici/apri?id_prenotazione="+prenotazione)
            .then((response)=>{//apri un messaggio a schermo
                console.log(response);

            })
        },
    },
    mounted:function(){
        this.refreshData();
    }
}
