<script>
import Modal from 'bootstrap/js/dist/modal';

export default {
  props: {
    tempProduct: {
      type: Object,
      required: true,
    },
    addToCart: {
      type: Function,
    },
  },
  data() {
    return {
      modal: {},
      qty: 1,
    };
  },
  methods: {
    openModal() {
      this.modal.show();
    },
    closeModal() {
      this.modal.hide();
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.userProductModal);
  },
};
</script>

<template src="./UserProductModalComponent.html"></template>
