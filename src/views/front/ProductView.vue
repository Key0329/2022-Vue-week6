<template>
  <div class="container">
    <h2>這是單一產品</h2>
    <h3>{{ product.title }}</h3>
    <div class="row text-start">
      <div class="col-sm-6">
        <img class="img-fluid" :src="product.imageUrl" alt="" />
      </div>
      <div class="col-sm-6">
        <span class="badge bg-primary rounded-pill">{{
          product.category
        }}</span>
        <p>商品描述：{{ product.description }}</p>
        <p>商品內容：{{ product.content }}</p>
        <div class="h5" v-if="product.price === product.origin_price">
          {{ product.price }} 元
        </div>
        <div v-else>
          <del class="h6">原價 {{ product.origin_price }} 元</del>
          <div class="h5">現在只要 {{ product.price }} 元</div>
        </div>
        <div>
          <div class="input-group">
            <select name="" id="" class="form-select" v-model="qty">
              <option :value="i" v-for="i in 20" :key="i">{{ i }}</option>
            </select>
            <button
              type="button"
              class="btn btn-primary"
              @click="addToCart(product.id, qty)"
            >
              <i
                class="fas fa-spinner fa-pulse"
                v-if="product.id === loadingItem"
              ></i>
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- col-sm-6 end -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import cartStore from '../../stores/front/cartStore';
import statusStore from '../../stores/statusStore';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      product: {},
      qty: 1,
    };
  },
  methods: {
    getProductDetail() {
      const { id } = this.$route.params;
      this.$http
        .get(`${VITE_URL}/api/${VITE_PATH}/product/${id}`)
        .then((res) => {
          this.product = res.data.product;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    ...mapActions(cartStore, ['addToCart']),
  },
  computed: {
    ...mapState(statusStore, ['loadingItem']),
  },
  mounted() {
    this.getProductDetail();
    const loader = this.$loading.show();
    // simulate AJAX
    setTimeout(() => {
      loader.hide();
    }, 1000);
  },
};
</script>
