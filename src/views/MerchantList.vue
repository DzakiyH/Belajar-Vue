<template>
  <b-container>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand>
          <router-link to="home">
            NavBar
          </router-link>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item>Link</b-nav-item>
              <b-nav-item disabled>Disabled</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">

              <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                <template v-slot:button-content>
                  <em><b>{{user}}</b></em>
                </template>
                <b-dropdown-item>Profile</b-dropdown-item>
                <b-dropdown-item v-on:click="logOut">Sign Out</b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
      <!-- Navbar ends -->
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
      user: "",
      call: "https://www.google.com/maps/search/?api=1&query=<"
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
    this.user = firebase.auth().currentUser.email;
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
    logOut (){
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')})
    },
    callMap(lat, long){
      this.call = this.call + lat + '>,<' + long + '>'
    }
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