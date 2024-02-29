<template>
  <div class="cart-container">
    <h1 class="cart-heading">Корзина</h1>
    <div v-if="cart.length > 0" class="cart-items">
      <div v-for="item in cart" :key="item.id" class="cart-item">
        <div class="item-details">
          <h2 class="item-name">{{ item.name }}</h2>
          <p class="item-price">{{ item.price }} руб.</p>
        </div>
        <div class="item-controls">
          <button class="quantity-btn" @click="decreaseQuantity(item.id)">-</button>
          <span class="quantity">Кол-во: {{ item.quantity }}</span>
          <button class="quantity-btn" @click="increaseQuantity(item.id)">+</button>
          <button class="remove-btn" @click="handleRemoveProduct(item.id)">Удалить из корзины</button>
        </div>
      </div>
    </div>
    <div v-else class="empty-cart">
      <h3>Ваша корзина пуста</h3>
    </div>
    <router-link to="/products" class="back-to-home">К каталогу</router-link>
  </div>
</template>

<script>
import store from "@/store";

export default {
  name: 'CartComp',
  computed: {
    cart() {
      return store.state.cart;
    }
  },
  methods: {
    async handleRemoveProduct(productId) {
      try {
        await store.dispatch('removeProductFromCart', productId);
        console.log('Продукт успешно удален из корзины');
      } catch (error) {
        console.error('Ошибка при удалении продукта из корзины:', error);
      }
    },
    increaseQuantity(productId) {
      store.dispatch('INCREASE_QUANTITY', productId);
    },
    decreaseQuantity(productId) {
      store.dispatch('DECREASE_QUANTITY', productId);
    },
    fetchCart() {
      store.dispatch('fetchCart');
    },
    handleCreateOrder() {
      store.dispatch('createOrder')
          .then(response => {
            console.log('Заказ успешно оформлен. ID заказа:', response.data.data.order_id);
          })
          .catch(error => {
            if (error.response && error.response.status === 422) {
              console.error('Ошибка при оформлении заказа: Корзина пуста');
            } else {
              console.error('Ошибка при оформлении заказа:', error);
            }
          });
    },
  },
  created() {
    this.fetchCart();
  }
};
</script>

<style scoped>
.cart-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.cart-heading {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.cart-items {
  display: flex;
  flex-direction: column;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.item-details {
  flex-grow: 1;
}

.item-name {
  font-size: 18px;
  margin-bottom: 5px;
}

.item-price {
  font-size: 16px;
}

.item-controls {
  display: flex;
  align-items: center;
}

.quantity-btn {
  padding: 5px 10px;
  font-size: 16px;
  border: none;
  background-color: #007bff;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.quantity-btn:hover {
  background-color: #0056b3;
}

.quantity {
  margin: 0 10px;
  font-size: 16px;
}

.remove-btn {
  padding: 5px 10px;
  font-size: 16px;
  border: none;
  background-color: #dc3545;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.remove-btn:hover {
  background-color: #c82333;
}

.empty-cart {
  text-align: center;
  margin-top: 20px;
}

.back-to-home {
  display: block;
  text-align: center;
  margin-top: 20px;
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
}
</style>
