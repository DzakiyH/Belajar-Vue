<template>
  <div id="app">
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

.nav-link a{
  color: #000000;
}
</style>
