const lavatrice = {
    props: ['lavatrice'],
    template: `  
    <div class="box">
        <img src="./photo/lavatrice.jpg" class="img-lavatrice"></img>
        <div class="box-info">
            <h5>Lavatrice {{ lavatrice.id }}</h5>
            <p> Stato: {{lavatrice.stato}} </p>
        </div>
        <button @click="toggleClicca">{{this.labelPulsante}}</button>
    </div>`,
    data() {
        return {
            labelPulsante: 'Blocca',
            stato: "c",
            id: 0,
            openStatus:'er'
        }
    },
    methods: {
        toggleClicca: () => {
            let url = '';
            switch (this.lavatrice.stato) {
                case 'bloccata':
                    url = 'sblocca';
                    break;
                default:
                    url = 'blocca';
                    break;
            }
            let timer = setTimeout(() => {
                this.openStatus = 'failure';
            }, 5000);
            axios.get(variables.API_URL + "lavatrici/" + url + "?id_lavatrice=" + this.lavatrice.id)
                .then((response) => {//apri un messaggio a schermo
                    clearTimeout(timer);
                    //console.log(response);
                    if (response.data.status = 'err') {
                        this.openStatus = 'failure';
                    } else {
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
            axios.get("/api/file-statici/lavatrici.json")
                // axios.get(variables.API_URL + "lavatrici")
                .then((response) => {
                    clearTimeout(timer);
                    this.lavatrici = response.data;
                    console.log(this);
                    this.charged = true;
                });
        },
    },
    mounted: function () {
        this.refreshData();
    }
}
