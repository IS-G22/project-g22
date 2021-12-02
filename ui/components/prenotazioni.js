const prenotazioni = {
    template: `<div class="main-content">
    <h2 class="main-title">{{ $t("prenotazioni.titolo") }}</h2>
    <hr></hr>
    <div class="list" v-if="charged">
        <section class="prenotazione" v-for="pren in prenotazioni">
            <div class="box">
                <img src="./photo/lavatrice.jpg" class="img-lavatrice"></img>
                <div class="box-info">
                    <h4>{{ $t("prenotazioni.pren.prenotazione") }} {{pren.id}}</h4>
                    <h5>{{ $t("prenotazioni.pren.lavatrice") }} {{pren.id_lavatrice}}</h5>
                    <div>{{$t("giorni")[pren.formatted_day]}} {{pren.formatted_date}} {{$t("mesi")[pren.formatted_month]}} {{pren.formatted_year}}</div>
                    <div class="slot">{{pren.formatted_slot}}</div>
                </div>
            </div>
            <div class="delete" @click="cancella(pren.id)">{{ $t("prenotazioni.pren.cancella") }}</div>
            <div class="open" @click="apriSportello(pren.id)">{{ $t("prenotazioni.pren.apri") }}</div>
        
        </section>
        <button v-if="full" class="new-prenot">
            <router-link to="/nuovaprenotazione" class="menutext">{{ $t("prenotazioni.nuovaprenotazione") }}</router-link>
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
                    arr[index].formatted_day = (new Date(el.data)).getDay();
                    arr[index].formatted_date = (new Date(el.data)).getDate();
                    arr[index].formatted_month = (new Date(el.data)).getMonth();
                    arr[index].formatted_year = (new Date(el.data)).getFullYear();
                    arr[index].formatted_slot = formattaSlot(new Date(el.data), el.durata);
                })
                if(this.prenotazioni.lenght<2){
                    this.full= false;
                }else{this.full=true}


                this.charged=true;
            });
        },
        apriSportello(id){
            axios.get(variables.API_URL+"lavatrici/apri?id_prenotazione="+id)
            .then((response)=>{//apri un messaggio a schermo
                console.log(response.data);
            })
        },
        cancella(id){
            console.log(id);
        }
    },
    mounted:function(){
        this.refreshData();
    }
}
