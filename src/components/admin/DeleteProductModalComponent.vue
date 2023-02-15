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

<template>
  <div
    id="delProductModal"
    ref="delProductModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delProductModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delProductModalLabel" class="modal-title">
            <span>刪除產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger">{{ product.title }}</strong>
          商品<br />
          (刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="deleteProduct">
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
