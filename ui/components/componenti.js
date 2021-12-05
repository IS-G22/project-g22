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


Vue.component('modal',{
    props:['isModalOpen', 'closeModal'],

    template: 
    `<div class="background-modal" v-bind:class="[isModalOpen==true ? 'background-modalon' : '']" @click="closeModal">
        <div class="modal-box" v-bind:class="[isModalOpen==true ? 'modal-box-on' : '']" @click="(event)=>{event.stopPropagation()}"><slot></slot></div>
    </div>`,
    mounted:function(){
       //console.log(this.isModalOpen);
    }
})