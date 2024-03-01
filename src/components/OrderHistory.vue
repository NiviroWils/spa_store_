<template>
  <div class="orders">
    <h2>Список заказов</h2>
    <div v-if="orders.length === 0" class="empty-orders">
      <p>У вас пока нет заказов.</p>
    </div>
    <div v-else>
      <div v-for="order in orders" :key="order.id" class="order">
        <h3>Заказ #{{ order.id }}</h3>
        <p>Дата заказа: {{ order.date }}</p>
        <div class="order-items">
          <h4>Товары:</h4>
          <ul>
            <li v-for="item in order.items" :key="item.productId">
              {{ item.name }} - {{ item.price }} руб.
            </li>
          </ul>
        </div>
      </div>
    </div>
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
    this.orders = store.state.orders;
  },

};
</script>

<style scoped>

</style>
