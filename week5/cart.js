import {createApp} from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.4.18/vue.esm-browser.min.js'
const apiUrl ='https://vue3-course-api.hexschool.io/v2';
const apiPath ='api_test';

const userModal = {
    props:['tempProduct','addToCart'],
    data(){
        return {
            productModal:null,
            qty:1 
        }
    },
    watch:{
        // modal每次開啟 tempProduct更動 qty數字重置
        tempProduct(){
            this.qty = 1;
        }
    },
    methods:{
        open(){
            this.productModal.show();
        },
        close(){
            this.productModal.hide();
        }
    },
    template:`#userProductModal`,
    mounted(){
        this.productModal = new bootstrap.Modal(this.$refs.modal);
    }
}

const app = createApp({
    data(){
        return {
            products:[],
            tempProduct:{},
            status:{
                addCartLoading:'',
                cartQtyLoading:''
            },
            carts:{}
        }
    },
    methods:{
        // 取得api資料
        getProducts(){
            axios.get(`${apiUrl}/api/${apiPath}/products/all`)
                .then(res => {
                    console.log(res);
                    this.products=res.data.products
                })
        },
        addToCart( product_id, qty = 1 ){
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
                })

        },
        changeCartQty( item, qty = 1 ){
            const order = {
                product_id:item.product_id,
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
        removeCartItem(id){
            this.status.cartQtyLoading = item.id;
            axios
                .delete(`${apiUrl}/api/${apiPath}/cart/${id}`)
                .then(res => {
                    console.log(res);
                    this.status.cartQtyLoading = '';
                    this.getCart();
                })

        },
        getCart(){
            axios.get(`${apiUrl}/api/${apiPath}/cart`)
                .then(res => {
                    console.log(res);
                    this.carts = res.data.data
                })
        },
        openModal(product){
            this.tempProduct = product;
            this.$refs.userModal.open();
        }
    },
    components:{
        userModal,
    },
    mounted(){
        this.getProducts();
        this.getCart();
    }
})

app.mount('#app');