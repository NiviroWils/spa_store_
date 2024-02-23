<template>
  <h1>Регистрация</h1>
  <div class="register-form">
    <form @submit.prevent="store.commit('signup')">
      <div>
        <label for="name">Ваше имя</label>
        <input id="name" type="text" v-model="store.state.fio" required>
      </div>

      <div class="form-group">
        <label for="email">E-mail</label>
        <input id="email" type="email" v-model="store.state.email" required>
      </div>

      <div>
        <label for="password">Пароль</label>
        <input id="password" type="password" v-model="store.state.password" required>
      </div>
      <div>
        <button type="submit">Зарегистрироваться</button>
      </div>
    </form>
  </div>
  <router-link to="/products">К каталогу</router-link>
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