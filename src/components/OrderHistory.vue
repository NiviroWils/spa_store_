<template>
  <div>
    <h1>История заказов</h1>
    <ul>
      <li v-for="order in orders" :key="order.order_id">
        Заказ {{ order.order_id }}: {{ order.message }}
      </li>
    </ul>
  </div>
</template>

<script>
import store from "@/store";

export default {
  name: 'OrderHistory',
  computed: {
    orders() {
      return store.state.orders;
    }
  },
  created() {
    store.dispatch('fetchOrders');
  }
};
</script>

<style scoped>

</style>
