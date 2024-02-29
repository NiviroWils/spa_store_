import { createStore } from 'vuex'
import axios from "axios";
import router from "@/router";

export default createStore({
    state: {
        user_token: localStorage.getItem('user_token') || null,
        products: [],
        loadingProducts: false,
        error: null,
        email: '',
        password: '',
        cart: [],
        loadingCart: false,
        orders: [],


    },
    mutations: {
        SET_USER_TOKEN(state, token) {
            state.user_token = token;
            localStorage.setItem('user_token', token);
        },
        SET_ORDERS(state, orders) {
            state.orders = orders;
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
        SET_CART(state, cart) {
            state.cart = cart;
        },
        REMOVE_PRODUCT_FROM_CART(state, productId) {
            const index = state.cart.findIndex(product => product.id === productId);
            if (index !== -1) {
                state.cart.splice(index, 1);
            }
        },
        ADD_TO_CART(state, {productId, message}) {
            console.log('Adding to cart. ProductId:', productId, 'Message:', message);
            // Проверяем, существует ли уже товар в корзине
            const existingProduct = state.cart.find(item => item.productId === productId);
            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                state.cart.push({productId, message, quantity: 1});
            }
        },
        INCREASE_QUANTITY(state, productId) {
            console.log('Increasing quantity for productId:', productId);
            const product = state.cart.find(item => item.productId === productId);
            if (product) {
                product.quantity++;
            }
        },

        DECREASE_QUANTITY(state, productId) {
            const product = state.cart.find(item => item.productId === productId);
            if (product && product.quantity > 1) {
                product.quantity--;
            }
        }
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
        async increaseQuantity({commit}, productId) {
            commit('INCREASE_QUANTITY', productId);
        },

        async signupUser({commit}, userData) {
            try {
                const response = await axios.post('https://jurapro.bhuser.ru/api-shop/signup', userData);

                if (response.status === 201 && response.data && response.data.data && response.data.data.user_token) {
                    const {user_token} = response.data.data;
                    commit('SET_USER_TOKEN', user_token);
                    commit('SET_ERROR', null);
                } else {

                    console.error('Invalid response format:', response);
                    commit('SET_ERROR', 'Invalid response format');
                }
            } catch (error) {
                commit('SET_USER_TOKEN', null);

                if (error.response) {
                    if (error.response.status === 422) {

                        commit('SET_VALIDATION_ERRORS', error.response.data.error.errors);
                    } else {
                        commit('SET_ERROR', error.response.data.error.message);
                    }
                } else {
                    commit('SET_ERROR', 'Unknown error occurred.');
                }

                throw error;
            }
        },
        async addToCart({state}, productId) {
            const token = state.user_token;
            if (token) {
                axios.post(`https://jurapro.bhuser.ru/api-shop/cart/${productId}`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(response => {
                        response.data.data.quantity = 1;
                        state.cart.push(response.data.data);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }

        },
        async removeProductFromCart({state, commit}, productId) {
            try {
                const response = await axios.delete(`https://jurapro.bhuser.ru/api-shop/cart/${productId}`, {
                    headers: {
                        Authorization: `Bearer ${state.user_token}`
                    }
                });

                if (response.status === 200) {
                    // Успешно удален товар из корзины на сервере
                    commit('REMOVE_PRODUCT_FROM_CART', productId);
                } else {
                    console.error('Ошибка при удалении товара из корзины. Статус:', response.status);
                }
            } catch (error) {
                console.error('Ошибка при удалении товара из корзины:', error.message);
                throw error; // Пробрасываем ошибку для обработки в компоненте, если необходимо
            }
        },

    async fetchProducts({commit}) {
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
    },// eslint-disable-next-line
        async createOrder({ state, commit }) {
            try {

                if (state.cart.length === 0) {
                    throw new Error('Cart is empty');
                }


                const orderData = state.cart.map(item => ({
                    name: item.name,
                    price: item.price,
                }));


                const response = await axios.post('https://jurapro.bhuser.ru/api-shop/order', orderData, {
                    headers: {
                        Authorization: `Bearer ${state.user_token}`,
                    },
                });

                // Проверяем статус ответа
                if (response && response.data && response.status === 201) {
                    const { order_id, message } = response.data;
                    console.log(`Order ${order_id} is processed: ${message}`);
                } else {
                    console.error('Error creating order:', response ? response.status : 'Unknown');
                }
            } catch (error) {
                console.error('Error creating order:', error.message);
                throw error;
            }
        },


        async logout({ state, commit }) {
            const token = state.user_token;
            try {
                const response = await axios.get(`https://jurapro.bhuser.ru/api-shop/logout`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status === 200 && response.data.data.message === 'logout') {

                    commit('SET_USER_TOKEN', null);
                    console.log('Вы успешно вышли из системы.');
                }
            } catch (error) {
                console.error('Ошибка при выходе из системы:', error);
                throw error;
            }
        },


        async fetchCart({ commit, state }) {
            try {
                const response = await axios.get('https://jurapro.bhuser.ru/api-shop/cart', {
                    headers: {
                        Authorization: `Bearer ${state.user_token}`
                    }
                });
                commit('SET_CART', response.data.data);
            } catch (error) {
                console.error('Error fetching cart:', error);
                throw error;
            }
        },
        async fetchOrders({ commit, state }) {
            try {
                const response = await axios.get('https://jurapro.bhuser.ru/api-shop/order', {
                    headers: {
                        Authorization: `Bearer ${state.user_token}`
                    }
                });
                commit('SET_ORDERS', response.data.data);
            } catch (error) {
                console.error('Ошибка при загрузке заказов:', error.message);
            }
        }
}



})