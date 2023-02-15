import { defineStore } from 'pinia';
import axios from 'axios';
import statusStore from '../statusStore';

const status = statusStore();

const { VITE_PATH, VITE_URL } = import.meta.env;

export default defineStore('cart', {
  state: () => ({
    cart: {},
  }),
  actions: {
    getCartsData() {
      axios
        .get(`${VITE_URL}/api/${VITE_PATH}/cart`)
        .then((res) => {
          this.cart = res.data.data;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    addToCart(id, qty = 1) {
      const data = {
        product_id: id,
        qty,
      };
      status.loadingItem = id;

      axios
        .post(`${VITE_URL}/api/${VITE_PATH}/cart`, { data })
        .then(() => {
          this.getCartsData();

          status.loadingItem = '';
          alert('已加入購物車');
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    updateCartItem(cart) {
      const data = {
        product_id: cart.product.id,
        qty: cart.qty,
      };

      this.loadingItem = cart.id;

      axios
        .put(`${VITE_URL}/api/${VITE_PATH}/cart/${cart.id}`, { data })
        .then(() => {
          this.getCartsData();
          this.loadingItem = '';
          alert('已更新購物車');
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    deleteCartItem(cart) {
      this.loadingItem = cart.id;

      axios
        .delete(`${VITE_URL}/api/${VITE_PATH}/cart/${cart.id}`)
        .then(() => {
          this.getCartsData();
          this.loadingItem = '';
          alert('已刪除該筆訂單');
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    deleteAllCart() {
      axios
        .delete(`${VITE_URL}/api/${VITE_PATH}/carts`)
        .then(() => {
          this.getCartsData();
          alert('已清空購物車');
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
});
