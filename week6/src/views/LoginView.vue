<template>
        <div class="container">
            <div class="row justify-content-center">
                <h1 class="h3 mb-3 font-weight-normal">
                    請先登入
                </h1>
                <div class="col-8">
                    <!-- 避免提交表單刷新頁面，綁定@submit.prevent -->
                    <form id="form" class="form-signin" @submit.prevent="login">
                        <div class="form-floating mb-3">
                            <input type="email" class="form-control" id="username" placeholder="name@example.com"
                                required autofocus v-model="user.username">
                            <label for="username">Email address</label>
                        </div>
                        <div class="form-floating">
                            <input type="password" class="form-control" id="password" placeholder="Password" required
                                v-model="user.password">
                            <label for="password">Password</label>
                        </div>
                        <button class="btn btn-lg btn-primary w-100 mt-3" type="submit" id="login">
                            登入
                        </button>
                    </form>
                </div>
            </div>
            <p class="mt-5 mb-3 text-muted">
                &copy; 2021~∞ - 六角學院
            </p>
        </div>
</template>

<script>
import axios from 'axios'
const { VITE_URL } = import.meta.env

export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      axios.post(`${VITE_URL}/v2/admin/signin`, this.user)
        .then(res => {
          // 取得data token, expired
          const { token, expired } = res.data

          // 存入cookie
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}; path=/;`
          // 轉址
          this.$router.push('./dashboard')
        })
        .catch(err => {
          console.dir(err)
          alert(err.response.data.message)
        })
    }
  }
}
</script>
