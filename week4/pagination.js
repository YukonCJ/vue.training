// 元件環境建立好
// 版型加入元件template中
// 將外部資源傳入內部 解除錯誤



export default {
    props:['pages','getProducts'],
    template:`<nav aria-label="Page navigation example">
    <ul class="pagination">
        <li class="page-item" :class="{disabled:!pages.has_pre}" @click="getProducts(page-1)">
            <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
        <li class="page-item" :class="{active:page === pages.current_page}"
            v-for="page in pages.total_pages" :key="page + 123" @click="getProducts(page)">
            <a class="page-link" href="#">{{page}}</a>
        </li>
        <li class="page-item" :class="{disabled:!pages.has_next}" @click="getProducts(page+1)">
            <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    </ul>
</nav>`
}