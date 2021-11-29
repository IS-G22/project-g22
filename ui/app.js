const routes=[
    {path:'/prenotazioni',component:prenotazioni},
]

const router=new VueRouter({
    routes
})

const app = new Vue({
    router,
    data: {
        isActive: -1,
    },
    methods: {
        setActive(nome=0){
            this.isActive=nome;
            console.log(this.isActive);
        }
    }
}).$mount('#app')