import { createStore } from 'vuex'
import axios from "axios";
import router from "@/router";

export default createStore({
    state: {
        user_token: null,
        products: [],
        loadingProducts: false,
        error: null,
        email: '',
        password: ''
    },
    mutations: {
        SET_USER_TOKEN(state, token) {
            state.user_token = token;
        },
        SET_ERROR(state, error) {
            state.error = error;
        },
        setProducts(state, products) {
            state.products = products;
        },
        setLoadingProducts(state, value) {
            state.loadingProducts = value;
        },
        SET_VALIDATION_ERRORS(state, errors) {
            state.validationErrors = errors;
        },
        ADD_TO_CART(state, product) {
            state.cart.push(product);
        },

    },
    actions: {
        async loginUser({commit}, userData) {
            try {
                const response = await axios.post('https://jurapro.bhuser.ru/api-shop/login', userData);
                const {user_token} = response.data.data;
                commit('SET_USER_TOKEN', user_token);
                commit('SET_ERROR', null);
                router.push('/products')
            } catch (error) {
                commit('SET_USER_TOKEN', null);
                if (error.response) {
                    commit('SET_ERROR', error.response.data.error.message);
                } else {
                    commit('SET_ERROR', 'Unknown error occurred.');
                }
            }
        },
        async fetchProducts({ commit }) {
            try {
                commit('setLoadingProducts', true);
                const response = await axios.get('https://jurapro.bhuser.ru/api-shop/products');
                commit('setProducts', response.data.data);
            } catch (error) {
                console.error('Error fetching products:', error);
                throw error;
            } finally {
                commit('setLoadingProducts', false);
            }
        },

    }

})