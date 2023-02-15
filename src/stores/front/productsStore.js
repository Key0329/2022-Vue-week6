import { defineStore } from 'pinia';
import axios from 'axios';

const { VITE_PATH, VITE_URL } = import.meta.env;

export default defineStore('products', {
  state: () => ({
    products: [],
  }),
  actions: {
    getProductsData() {
      axios
        .get(`${VITE_URL}/api/${VITE_PATH}/products/all`)
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
});
