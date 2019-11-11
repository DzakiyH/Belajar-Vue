<template>
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
              <b-nav-item><router-link to="/index">Cari Toko</router-link></b-nav-item>
              <b-nav-item><router-link to="/transactions">List Pesanan</router-link></b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">

              
                <!-- Using 'button-content' slot -->
                <div v-if="logged">   
                  <b-nav-item-dropdown right>
                  <template v-slot:button-content>
                    <em><b>{{user}}</b></em>
                  </template>
                  <b-dropdown-item>Profile</b-dropdown-item>
                  <b-dropdown-item v-on:click="logOut">Sign Out</b-dropdown-item>
                  </b-nav-item-dropdown>      
                </div>
                <div v-else>
                  <router-link tag="button" to="login">Login</router-link>
                </div>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
    </div>
    <!-- Navbar ends -->
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'NavBar',
    return: {
        user:'',
        logged: false,
    },

    created(){
    this.logged = firebase.auth().currentUser || false
    this.user = firebase.auth().currentUser.email
  },
  methods:{
    logOut (){
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')})
        this.$router.go(0)
    },
  }

}
</script>

<style>

</style>