<template>
  <div class="orders">
    <h2>Список заказов</h2>
    <div v-if="orders.length === 0" class="empty-orders">
      <p>У вас пока нет заказов.</p>
    </div>
    <div v-else>
      <div v-for="order in orders" :key="order.id" class="order" @click="toggleOrderDetails(order.id)">
        <h3>Заказ #{{ order.id }}</h3>
        <p>Дата заказа: {{ order.date }}</p>
        <div v-if="expandedOrders.includes(order.id)" class="order-details">
          <h4>Товары:</h4>
          <ul>
            <li v-for="(item, index) in order.items" :key="index">
              <p>{{ item.name }} - {{ item.price }} руб. ({{ item.quantity }} шт.)</p>
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
  data() {
    return {
      expandedOrders: [], // Массив для хранения id раскрытых заказов
    };
  },
  computed: {
    orders() {
      return store.state.orders;
    }
  },
  mounted() {
    store.dispatch('fetchOrders');
  },
  methods: {
    toggleOrderDetails(orderId) {
      if (this.expandedOrders.includes(orderId)) {
        // Если заказ уже раскрыт, закрываем его
        const index = this.expandedOrders.indexOf(orderId);
        if (index !== -1) {
          this.expandedOrders.splice(index, 1);
        }
      } else {
        // Если заказ не раскрыт, добавляем его id в массив
        this.expandedOrders.push(orderId);
      }
    }
  }
};
</script>

<style scoped>
/* Стили для карточек заказов */
.order {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}

.order-details {
  margin-top: 10px;
}
</style>
