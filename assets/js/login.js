import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';

const app = createApp({
    data() {
        return {
            url: 'https://vue3-course-api.hexschool.io/v2',
            path: 'hlin-hexschool',
            user: {
                username: '',
                password: ''
            }
            // 使用v-model雙向綁定
        }
    },
    methods: {
        login() {
            const api = `${this.url}/admin/signin`
            axios.post(api, this.user)
                .then((res) => {
                    const { token, expired } = res.data;
                    console.log(token, expired);
                    //token, expired 存到cookie，就算重新整理網頁一樣帶有token
                    document.cookie = `hexToken=${ token }; expires=${ new Date(expired) };`;
                    //先通過驗證後，才會轉址到products.html頁面
                    window.location = 'products.html';
                })
                .catch((err) => {
                    alert(err.data.message);
                })
        }
    }
})
app.mount('#app');