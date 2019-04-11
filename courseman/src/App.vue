<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <router-view/> -->
    <div class="appbackground">
      <loginform class="loginform"></loginform>
    </div>
  </div>
</template>

<script>
import loginform from './components/loginform.vue'
export default {
  name: 'App',
  components: {loginform}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  margin-top: 0px;
  height: 100%;
}
.appbackground{
  background: #1DA7DA;
  height: 100%;
  padding-top: 5%;
}
.loginform{

  border-radius:25px;
  padding-top:2%;
  padding-bottom: 5%;
  padding-left: 5%;
  padding-right: 5%;
  margin-left: 35%;
}
</style>
