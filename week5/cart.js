import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.4.18/vue.esm-browser.min.js'
const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
const apiPath = 'api_test';

Object.keys(VeeValidateRules).forEach(rule => {
    if (rule !== 'default') {
        VeeValidate.defineRule(rule, VeeValidateRules[rule]);
    }
});
// 中文資源
VeeValidateI18n.loadLocaleFromURL('https://unpkg.com/@vee-validate/i18n@4.12.4/dist/locale/zh_TW.json');

VeeValidate.configure({
    generateMessage: VeeValidateI18n.localize('zh_TW'),
    validateOnInput: true, // 輸入文字時，就立即進行驗證
});


const userModal = {
    props: ['tempProduct', 'addToCart'],
    data() {
        return {
            productModal: null,
            qty: 1
        }
    },
    watch: {
        // modal每次開啟 tempProduct更動 qty數字重置
        tempProduct() {
            this.qty = 1;
        }
    },
    methods: {
        open() {
            this.productModal.show();
        },
        close() {
            this.productModal.hide();
        }
    },
    template: `#userProductModal`,
    mounted() {
        this.productModal = new bootstrap.Modal(this.$refs.modal);
    }
}

const app = Vue.createApp({
    data() {
        return {
            products: [],
            tempProduct: {},
            status: {
                addCartLoading: '',
                cartQtyLoading: ''
            },
            carts: {},
            form:{
                user:{
                    email:'',
                    name:'',
                    tel:'',
                    address:'',
                },
                message:''
            }
        }
    },
    methods: {
        // 取得api資料
        getProducts() {
            axios.get(`${apiUrl}/api/${apiPath}/products/all`)
                .then(res => {
                    console.log(res);
                    this.products = res.data.products
                })
        },
        addToCart(product_id, qty = 1) {
            const order = {
                product_id,
                qty
            }
            // 加入loading狀態
            this.status.addCartLoading = product_id;
            axios.post(`${apiUrl}/api/${apiPath}/cart`, { data: order })
                .then(res => {
                    console.log(res);
                    // 清空loading狀態
                    this.status.addCartLoading = '';
                    this.$refs.userModal.close();
                    this.getCart();
                })

        },
        changeCartQty(item, qty = 1) {
            const order = {
                product_id: item.product_id,
                qty
            }
            this.status.cartQtyLoading = item.id;
            axios
                .put(`${apiUrl}/api/${apiPath}/cart/${item.id}`, { data: order })
                .then(res => {
                    console.log(res);
                    this.status.cartQtyLoading = '';
                    this.getCart();
                })

        },
        removeCartItem(id) {
            this.status.cartQtyLoading = id;
            axios
                .delete(`${apiUrl}/api/${apiPath}/cart/${id}`)
                .then(res => {
                    console.log(res);
                    this.status.cartQtyLoading = '';
                    this.getCart();
                })

        },
        removeCartAll(){
            axios
            .delete(`${apiUrl}/api/${apiPath}/carts`)
            .then(res => {
                console.log(res);
                this.getCart();
            })

        },
        getCart() {
            axios.get(`${apiUrl}/api/${apiPath}/cart`)
                .then(res => {
                    console.log(res);
                    this.carts = res.data.data
                })
        },
        openModal(product) {
            this.tempProduct = product;
            this.$refs.userModal.open();
        },
        createOrder(){
            const order = this.form;
            // /v2/api/{api_path}/order
            axios.post(`${apiUrl}/api/${apiPath}/order`, { data: order } )
                .then(res => {
                    console.log(res);
                    alert(res.data.message);
                    // 重置表單
                    this.$refs.form.resetForm();
                    this.getCart();            
                }).catch(err => {
                    alert(err.response.data.message)
                })

        }
    },
    components: {
        userModal,
    },
    mounted() {
        this.getProducts();
        this.getCart();
    }
})

app.component('VForm', VeeValidate.Form); // form
app.component('VField', VeeValidate.Field); // input
app.component('ErrorMessage', VeeValidate.ErrorMessage); // 錯誤回饋

app.mount('#app');

