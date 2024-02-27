<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="loginUser">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="error" style="color: red;">{{ error }}</p>
  </div>
</template>

<script>

import store from "@/store";

export default {
  data() {
    return {
      email: '',
      password: '',
      fio: '',
      products: [],
      cart: [],
    };
  },
  computed: {
    error() {
      return store.state.error;
    }
  },
  methods: {
    async loginUser() {
      const userData = {
        email: this.email,
        password: this.password
      };
      await store.dispatch('loginUser', userData);

    }
  }
};
</script>

<style scoped>
/* Стили здесь */
</style>