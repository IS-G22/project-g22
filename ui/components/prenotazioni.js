const prenotazioni = {
    template: `<div class="main-content">
    <h2 class="main-title">{{ $t("prenotazioni.titolo") }}</h2>
    <hr></hr>
    <div class="list" v-if="fullStatus=='ready'">
        <section class="prenotazione" v-for="pren in prenotazioni">
            <div class="box">
                <img src="./photo/lavatrice.jpg" class="img-lavatrice"></img>
                <div class="box-info">
                    <h5>{{ $t("prenotazioni.pren.lavatrice") }} {{pren.id_lavatrice}}</h5>
                    <h4>{{ $t("tipolavaggio")[pren.id_tipo_lavaggio] }}</h4>    
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
                <div class="box2" v-if="openStatus=='success'">
                    <p>{{$t("prenotazioni.successoapertura")}}</p><button class="new-prenot" @click="toggleSportello">{{$t("prenotazioni.confermacancella")}}</button>
                </div>
                <div class="box2" v-if="openStatus=='failure'">
                    <p>{{$t("prenotazioni.fallimentoapertura")}}</p><button class="new-prenot" @click="toggleSportello">{{$t("prenotazioni.confermacancella")}}</button>
                </div>
            </modal>
        
        </section>
        <button v-if="full" class="new-prenot">
            <router-link to="/nuovaprenotazione" onClick="app.setActive()" class="menutext">{{ $t("prenotazioni.nuovaprenotazione") }}</router-link>
        </button>
        <div v-else class="full">{{ $t("prenotazioni.maxpren") }}</div>

        
    </div>
        <div class="list centrated" v-if="fullStatus=='charging'">
            <lottie-player src="./lottie/loading.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop autoplay></lottie-player>
            <span id="caricamento">{{ $t("prenotazioni.caricamento") }}</span>
        </div>
        <div class="list" v-if="fullStatus=='failure'">
        <p class="red ordered">{{ $t("errorapi")}}</p>
        </div>
    </div>`,
    data(){
        return{
            prenotazioni:[],
            fullStatus:'charging',
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
            this.fullStatus='charging';
            let timer = setTimeout(()=>{
                this.fullStatus='failure';
            },5000);
            axios.get(variables.API_URL+"prenotazioni/attive/utente?id_utente="+variables.ID_UTENTE)
            .then((response)=>{
                clearTimeout(timer);
                this.fullStatus='ready';
                this.prenotazioni=response.data;
                console.log(this.prenotazioni);
                this.prenotazioni.forEach((el, index, arr)=>{
                    let data = new Date(el.data_inizio);
                    let data2 = new Date(el.data_fine);
                    arr[index].formatted_day = (data).getDay();
                    arr[index].formatted_date = (data).getDate();
                    arr[index].formatted_month = (data).getMonth();
                    arr[index].formatted_year = (data).getFullYear();
                    arr[index].formatted_slot = formattaSlot(data, data2);
                })
                if(this.prenotazioni.length<2){
                    this.full= true;
                }else{this.full=false}


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
            axios.delete(variables.API_URL+"prenotazioni/cancella?id_prenotazione="+this.deletePrenotazione)
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
            let timer = setTimeout(()=>{
                this.openStatus='failure';
            },5000);
            axios.get(variables.API_URL+"lavatrici/apri?id_prenotazione="+prenotazione)
            .then((response)=>{//apri un messaggio a schermo
                clearTimeout(timer);
                //console.log(response);
                if(response.data.status='err'){
                    this.openStatus='failure';
                }else{
                    this.openStatus='success';
                }

            })
        },
    },
    mounted:function(){
        this.refreshData();
    }
}
