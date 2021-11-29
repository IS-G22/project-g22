const prenotazioni = {
    template: `<div class="main">
    <h2>Lista Prenotazioni</h2>
    <div class="list">
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
    </div>
    </div>`,
    data(){
        return{
            prenotazioni:[],
        }
    },
    methods:{
        refreshData(){
            axios.get(variables.API_URL+"prenotazioni/attive/utente?id_utente=1")
            .then((response)=>{
                this.prenotazioni=response.data;
                console.log(this.prenotazioni);
                this.prenotazioni.forEach((el, index, arr)=>{
                    arr[index].formatted_data = formattaData(new Date(el.data));
                    arr[index].formatted_slot = formattaSlot(new Date(el.data), el.durata);
                })
            });
        },
    },
    mounted:function(){
        this.refreshData();
    }
}
