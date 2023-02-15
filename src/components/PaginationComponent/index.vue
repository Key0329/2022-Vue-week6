<script>
export default {
  name: 'pagination-component',
  props: {
    pages: {
      type: Object,
      required: true,
    },
  },
  methods: {
    changePage(page, e) {
      this.$emit('getProductsData', page, e);
    },
  },
};
</script>

<template src="./template.html"></template>
