const routes=[
    {path:'/prenotazioni',component:prenotazioni},
    {path:'/guasto',component:guasto},
    {path:'/nuovaprenotazione',component:nuovaprenotazione},
]

const router=new VueRouter({
    routes
})

const app = new Vue({
    router,
    data: {
        isActive: window.location.hash,
        isMenuOpen: false,
        isToggle : false,
        isEng: false,
    },
    methods:{
        setActive: function(){
            this.isActive = window.location.hash;
            this.isMenuOpen = false;
            
        },
        toggleMenu: function(){
            this.isMenuOpen= !this.isMenuOpen;
        },
        toggle: function(){
            this.isToggle= !this.isToggle;
        },
        toggleLanguage: function(){
            this.isEng= !this.isEng;
        }
    },
    mounted:function(){
        this.isActive = window.location.hash;
        
    },
}).$mount('#app')