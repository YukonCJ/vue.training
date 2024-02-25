// 元件環境建立好
// 版型加入元件template中
// props將外部資源傳入內部
// modal : refs, Bootstrap modal.show/hide() 開關改設定在元件內層方法

export default {
    props: ['temp', 'updateProducts'],
    data() {
        return {
            modalProduct: null
        }
    },
    methods: {
        openModal() {
            this.modalProduct.show()
        },
        closeModal() {
            this.modalProduct.hide()
        },
    },
    template: `<div class="modal fade" ref="productModal" id="productModal" tabindex="-1" aria-labelledby="productModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <!-- HEAD -->
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="productModalLabel">新增產品</h1>
            </div>
            <!-- BODY -->
            <div class="modal-body row">
                <div class="col-4">
                    <div class="mb-2">
                        <div class="mb-3">
                            <label for="imageUrl" class="form-label">輸入圖片網址</label>
                            <input type="text" class="form-control" placeholder="請輸入圖片連結">
                        </div>
                        <img class="img-fluid" :src="temp.imageUrl" alt="">
                    </div>
                    <div>
                        <h4>多圖設置</h4>
                        <!-- 判斷imagesUrl是一個陣列 -->
                        <div v-if="Array.isArray(temp.imagesUrl)">
                            <div v-for="(img, key) in temp.imagesUrl" :key="key+'123'">
                                <img :src="img" class="img-fluid" alt="">
                                <input type="text" class="form-control" v-model="temp.imagesUrl[key]">
                            </div>
                            <!-- 空陣列 及 輸入不為空值時 才可以新增 -->
                            <button class="btn btn-outline-primary btn-sm d-block w-100"
                                v-if="temp.imagesUrl.length === 0 || temp.imagesUrl[temp.imagesUrl.length -1]"
                                @click="temp.imagesUrl.push('')">
                                新增圖片
                            </button>
                            <!-- 其他條件 -->
                            <button class="btn btn-outline-danger btn-sm d-block w-100" v-else
                                @click="temp.imagesUrl.pop()">
                                刪除圖片
                            </button>
                        </div>
                    </div>
                </div>

                <div class="col-8">
                    <div class="mb-3">
                        <label for="title" class="col-form-label">標題</label>
                        <input type="text" v-model="temp.title" class="form-control" id="title"
                            placeholder="請輸入標題">
                    </div>
                    <div class="row">
                        <div class="mb-3 col-6">
                            <label for="category" class="col-form-label">分類</label>
                            <input type="text" v-model="temp.category" class="form-control" id="category"
                                placeholder="請輸入分類">
                        </div>
                        <div class="mb-3 col-6">
                            <label for="unit" class="col-form-label">單位</label>
                            <input type="text" v-model="temp.unit" class="form-control" id="unit"
                                placeholder="請輸入單位">
                        </div>
                    </div>
                    <div class="row">
                        <div class="mb-3 col-6">
                            <label for="originPrice" class="col-form-label">原價</label>
                            <input type="number" v-model="temp.origin_price" class="form-control"
                                id="originPrice" placeholder="請輸入原價">
                        </div>
                        <div class="mb-3 col-6">
                            <label for="onsalePrice" class="col-form-label">售價</label>
                            <input type="number" v-model="temp.price" class="form-control" id="onsalePrice"
                                placeholder="請輸入售價">
                        </div>
                    </div>
                    <hr>
                    <div class="mb-3">
                        <label for="description" class="form-label">產品描述</label>
                        <textarea type="text" v-model="temp.description" class="form-control" id="description"
                            placeholder="請輸入產品描述"></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="content" class="col-form-label">說明內容</label>
                        <textarea type="text" v-model="temp.content" class="form-control" id="content"
                            placeholder="請輸入說明內容"></textarea>
                    </div>
                    <div class="mb-3 d-flex">
                        <input type="checkbox" v-model="temp.is_enabled" id="isEnable" class="form-check-input"
                            :true-value="1" :false-value="0">
                        <label class="form-check-label" for="isEnable">是否啟用</label>
                    </div>
                </div>
            </div>
            <!-- FOOTER -->
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary" @click="updateProducts">確認</button>
            </div>
        </div>
    </div>
</div>`,
    mounted() {
        this.modalProduct = new bootstrap.Modal(this.$refs.productModal)
    }
}