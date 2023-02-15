<!-- eslint-disable camelcase -->
<script>
import { mapState, mapActions } from 'pinia';
import cartStore from '../../stores/front/cartStore';
import statusStore from '../../stores/statusStore';

const { VITE_PATH, VITE_URL } = import.meta.env;

export default {
  data() {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  computed: {
    ...mapState(cartStore, ['cart']),
    ...mapState(statusStore, ['loadingItem']),
  },
  methods: {
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value)
        ? true
        : '請填入 09 為開頭的十位數手機號碼';
    },
    ...mapActions(cartStore, [
      'deleteAllCart',
      'deleteCartItem',
      'getCartsData',
      'updateCartItem',
    ]),
    createOrder() {
      if (this.cart.carts.length === 0) {
        alert('購物車內無品項');
        return;
      }
      const order = this.form;

      this.$http
        .post(`${VITE_URL}/api/${VITE_PATH}/order`, { data: order })
        .then((res) => {
          alert(`${res.data.message}，訂單號碼為 ${res.data.orderId}`);
          this.getCartsData();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
      this.$refs.form.resetForm();
      this.form.message = '';
    },
  },
  mounted() {
    this.getCartsData();

    const loader = this.$loading.show();
    // simulate AJAX
    setTimeout(() => {
      loader.hide();
    }, 1000);
  },
};
</script>

<template>
  <div class="container">
    <div class="mt-4">
      <!-- 購物車列表 -->
      <div v-if="!cart?.carts?.length">
        <h5>購物車內尚無商品</h5>
      </div>
      <div v-else>
        <div class="text-end">
          <button
            class="btn btn-outline-danger"
            type="button"
            @click="deleteAllCart"
          >
            清空購物車
          </button>
        </div>
        <table class="table align-middle">
          <thead>
            <tr>
              <th></th>
              <th>品名</th>
              <th style="width: 150px">數量/單位</th>
              <th>單價</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="cart.carts">
              <tr v-for="cart in cart.carts" :key="cart.id">
                <td>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    :disabled="cart.id === loadingItem"
                    @click="deleteCartItem(cart)"
                  >
                    <i
                      class="fas fa-spinner fa-pulse"
                      v-if="cart.id === loadingItem"
                    ></i>
                    x
                  </button>
                </td>
                <td>
                  {{ cart.product.title }}
                  <!-- <div class="text-success">已套用優惠券</div> -->
                </td>
                <td>
                  <div class="input-group input-group-sm">
                    <select
                      name=""
                      id=""
                      class="form-control"
                      :disabled="cart.id === loadingItem"
                      v-model="cart.qty"
                      @change="updateCartItem(cart)"
                    >
                      <option :value="i" v-for="i in 20" :key="i">
                        {{ i }}
                      </option>
                    </select>
                  </div>
                </td>
                <td class="text-end">
                  <small class="text-success">折扣價：</small>
                  {{ cart.final_total }}
                </td>
              </tr>
            </template>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-end">總計</td>
              <td class="text-end">{{ cart.total }}</td>
            </tr>
            <tr>
              <td colspan="3" class="text-end text-success">折扣價</td>
              <td class="text-end text-success">{{ cart.final_total }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    <!-- 表單 -->
    <div class="my-5 row justify-content-center text-start">
      <v-form
        ref="form"
        class="col-md-6"
        v-slot="{ errors }"
        @submit="createOrder"
      >
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <v-field
            id="email"
            name="email"
            type="email"
            class="form-control"
            placeholder="請輸入 Email"
            v-model="form.user.email"
            :class="{ 'is-invalid': errors['email'] }"
            rules="email|required"
          ></v-field>
          <error-message name="email" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="name" class="form-label">收件人姓名</label>
          <v-field
            id="name"
            label="姓名"
            name="username"
            type="text"
            class="form-control"
            placeholder="請輸入姓名"
            v-model="form.user.name"
            :class="{ 'is-invalid': errors['username'] }"
            rules="required"
          ></v-field>
          <error-message
            name="username"
            class="invalid-feedback"
          ></error-message>
        </div>

        <div class="mb-3">
          <label for="tel" class="form-label">收件人電話</label>
          <v-field
            id="tel"
            name="tel"
            label="電話"
            type="tel"
            class="form-control"
            placeholder="請輸入電話"
            v-model="form.user.tel"
            :class="{ 'is-invalid': errors['tel'] }"
            :rules="isPhone"
          ></v-field>
          <error-message name="tel" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="address" class="form-label">收件人地址</label>
          <v-field
            id="address"
            name="address"
            label="地址"
            type="text"
            class="form-control"
            placeholder="請輸入地址"
            v-model="form.user.address"
            :class="{ 'is-invalid': errors['address'] }"
            rules="required"
          ></v-field>
          <error-message
            name="address"
            class="invalid-feedback"
          ></error-message>
        </div>

        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <textarea
            id="message"
            class="form-control"
            cols="30"
            rows="10"
            v-model="form.message"
          ></textarea>
        </div>
        <div class="text-end">
          <button
            type="submit"
            class="btn btn-danger"
            :disabled="
              form.user.address === '' ||
              form.user.email === '' ||
              form.user.name === '' ||
              form.user.tel === ''
            "
          >
            送出訂單
          </button>
        </div>
      </v-form>
    </div>
  </div>
</template>
