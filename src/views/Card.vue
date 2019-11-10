<template>
<!-- cuman buat ngetes card -->
<b-container>
  <div>
  <b-card
    :title="title"
    img-src="https://picsum.photos/300/300/?image=25"
    img-alt="Image"
    img-left
    tag="article"
    class="mb-2"
  >
    <b-card-text>
      Some quick example text to build on the card title and make up the bulk of the card's content.
    </b-card-text>

    <div v-if="status">
        <b-button variant="primary" href="#">{{status}}</b-button>
    </div>
    <div v-else>
        <b-button variant="dark" href="#">{{status}}</b-button>
    </div>
    <!-- <b-button v-bind:style="[status ? {'color': '#FFF'} : {'color' : '#000'}]" href="#">{{status}}</b-button> -->
  </b-card>
</div>
</b-container>
</template>

<script>
import firebase from 'firebase'


export default {
    name: 'card',
    data() {
        return{
            ref: firebase.firestore().collection('merchant').doc('tokosakti@mail.com'),
            status: false,
            title: 'TEST'
        }
    },
    created(){
        
    }

}
</script>

<style>

</style>