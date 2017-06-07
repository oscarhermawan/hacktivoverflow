<template>
  <div>
    <div class="login">
      <div class="tabs is-medium">
        <ul>
          <li class="is-active"><a>Login</a></li>
          <li><a href="register.html">Register</a></li>
        </ul>
      </div>

      <div class="columns">
        <div class="column is-one-quarter">
          <label class="label">Username</label>
        </div>
        <div class="column">
          <input class="input" type="text" placeholder="Text input" v-model="username">
        </div>
      </div>

      <div class="columns">
        <div class="column is-one-quarter">
          <label class="label">Password</label>
        </div>
        <div class="column">
          <input class="input" type="password" placeholder="Text input" v-model="password">
        </div>
      </div>

      <div class="columns">
        <div class="column is-one-quarter">
        </div>
        <div class="column">
          <a class="button is-info" @click="loginLocal">Login</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username:'',
      password:''
    }
  },
  methods:{
    loginLocal:function(){

    }
  }
}
</script>

<style scoped>
.login{
  width:40%;
  margin:0 auto;
}
</style>
