<template>
<b-container>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand>
          <router-link to="/home">
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
import router from 'vue-router'

export default {
  name: 'ShowBoard',
  data () {
    return {
      key: '',
      merchant: {},
      user: '',
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
    this.user = firebase.auth().currentUser.email;
  },
  methods: {
    details (board) {
      router.push({ name: 'ShowBoard', params: { id: board.key }})
    },
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