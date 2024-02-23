<template>
  <h1>Добро пожаловать!</h1>
  <div class="login-page">
    <form @submit.prevent="store.commit('login')">
      <label>Email</label>
      <input required v-model="store.state.email" type="email" placeholder="Email">
      <label>Password</label>
      <input required v-model="store.state.password" type="password" placeholder="Password">
      <button type="submit">Login</button>
    </form>
  </div>
  <router-link to="/">К каталогу</router-link>
</template>

<script>
import store from "@/store";
export default {
  computed:{
    store(){
      return store
    }
  }
}
</script>

<style scoped>

</style>