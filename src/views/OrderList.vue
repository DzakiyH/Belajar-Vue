<template>
<div>
<NavBar/>
<b-container>
    <h2>List Pesanan</h2>

    <div v-for="transaction in transactions" v-bind:key="transaction.key" class="card-container">
        <b-row>
            <b-col>
                <p>Toko</p>
                <p>{{transaction.toko}}</p>
            </b-col>
            <b-col>
                <p>Waktu Pesan</p>
                <p>{{transaction.tanggal}}</p>
            </b-col>
            <b-col>
                <p>Status</p>
                <p>{{transaction.status}}</p>
            </b-col>
        </b-row>
        <hr>
        <b-row class="mt-3 pl-3">
            <h3>{{transaction.fileName}}</h3>
        </b-row>
        <b-row align-h="end">
            <b-col cols="auto">
                <router-link :to="{name: 'OrderDetail', params: {id:transaction.key}}"><button>Detail</button></router-link>
            </b-col>
        </b-row>
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
        this.transactions = [];
        querySnapshot.forEach((doc) => {
            this.transactions.push({
                key: doc.id,
                toko: doc.data().toko,
                tanggal: doc.data().waktuPesan,
                status: doc.data().status,
                fileName: doc.data().fileName
            });
        });
        });
    }
}
</script>

<style>

.card-container{
    background-color:cyan;
    margin-bottom: 30px;
    padding: 8px 20px 8px 20px;
}

.card-container p{
    margin-bottom: 0px;
    padding: 0px;
    text-align: left;
}

</style>