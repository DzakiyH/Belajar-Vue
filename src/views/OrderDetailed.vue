<template>
<div>
    <NavBar/>
    <b-container>
        <p>{{order.client}} pesan di {{order.toko}}</p>
    </b-container>
</div>
</template>

<script>
import firebase from 'firebase'
import NavBar from '@/components/NavBar.vue'

export default {
    name: 'orderDetailed',
    components:{
        NavBar
    },
    data(){
        return{
            order: {}
        }
    },
    created(){
        const ref = firebase.firestore().collection('transaction').doc(this.$route.params.id);
        ref.get().then((doc) => {
            if (doc.exists) {
                this.key = doc.id;
                this.order = doc.data();
            } else {
                alert("No such document!");
            }
        })
    }
}
</script>

<style>

</style>