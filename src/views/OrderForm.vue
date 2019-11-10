<template>
<b-container>
    <h2>Form Pesan</h2><br>
  <b-row>
      <b-col> Nama Toko: </b-col>
    <b-col> {{merchant.nama}} </b-col>
  </b-row>
  <b-row>
      <b-col> Alamat Toko: </b-col>
    <b-col> {{merchant.alamat}} </b-col>
  </b-row>
</b-container>
</template>

<script>

import firebase from 'firebase'

export default {
  name: 'ShowBoard',
  data () {
    return {
      key: '',
      merchant: {},
    }
  },
  created () {
    const ref = firebase.firestore().collection('merchant').doc(this.$route.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.key = doc.id;
        this.merchant = doc.data();
      } else {
        alert("No such document!");
      }
    });
  },
  methods: {
  }
}
</script>

<style>
  .jumbotron {
    padding: 2rem;
  }
  .edit-btn {
    margin-right: 20px;
    width: 70px;
  }
</style>