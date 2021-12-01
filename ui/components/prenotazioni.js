const prenotazioni = {
    template: `<div class="main-content">
    <h2 class="main-title">Lista Prenotazioni</h2>
    <hr></hr>
    <div class="list" v-if="charged">
        <section class="prenotazione" v-for="pren in prenotazioni">
            <div class="box">
                <img src="./photo/lavatrice.jpg" class="img-lavatrice"></img>
                <div class="box-info">
                    <h4>Prenotazione {{pren.id}}</h4>
                    <h5>Lavatrice {{pren.id_lavatrice}}</h5>
                    <div>{{pren.formatted_data}}</div>
                    <div class="slot">{{pren.formatted_slot}}</div>
                </div>
            </div>
            <div class="delete">Cancella Prenotazione</div>
            <div class="open">APRI SPORTELLO</div>
        
        </section>
        <button v-if="full" class="new-prenot">
            <router-link to="/nuovaprenotazione" class="menutext">Effettua nuova Prenotazione</router-link>
        </button>
        <div v-else class="full">Hai raggiunto il numero massimo di Prenotazioni!</div>

        
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
                console.log(this);
                this.prenotazioni.forEach((el, index, arr)=>{
                    arr[index].formatted_data = formattaData(new Date(el.data));
                    arr[index].formatted_slot = formattaSlot(new Date(el.data), el.durata);
                })
                if(this.prenotazioni.lenght<2){
                    this.full= false;
                }else{this.full=true}


                this.charged=true;
            });
        },
    },
    mounted:function(){
        this.refreshData();
        console.log(this.data)
    }
}
