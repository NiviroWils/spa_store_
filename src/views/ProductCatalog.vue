<template>
  <div class="products">
    <h2>Каталог товаров</h2>
    <div v-if="loadingProducts" class="loading-message">Подождите...</div>
    <div v-else class="product-container">
      <div v-for="product in products" :key="product.id" class="product">
        <h3 class="product-title">{{ product.name }}</h3>
        <p class="product-description">{{ product.description }}</p>
        <p class="product-price">$ {{ product.price }}</p>
        <button @click="addToCart(product.id)" class="add-to-cart-btn">В корзину</button>
      </div>
      <notification v-if="showNotification" :message="notificationMessage" :type="notificationType" />
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import store from "@/store";
import Notification from '@/components/Notification.vue';
export default {
  components: {
    Notification
  },
  data() {
    return {
      showNotification: false,
      notificationMessage: '',
      notificationType: 'success'
    };
  },
  computed: {
    products() {
      return store.state.products;
    },
    loadingProducts() {
      return store.state.loadingProducts;
    },

  },
  methods: {
    handleNotificationClose() {
      this.showNotification = false;
      this.notificationMessage = '';
      this.notificationType = 'success';
    },

    async addToCart(productId) {
      try {
        store.commit('CLEAR_ERRORS');
        const response = await axios.post(`https://jurapro.bhuser.ru/api-shop/cart/${productId}`, null, {
          headers: {
            Authorization: `Bearer ${store.state.user_token}`
          }
        });
        const message = response.data.data.message;


        store.commit('ADD_TO_CART', { productId, message });


        await store.dispatch('fetchCart');


        console.log('Product added to cart:', message);
        this.showNotification = true;
        this.notificationMessage = 'Товар успешно добавлен в корзину';
        this.notificationType = 'success';
      } catch (error) {
        if (error.response) {
          store.commit('SET_ERROR', error.response.data.error.message);
          this.showNotification = true;
          this.notificationMessage = 'Ошибка при добавлении товара в корзину';
          this.notificationType = 'error';
        } else {
          store.commit('SET_ERROR', 'Unknown error occurred.');
          this.showNotification = true;
          this.notificationMessage = 'Ошибка при добавлении товара в корзину';
          this.notificationType = 'error';
        }
      }

    },
    resetNotification() {
      this.showNotification = false;
    }
  },
  created() {
    store.dispatch('fetchProducts');
  }
};
</script>

<style scoped>
.products {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.loading-message {
  font-size: 18px;
  color: #333;
  margin-top: 20px;
}

.product-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.product {
  flex: 0 1 calc(30% - 20px);
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  transition: transform 0.3s ease-in-out;
}

.product:hover {
  transform: scale(1.05);
}

.product img {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 10px;
}

.product-title {
  font-size: 1.2rem;
  margin: 0 0 10px;
}

.product-description {
  color: #555;
  margin-bottom: 10px;
}

.product-price {
  font-weight: bold;
  margin-bottom: 10px;
}

.add-to-cart-btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-to-cart-btn:hover {
  background-color: #0056b3;
}
</style>
