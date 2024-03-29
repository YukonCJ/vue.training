import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.4.2/vue.esm-browser.min.js'
const url = 'https://vue3-course-api.hexschool.io/v2';
const path = 'api_test';

import pagination from './pagination.js'
import productModal from './productModal.js'
import deleteModal from './deleteModal.js'

const app = createApp({
    data() {
        return {
            // modal data
            temp: {
                imageUrl: '',
            },
            products: [],
            pages:{},
            // modal開關
            modalProducts: null,
            delProductModal: null,
            // 判斷是否為新增
            isNew: false,
        }
    },
    methods: {
        check() {
            axios.post(`${url}/api/user/check`)
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
        getProducts(page = 1) { //參數預設值為1
            ///v2/api/{api_path}/admin/products/all
            axios.get(`${url}/api/${path}/admin/products?page=${page}`)
                .then(res => {
                    // api取產品資料 存products陣列
                    this.products = res.data.products;
                    this.pages = res.data.pagination;
                })
                .catch(err => {
                    console.dir(err);
                    alert(err.response.data.message);
                })
        },
        openModal(status, item) {
            // 從點選傳入status 判斷執行片段
            if (status === 'new') {
                this.temp = {
                    imagesUrl: [],
                };
                this.isNew = true;
                this.$refs.pModal.openModal();
            } else if (status === 'edit') {
                this.temp = { ...item }
                this.isNew = false;
                this.$refs.pModal.openModal();
            } else if (status === 'delete') {
                this.temp = { ...item }
                // this.$refs.delModal.open();
                this.$refs.delModal.open();
            }
        },
        updateProducts() {
            // 新增
            let api = `${url}/api/${path}/admin/product`;
            let method = 'post'

            // 更新 /v2/api/{api_path}/admin/product/{id}
            if (!this.isNew) {
                api = `${url}/api/${path}/admin/product/${this.temp.id}`;
                method = 'put'
            }

            axios[method](api, { data: this.temp })
                .then(res => {
                    // api取產品資料 存products陣列
                    alert(res.data.message);
                    this.$refs.pModal.closeModal();
                    this.getProducts();
                    this.temp = {}
                }).catch((err) => {
                    alert(err.response.data.message);
                })
        },
        deleteProducts() {
            let api = `${url}/api/${path}/admin/product/${this.temp.id}`;

            axios.delete(api, { data: this.temp })
                .then(res => {
                    // api取產品資料 存products陣列
                    alert(res.data.message);
                    this.$refs.delModal.close();
                    this.getProducts();
                    this.temp = {}
                }).catch((err) => {
                    alert(err.response.data.message);
                })
        }

    },
    mounted() {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common.Authorization = token;
        // 初始化->登入頁導向產品頁->先觸發驗證身份check()
        this.getProducts();
        // ref 綁定modal元素
        // this.modalProducts = new bootstrap.Modal(this.$refs.productModal, {
        //     keyboard: false,
        //     backdrop: 'static'
        // });
        // this.delProductModal = new bootstrap.Modal(this.$refs.delProductModal, {
        //     keyboard: false,
        //     backdrop: 'static'
        // });

    },
    components:{
        pagination,
        productModal,
        deleteModal,
    }
})

app.mount('#app')
