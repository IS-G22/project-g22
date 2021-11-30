const routes=[
    {path:'/prenotazioni',component:prenotazioni},
]

const router=new VueRouter({
    routes
})

const app = new Vue({
    router,
    data: {
        isActive: window.location.hash,
    },
    methods:{
        setActive: function(){
            this.isActive = window.location.hash;
        }
    },
    mounted:function(){
        this.isActive = window.location.hash;
    },
}).$mount('#app')