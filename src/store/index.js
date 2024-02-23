import { createStore } from 'vuex'
import axios from "axios";
import router from "@/router";

export default createStore({
    state: {
        fio: '',
        email: '',
        password: '',
        user_token: null,
        products: [],
        loadingProducts: false
    },
    mutations: {


        async login(state) {
            // eslint-disable-next-line no-unused-vars
            const data = await axios.post('https://jurapro.bhuser.ru/api-shop/login', {
                email: state.email,
                password: state.password
            })
                .then(function (response) {
                    state.user_token = response.data.data.user_token;
                    localStorage.token = state.user_token;
                    console.log(response.data.data);
                })
                .catch(error => {
                    console.log(error)
                    alert('Ошибка. Повторите попытку.');
                })
            if (localStorage.token !== undefined && localStorage.token !== null) {
                router.push('/products')
            }
        },
        async signup (state){
            // eslint-disable-next-line no-unused-vars
            const data = await axios.post('https://jurapro.bhuser.ru/api-shop/signup', {
                fio: state.fio,
                email: state.email,
                password: state.password
            })
                .then(function(response){
                    state.user_token = response.data.data.user_token;
                    localStorage.token = state.user_token;
                    console.log(response.data.data);
                    alert('Успех!');
                    if(localStorage.token !== null && localStorage.token !== undefined){
                        router.push("/login")
                    }
                })
                .catch(error =>{console.log(error)
                    alert('Ошибка. Попробуйте еще раз.');
                })
        },
        setProducts(state, products) {
            state.products = products;
        },
        setLoadingProducts(state, value) {
            state.loadingProducts = value;
        },


    },
    actions: {
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