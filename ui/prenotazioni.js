const prenotazioni = {
    template: `<div>
    <h2>Lista Prenotazioni</h2>
    
    
    
    
    
    
    
    
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
            });
        },
    },
    mounted:function(){
        this.refreshData();
    }
}