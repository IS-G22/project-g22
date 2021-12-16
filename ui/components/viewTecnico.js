const lavatrice = {
    props: ['lavatrice'],
    template: `  
    <div class="prenotazione" v-bind:class="[lavatrice.stato=='bloccata' ? 'layout-bloccata' : 'layout-sbloccata']">
        <div class="box">
        <img src="./photo/lavatrice.jpg" class="img-lavatrice"></img>
        <div class="box-info">
            <h5>Lavatrice {{ lavatrice.id }}</h5>
            <p> Stato: {{lavatrice.stato}} </p>
        </div>
        <button @click="toggleClicca" class="btn btn-lavatrice" v-bind:class="[lavatrice.stato=='bloccata' ? 'bloccata' : 'sbloccata']">{{ $t("lavatrice.bottone." +lavatrice.stato)}}</button>
        </div>
    </div>`,
    data() {
        return {
            labelPulsante: 'Blocca',
            openStatus: 'er'
        }
    },
    methods: {
        toggleClicca() {
            let url = '';
            console.log(this)
            switch (this.lavatrice.stato) {
                case 'bloccata':
                    url = 'sblocca';
                    break;
                default:
                    url = 'blocca';
                    break;
            }
            this.openStatus="charging"
            let timer = setTimeout(() => {
                this.openStatus = 'failure';
            }, 5000);
            axios.post(variables.API_URL + "lavatrici/" + url + "?id_lavatrice=" + this.lavatrice.id)
                .then((response) => {
                    clearTimeout(timer);
                    //console.log(response);
                    if (response.data.status == 'err') {
                        this.openStatus = 'failure';
                        //console.log("e", this.lavatrice.stato)

                    } else {
                        if (response.data.stato) {
                            this.lavatrice.stato = response.data.stato;
                        }
                        console.log(this.lavatrice.stato)
                        this.openStatus = 'success';
                        
                    }
                })
        }
    },
    mounted: function () {

    }

}


const viewTecnico = {
    template: `<div class="main-content">
    <h2 class="main-title">{{ $t("tecnico.titolo") }}</h2>
    <hr></hr>
    <div class="list" v-if="charged">
        <lavatrice v-for="lavatrice in lavatrici"  v-bind:lavatrice="lavatrice" v-bind:key="lavatrice.id">
        </lavatrice>    
    </div>
        <div class="list centrated" v-else="charged">
            <lottie-player src="./lottie/loading.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop autoplay></lottie-player>
            <span id="caricamento">{{ $t("prenotazioni.caricamento") }}</span>
        </div>
    </div>`,
    components: {
        'lavatrice': lavatrice,
    },
    data() {
        return {
            lavatrici: [],
            charged: false,
        }
    },
    methods: {
        refreshData() {
            //timer per aspettare 
            let timer = setTimeout(() => {
                document.getElementById("caricamento").innerHTML = "<div class='red ordered'>Ci sta mettendo troppo tempo! L'API potrebbe essere non raggiungibile.</div>";
            }, 5000);
            axios.get(variables.API_URL + "lavatrici")
                .then((response) => {
                    clearTimeout(timer);
                    this.lavatrici = response.data;
                    //console.log(this.lavatrici);
                    this.lavatrici.sort((first,second)=>{
                        return first.stato>second.stato ? -1 : 1})
                    this.charged = true;
                });
        },
    },
    mounted: function () {
        this.refreshData();
    }
}
