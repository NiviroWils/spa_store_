<template>
  <nav class="navbar">
    <div class="container">
      <router-link to="/products" class="logo">Магазин</router-link>
      <div class="nav-links">
        <router-link v-if="!isLoggedIn" to="/signup" class="nav-link">Регистрация</router-link>
        <router-link v-if="!isLoggedIn" to="/login" class="nav-link">Войти</router-link>
        <router-link v-if="isLoggedIn" @click="logout" to="/logout" class="nav-link">Выход</router-link>
        <router-link v-if="isLoggedIn" to="/orders" class="nav-link">Заказы</router-link>
        <router-link v-if="isLoggedIn" to="/cart" class="nav-link">Корзина</router-link>
      </div>
    </div>
  </nav>
  <router-view />
</template>
<script setup>
import { computed } from 'vue';
import store from "@/store";
import router from "@/router";

const isLoggedIn = computed(() => {
  return store.state.user_token !== null;
});
const logout = () => {
  store.dispatch('logout');
  router.push('/login');
};

</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.navbar {
  background-color: #3498db;
  color: #ffffff;
  padding: 10px 0;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  color: #ffffff;
}

.nav-links {
  display: flex;
  align-items: center;
}

.nav-link {
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  color: #ffffff;
  margin-left: 20px;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #2c3e50;
}
</style>
