<template>
    <div class="login">
        <h1>Log In</h1>
        <input type="text" v-model="email" placeholder="Email"><br>
        <input type="password" v-model="password" placeholder="Password"><br>
        <button v-on:click="connect">Connect</button>
        <p>Don't have an account? <router-link to="/signup">Create one</router-link></p>
    </div>
</template>

<script>
import firebase from 'firebase';
export default {
    name: 'login',
    data(){
        return{
            email: '',
            password: ''
        }
    },
    methods:{
        connect: function(){
            firebase.auth().signInWithEmailAndPassword(this.email,this.password).then(
                () => {
                    this.$router.replace('home')
                },
                (err) => {
                    alert('Oof ' + err)
                }
            );
        }
    }
}
</script>

<style scoped>
    .login {
        margin-top: 40px;
    }
    input {
        margin: 10px 0;
        width: 20%;
        padding: 15px;
    }
    button {
        margin-top: 20px;
        width: 10%;
        cursor: pointer;
    }
    p {
        margin-top: 40px;
        font-size: 13px;
    }
    p a {
        text-decoration: underline;
        cursor: pointer;
    }
</style>