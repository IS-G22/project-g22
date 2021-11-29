const prenotazioni = {
    template: `<div class="main">
    <h2>Lista Prenotazioni</h2>
    <div class="list">
        <section class="prenotazione" v-for="pren in prenotazioni">
            <div class="box">
                <img src="./photo/lavatrice.jpg" class="img-lavatrice"></img>
                <div class="box-info">
                    <h4>Lavatrice {{pren.id_lavatrice}}</h4>
                    <div>{{pren.formatted_data}}</div>
                </div>
            </div>
        
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
                })
            });
        },
    },
    mounted:function(){
        this.refreshData();
    }
}
