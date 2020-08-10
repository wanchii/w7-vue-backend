<template>
    <div class="login">
      <Loading :active.sync="isLoading" />
        <div class="container">
            <div class="login-bg d-flex justify-content-center align-items-center">
                <div class="loginForm p-4 ">
                    <h1 class="font-weight-bold text-center mb-3"> Login</h1>
                    <!-- @submit.prevent，事件修飾符，表單送出後畫面不會重新載入-->
                    <form @submit.prevent="signin">
                        <div class="form-group">
                            <label for="inputEmail1" class="sr-only">Email address</label>
                            <input type="email" class="form-control" id="inputEmail1"
                            aria-describedby="emailHelp" placeholder="Enter email"
                            v-model='user.email' required  autocomplete="username">

                        </div>
                        <div class="form-group">
                            <label for="inputPassword1" class="sr-only">Password</label>
                            <input type="password" class="form-control" id="inputPassword1"
                            placeholder="Password" v-model="user.password" required
                            autocomplete="current-password">
                        </div>

                        <button type="submit" class="btn btn-primary w-100">登入</button>
                        <p class="mt-5 mb-3 text-muted">
                          &copy; 2020~∞ - Emily Chen
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      token: '',
      isLoading: false,
    };
  },
  methods: {
    signin() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}auth/login`;
      this.$http.post(url, this.user)
        .then((response) => {
          const { token } = response.data;
          const { expired } = response.data;
          document.cookie = `token=${token}; expires=${new Date(expired * 1000)}; path=/`;
          this.$bus.$emit('message:push',
            '登入成功',
            'success');
          this.isLoading = false;
          this.$router.push('/admin/products');
        }).catch((error) => {
          this.$bus.$emit('message:push',
            `登入失敗，請重新輸入
            ${error}`,
            'danger');
          this.isLoading = false;
        });
    },

  },
};
</script>

<style lang="scss" scoped>
.login-bg{
  background-image: url(../assets/images/spices-digital-paper-5049060_1920.jpg);
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  max-width: 1200px;
  height: 100vh;
}
</style>
