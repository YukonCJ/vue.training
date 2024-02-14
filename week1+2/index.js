        // 進入登入頁面 > 登入成功 > 進入後台產品頁面
        const app = Vue.createApp({
            data() {
                return {
                    user: {
                        username: "",
                        password: "",
                    },
                }
            },
            methods: {
                login() {
                    const url = 'https://vue3-course-api.hexschool.io';
                    const path = 'api_test';

                    axios.post(`${url}/v2/admin/signin`, this.user)
                        .then(res => {
                            // 取得data token, expired
                            const { token, expired } = res.data;

                            // 存入cookie 
                            document.cookie = `hexToken=${token}; expires=${new Date(expired)}; path=/;`;
                            window.location = 'products.html';
                        })
                        .catch(err => {
                            console.dir(err);
                            alert(err.response.data.message);
                        })
                }
            }
        })
        app.mount('#app');
