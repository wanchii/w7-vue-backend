<template>
    <div>
        <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
          <a class="navbar-brand col-md-3 col-lg-2 mr-0 px-3 chewy" href="#">a little</a>
          <button
          class="navbar-toggler position-absolute d-md-none collapsed"
          type="button" data-toggle="collapse"
          data-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
          </button>
          <ul class="navbar-nav px-3">
            <li class="nav-item text-nowrap">
              <a class="nav-link" href="#" @click.prevent="signOut">登出</a>
            </li>
          </ul>
        </nav>

<div class="container-fluid">
  <div class="row">
    <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div class="sidebar-sticky pt-3">
        <ul class="nav flex-column">
          <li class="nav-item">
            <a class="nav-link" href="#">
              <span data-feather="home"></span>
            後台管理頁面 <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item">
            <router-link
            to="/admin/products"
            class="nav-link">
            <span data-feather="shopping-cart"></span>
            產品頁面
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
            to="/admin/orders"
            class="nav-link">
            <span data-feather="file"></span>
            訂單列表
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
            to="/admin/coupons"
            class="nav-link">
            <span data-feather="dollar-sign"></span>
            優惠券
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
            to="/admin/storages"
            class="nav-link">
            <span data-feather="folder-plus"></span>
            圖片儲存
            </router-link>
          </li>
        </ul>
      </div>
    </nav>

    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
      <router-view :token="token" v-if="checkSuccess" />
    </main>
  </div>
    </div>
    </div>
</template>

<script>
import feather from 'feather-icons';

export default {
  data() {
    return {
      token: '',
      checkSuccess: false,

    };
  },
  created() {
    this.checkLogin();
  },
  mounted() {
    feather.replace();
  },
  methods: {
    checkLogin() {
      // 從cookies取得token
      this.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
      // 將token加到header
      this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`;
      // POST api/auth/check 驗證token
      const url = `${process.env.VUE_APP_APIPATH}auth/check`;

      this.$http.post(url, { api_token: this.token })
        .then((res) => {
          // eslint-disable-next-line no-console
          console.log(res);
          this.checkSuccess = true;
        }).catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error.response.data.errors);
          this.$router.push('/login');
        });
    },
    signOut() {
      // POST api/auth/logout
      const url = `${process.env.VUE_APP_APIPATH}auth/logout`;
      this.$http.post(url, { api_token: this.token })
        .then((res) => {
          // eslint-disable-next-line no-console
          console.log(res.data.message);
          this.$router.push('/');
        }).catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error.response.data.errors);
        });
    },

  },

};
</script>

<style lang="scss" scoped>
body {
  font-size: .875rem;
}

.feather {
  width: 16px;
  height: 16px;
  vertical-align: text-bottom;
}

/*
 * Sidebar
 */

.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100; /* Behind the navbar */
  padding: 48px 0 0; /* Height of navbar */
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
}

@media (max-width: 767.98px) {
  .sidebar {
    top: 5rem;
  }
}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: .5rem;
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}

@supports ((position: -webkit-sticky) or (position: sticky)) {
  .sidebar-sticky {
    position: -webkit-sticky;
    position: sticky;
  }
}

.sidebar .nav-link {
  font-weight: 500;
  color: #333;
}

.sidebar .nav-link .feather {
  margin-right: 4px;
  color: #999;
}

.sidebar .nav-link.active {
  color: #007bff;
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
  color: inherit;
}

.sidebar-heading {
  font-size: .75rem;
  text-transform: uppercase;
}

/*
 * Navbar
 */

.navbar-brand {
  padding-top: .25rem;
  padding-bottom: .25rem;
  font-size: 1.75rem;
  background-color: rgba(0, 0, 0, .25);
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .25);
}

.navbar .navbar-toggler {
  top: .25rem;
  right: 1rem;
}

.navbar .form-control {
  padding: .75rem 1rem;
  border-width: 0;
  border-radius: 0;
}

.form-control-dark {
  color: #fff;
  background-color: rgba(255, 255, 255, .1);
  border-color: rgba(255, 255, 255, .1);
}

.form-control-dark:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, .25);
}

</style>
