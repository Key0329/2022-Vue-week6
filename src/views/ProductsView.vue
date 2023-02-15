<template :key="rerenderKey">
  <div class="container">
    <div class="text-end mt-4">
      <button class="btn btn-primary" @click="modelHandler('createBtn')">
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">評價星級</th>
          <th width="100">是否啟用</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.category }}</td>
          <td>{{ product.title }}</td>
          <td class="text-start">NT$ {{ product.origin_price }}</td>
          <td class="text-start">NT$ {{ product.price }}</td>
          <td class="text-center">{{ product.review }}</td>
          <td>
            <span v-if="product.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="modelHandler('editBtn', product)"
              >
                編輯
              </button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="modelHandler('deleteBtn', product)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination-component
      :pages="pages"
      @get-products-data="getProductsData"
    ></pagination-component>
  </div>

  <!-- Modal-->
  <product-modal-component
    ref="productModal"
    :is-new="isNew"
    :temp-product="tempProduct"
    @get-products-data="getProductsData"
  ></product-modal-component>

  <delete-product-modal-component
    ref="delProductModal"
    :temp-product="tempProduct"
    @get-products-data="getProductsData"
  ></delete-product-modal-component>
</template>

<script>
import PaginationComponent from '../components/PaginationComponent/index.vue';
import ProductModalComponent from '../components/ProductModalComponent/index.vue';
import DeleteProductModalComponent from '../components/DeleteProductModalComponent/index.vue';

const apiUrl = import.meta.env.VITE_URL;
const apiPath = import.meta.env.VITE_PATH;

export default {
  data() {
    return {
      products: [],
      tempProduct: {},
      isNew: false,
      pages: {},
      rerenderKey: 0,
    };
  },
  components: {
    PaginationComponent,
    ProductModalComponent,
    DeleteProductModalComponent,
  },
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexVueWeek3Token\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    this.$http.defaults.headers.common.Authorization = token;
    this.checkAdmin();
  },
  methods: {
    checkAdmin() {
      this.$http
        .post(`${apiUrl}/api/user/check`)
        .then(() => {
          this.getProductsData();
        })
        .catch(() => {
          alert('登入失敗');
          this.$router.push('/login');
        });
    },
    getProductsData(e, page = 1) {
      const { id } = this.$route.params;

      let newPage = page;
      if (!e) {
        newPage = id;
      }

      this.$http
        .get(`${apiUrl}/api/${apiPath}/admin/products?page=${newPage}`)
        .then((res) => {
          this.products = res.data.products;
          this.pages = res.data.pagination;
          this.forceRerender();
        })
        .catch((err) => {
          alert(err);
        });
    },
    modelHandler(button, product) {
      if (button === 'createBtn') {
        this.isNew = true;
        this.tempProduct = {};
        this.$refs.productModal.openModal();
      } else if (button === 'editBtn') {
        this.tempProduct = { ...product };
        this.isNew = false;
        this.$refs.productModal.openModal();
      } else if (button === 'deleteBtn') {
        this.tempProduct = { ...product };
        this.$refs.delProductModal.openModal();
      }
    },
    forceRerender() {
      this.rerenderKey += 1;
    },
  },
};
</script>
