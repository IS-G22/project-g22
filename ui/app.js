const routes = [
    { path: '/prenotazioni', component: prenotazioni },
    { path: '/guasto', component: guasto },
    { path: '/nuovaprenotazione', component: nuovaprenotazione },
    { path: '/tecnico', component: viewTecnico },
]

const router = new VueRouter({
    routes
})

// Ready translated locale messages

// Create VueI18n instance with options
const i18n = new VueI18n({
    locale: 'it', // set locale
    messages: languages, // set locale messages
})

const app = new Vue({
    i18n,
    router,
    data: {
        isActive: window.location.hash,
        isMenuOpen: false,
        isToggle: false,
        isEng: false,
    },
    methods: {
        setActive: function () {
            this.isActive = window.location.hash;
            this.isMenuOpen = false;

        },
        toggleMenu: function () {
            this.isMenuOpen = !this.isMenuOpen;
        },
        toggle: function () {
            this.isToggle = !this.isToggle;
        },
        toggleLanguage: function () {
            //manca localstorage
            //console.log(i18n.locale)
            if (i18n.locale == 'it') {
                i18n.locale = 'en';
            } else {
                i18n.locale = 'it';
            }
            this.isEng = !this.isEng;
        }
    },
    mounted: function () {
        this.isActive = window.location.hash;

    },
}).$mount('#app')