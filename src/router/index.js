import { createRouter, createWebHistory } from 'vue-router'
import LoginView from "@/views/LoginView.vue";
import SignupView  from "@/views/SignupView.vue";
import ProductCatalog from "@/views/ProductCatalog.vue";
import Cart from "@/components/Cart.vue";
import OrderHistory from "@/components/OrderHistory.vue";

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
  },
  {
    path: '/products',
    name: 'products',
    component: ProductCatalog
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  },
  {
    path: '/orders',
    name: 'orders',
    component: OrderHistory
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
