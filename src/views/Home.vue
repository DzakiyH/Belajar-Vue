<template>
  <div class="home">
    <NavBar/>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button v-on:click="toIndex">Menu</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'home',
  components: {
    HelloWorld,
    NavBar
  },
  methods: {
    toIndex: function(){
      this.$router.replace('index')
    }
  }
}
</script>
