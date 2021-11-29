const routes=[
    {path:'/prenotazioni',component:prenotazioni},
]

const router=new VueRouter({
    routes
})

const app = new Vue({
    router
}).$mount('#app')