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
    
    <!-- <b-modal ref="my-modal" hide-footer title= "Modal">
      <div class="d-block text-center">
        <h3>Test Modal</h3>
      </div>
      <b-button class="mt-3" variant="outline-danger" block>Close Me</b-button>
      <b-button class="mt-2" variant="outline-warning" block>Toggle Me</b-button>
    </b-modal> -->
  </b-container>
</template>

<script>

import firebase from 'firebase'
// import router from 'vue-router'

export default {
  name: 'BoardList',
  data () {
    return {
      fields: [
        { key: 'nama', label: 'Nama', sortable: true, 'class': 'text-center' },
        { key: 'alamat', label: 'Alamat', 'class': 'text-center'},
        { key: 'nomor', label: 'Nomer telp.', 'class': 'text-center'},
        { key: 'status', label: 'Buka?', 'class': 'text-center' }
      ],
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
      console.log(this.items);
    });
  },
  methods: {
    order (item) {
      this.$router.push({ name: 'order', params: { id: item.key }})
    },
    showModal (){
        this.$refs['my-modal'].show()
    },
    routeHome (){
      this.$router.push('home')
    },
  }
}
</script>

<style>
  .table {
    width: 96%;
    margin: 0 auto;
  }
  .h2 {
    text-align: center;
  }
</style>