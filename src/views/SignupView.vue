<template>
  <div class="signup-form">
    <h1>Регистрация</h1>
    <form @submit.prevent="handleSignup">
      <div class="form-group">
        <label for="name">Ваше имя</label>
        <input id="name" type="text" v-model="fio" required>
      </div>

      <div class="form-group">
        <label for="email">E-mail</label>
        <input id="email" type="email" v-model="email" required>
      </div>

      <div class="form-group">
        <label for="password">Пароль</label>
        <input id="password" type="password" v-model="password" required>
      </div>

      <div class="form-group">
        <button type="submit">Зарегистрироваться</button>
      </div>
    </form>
    <router-link to="/products">К каталогу</router-link>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import store from "@/store";

export default {
  data() {
    return {
      fio: '',
      email: '',
      password: ''
    };
  },
  methods: {
    ...mapActions(['signupUser']),
    async handleSignup() {
      try {
        await store.dispatch('signupUser', {
          fio: this.fio,
          email: this.email,
          password: this.password
        });

        this.$router.push('/login');
      } catch (error) {
        console.error('Ошибка регистрации:', error);

      }
    }
  }
};
</script>

<style scoped>
.signup-form {
  max-width: 400px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.router-link {
  display: block;
  margin-top: 1rem;
  text-decoration: none;
  color: #007bff;
}
</style>
