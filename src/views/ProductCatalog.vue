<template>
  <div class="products">
    <h2>Products</h2>
    <div v-if="loadingProducts">Loading...</div>
    <div v-else>
      <div v-for="product in products" :key="product.id" class="product">
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <p>Price: ${{ product.price }}</p>
        <button @click="addToCart(product.id)">Add to Cart</button>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store';

export default {
  computed: {
    products() {
      return store.state.products;
    },
    loadingProducts() {
      return store.state.loadingProducts;
    }
  },
  created() {
   store.dispatch('fetchProducts');
  }
};
</script>


<style scoped>
.product {
  margin-bottom: 20px;
  border: 1px solid #ccc;
  padding: 10px;
}
</style>
