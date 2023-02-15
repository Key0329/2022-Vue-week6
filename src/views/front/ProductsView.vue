<!-- eslint-disable camelcase -->
<script>
import { mapState, mapActions } from 'pinia';
import { RouterLink } from 'vue-router';
import productsStore from '../../stores/front/productsStore';
import cartStore from '../../stores/front/cartStore';
import statusStore from '../../stores/statusStore';

export default {
  components: {
    RouterLink,
  },
  computed: {
    ...mapState(productsStore, ['products']),
    ...mapState(statusStore, ['loadingItem']),
  },
  methods: {
    ...mapActions(productsStore, ['getProductsData']),
    ...mapActions(cartStore, ['addToCart']),
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
  <h2 class="my-5">這是產品列表</h2>
  <div class="container">
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
              <RouterLink
                class="btn btn-outline-secondary"
                :to="`product/${product.id}`"
              >
                查看更多
              </RouterLink>
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
