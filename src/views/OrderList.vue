<template>
<b-container>
    <h2>List Pesanan</h2>

    <div v-for="transaction in transactions" v-bind:key="transaction.key">
        <p>kamu pesan di "{{transaction.toko}}" saat {{transaction.tanggal}}</p>
    </div>
</b-container>
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'OrderList',
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