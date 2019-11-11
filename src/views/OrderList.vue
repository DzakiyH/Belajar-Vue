<template>
<div>
<NavBar/>
<b-container>
    <h2>List Pesanan</h2>

    <div v-for="transaction in transactions" v-bind:key="transaction.key">
        <p>kamu pesan di "{{transaction.toko}}" saat {{transaction.tanggal}}</p>
    </div>
</b-container>
</div>
</template>

<script>
import firebase from 'firebase'
import NavBar from '@/components/NavBar.vue'

export default {
    name: 'OrderList',
    components: {
        NavBar
    },
    data(){
        return{
            transactionRef: firebase.firestore().collection('transaction'),
            user: firebase.auth().currentUser.email,
            transactions: []
        }
    },
    created(){
        this.transactionRef.where('client','==', this.user).onSnapshot((querySnapshot) => {
        this.transaction = [];
        querySnapshot.forEach((doc) => {
            this.transactions.push({
                key: doc.id,
                toko: doc.data().toko,
                tanggal: doc.data().waktuPesan
            });
        });
        });
    }
}
</script>

<style>

</style>