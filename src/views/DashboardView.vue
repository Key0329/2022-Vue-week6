<template>
  <h1 class="mb-5">這裡是後台頁面</h1>
  <router-link to="/">回到前台</router-link> |
  <router-link to="/admin/products/1">後台產品列表</router-link> |
  <router-link to="/admin/orders">後台訂單</router-link> |
  <a href="#" @click.prevent="logout">登出</a>
  <hr />
  <router-view></router-view>
</template>

<script>
import { RouterView, RouterLink } from 'vue-router';

const { VITE_URL } = import.meta.env;

export default {
  components: {
    RouterView,
    RouterLink,
  },
  methods: {
    logout() {
      document.cookie = `hexVueWeek3Token=;expires=${new Date()};`;
      this.$router.push('/login');
    },
    checkAdmin() {
      this.$http
        .post(`${VITE_URL}/api/user/check`)
        .then(() => {})
        .catch(() => {
          alert('登入失敗');
          this.$router.push('/login');
        });
    },
  },
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexVueWeek3Token\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    this.$http.defaults.headers.common.Authorization = token;
    this.checkAdmin();
  },
};
</script>
