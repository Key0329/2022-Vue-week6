<script>
import Modal from 'bootstrap/js/dist/modal';

const apiUrl = import.meta.env.VITE_URL;
const apiPath = import.meta.env.VITE_PATH;

export default {
  name: 'delete-product-modal-component',
  props: {
    tempProduct: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'key0329',
      bsModal: '',
      product: {},
    };
  },
  methods: {
    openModal() {
      this.bsModal.show();
    },
    closeModal() {
      this.bsModal.hide();
    },
    deleteProduct() {
      const { id } = this.product;
      this.$http
        .delete(`${apiUrl}/api/${apiPath}/admin/product/${id}`)
        .then((res) => {
          alert(res.data.message);
          this.$emit('get-products-data');
          this.closeModal();
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
  },
  watch: {
    tempProduct: {
      handler(newVal) {
        this.product = {
          ...newVal,
        };
      },
      deep: true,
    },
  },
  mounted() {
    this.bsModal = new Modal(this.$refs.delProductModal);
  },
};
</script>

<template src="./template.html"></template>
