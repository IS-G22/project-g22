Vue.component('toggle',{
    props:['prop', 'funzione'],

    template: 
    `<div class="toggle" @click="funzione" v-bind:class="[prop==true ? 'toggle-on' : '']">
        <div class="bubble" v-bind:class="[prop==true ? 'bubble-on' : '']"></div>
    </div>`,
    mounted:function(){
        console.log(this.funzione);
    }
})