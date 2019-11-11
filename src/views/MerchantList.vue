<template>
  <b-container>
      <h2>
        Daftar Toko
        <!-- <b-link href="#/add-board">(Add Board)</b-link> -->
      </h2>
           
    <b-row>
      <b-col>
        <div v-for="item in items" v-bind:key="item.key">
          <b-card>
          <p>"{{item.nama}}"</p>
          <p>lokasi: {{item.alamat}} <a v-bind:href="''+item.map+''" target="_blank">Cek di maps</a></p>
          <button v-on:click="order(item)">Print</button>
          </b-card>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

import firebase from 'firebase'
// import router from 'vue-router'

export default {
  name: 'BoardList',
  data () {
    return {
      items: [],
      errors: [],
      ref: firebase.firestore().collection('merchant'),
    }
  },
  created () {
    this.ref.onSnapshot((querySnapshot) => {
      this.items = [];
      querySnapshot.forEach((doc) => {
        this.items.push({
          key: doc.id,
          nama: doc.data().nama,
          alamat: doc.data().alamat,
          nomor: doc.data().nomorhp,
          status: doc.data().status,
          map: doc.data().map
        });
      });
    });
  },
  methods: {
    order (item) {
      this.$router.push({ name: 'order', params: { id: item.key }})
    },
  }
}
</script>

<style>

</style>