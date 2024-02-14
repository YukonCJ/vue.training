import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.4.2/vue.esm-browser.min.js'

createApp({
    data() {
        return {
            // 產品資料格式
            url: 'https://vue3-course-api.hexschool.io/v2',
            path: 'api_test',
            temp: {},
            products: [],
        }
    },
    methods: {
        check() {
            axios.post(`${this.url}/api/user/check`)
                .then(res => {
                    // 驗證成功 敲getProducts api 取得產品資料
                    this.getProducts();
                })
                .catch(err => {
                    alert(err.response.data.message);
                    // 登入失敗 路由導向index
                    window.location = 'index.html';
                })

        },
        getProducts() {
            ///v2/api/{api_path}/admin/products/all
            axios.get(`${this.url}/api/${this.path}/admin/products`)
                .then(res => {
                    // api取產品資料 存products陣列
                    this.products = res.data.products;
                    console.log(this.products);
                })
                .catch(err => {
                    console.dir(err);
                    alert(err.response.data.message);
                })
        },
    },
    mounted() {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common.Authorization = token;
        // 初始化->登入頁導向產品頁->先觸發驗證身份check()
        this.check();
    }
}).mount('#app')
