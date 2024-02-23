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
                router.push('/')
            }
        }
    }

})