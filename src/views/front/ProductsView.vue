<!-- eslint-disable camelcase -->
<script>
import UserProductModalComponent from '../../components/front/UserProductModalComponent.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  components: {
    UserProductModalComponent,
  },
  data() {
    return {
      products: [],
      product: {},
      loadingItem: '',
    };
  },
  methods: {
    getProductsData() {
      this.$http
        .get(`${VITE_URL}/api/${VITE_PATH}/products/all`)
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    getProductDetail(id) {
      this.loadingItem = id;
      this.$http
        .get(`${VITE_URL}/api/${VITE_PATH}/product/${id}`)
        .then((res) => {
          this.product = res.data.product;
          this.loadingItem = '';
          this.$refs.userProductModal.openModal();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    addToCart(product_id, qty = 1) {
      const data = {
        product_id,
        qty,
      };
      this.loadingItem = product_id;

      this.$http
        .post(`${VITE_URL}/api/${VITE_PATH}/cart`, { data })
        .then(() => {
          this.getCartsData();
          this.$refs.userProductModal.closeModal();
          this.$refs.userProductModal.qty = 1;
          this.loadingItem = '';
          alert('已加入購物車');
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
  mounted() {
    this.getProductsData();

    const loader = this.$loading.show();
    // simulate AJAX
    setTimeout(() => {
      loader.hide();
    }, 1000);
  },
};
</script>

<template>
  <div>這是產品列表</div>
  <div class="container">
    <!-- 產品Modal -->
    <UserProductModalComponent
      ref="userProductModal"
      :tempProduct="product"
      :add-to-cart="addToCart"
    ></UserProductModalComponent>
    <!-- 產品Modal -->
    <table class="table align-middle">
      <thead>
        <tr>
          <th>圖片</th>
          <th>商品名稱</th>
          <th>價格</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td style="width: 200px">
            <div
              class="product-pic"
              :style="{ backgroundImage: `url(${product.imageUrl})` }"
              alt=""
            ></div>
          </td>
          <td>
            {{ product.title }}
          </td>
          <td>
            <div class="h5" v-if="product.price === product.origin_price">
              {{ product.price }} 元
            </div>
            <div v-else>
              <del class="h6">原價 {{ product.origin_price }} 元</del>
              <div class="h5">現在只要 {{ product.price }} 元</div>
            </div>
          </td>
          <td>
            <div class="btn-group btn-group-sm">
              <button
                type="button"
                class="btn btn-outline-secondary"
                @click="getProductDetail(product.id)"
              >
                <i
                  class="fas fa-spinner fa-pulse"
                  v-if="product.id === loadingItem"
                ></i>
                查看更多
              </button>
              <button
                type="button"
                class="btn btn-outline-danger"
                @click="addToCart(product.id)"
              >
                <i
                  class="fas fa-spinner fa-pulse"
                  v-if="product.id === loadingItem"
                ></i>
                加到購物車
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.product-pic {
  height: 100px;
  background-size: cover;
  background-position: center;
}
</style>
