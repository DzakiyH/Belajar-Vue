<template>
  <div id="app">
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
    <router-view/>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'app',
  data(){
    return{
      user: '',
      logged: false
    }
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
