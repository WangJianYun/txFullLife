<template>
  <div class="login-container">
    <div class="login-header"></div>
    <div class="container">
      <div class="login-container-title">高速公路全寿命周期智能管理平台</div>
      <div class="login-container-form">
        <h2>欢迎您，请登录</h2>
        <el-form
          :model="form"
          ref="form"
          :rules="rules"
          class="login-form"
          @keyup.enter.native="onSubmit"
        >
          <el-form-item prop="userName" label="用户名">
            <el-input
              v-model="form.userName"
              placeholder="用户名"
              style="width:100%"
            ></el-input>
          </el-form-item>
          <span class="icon1 icon">*</span>
          <el-form-item prop="password" label="密码">
            <el-input
              type="password"
              placeholder="密码"
              style="width:100%"
              v-model="form.password"
            ></el-input>
          </el-form-item>
          <span class="icon2 icon">*</span>
          <el-form-item>
            <el-button
              type="primary"
              style="width:100%"
              @click="onSubmit"
              :loading="isload"
              :disabled="isdisabled"
              >登录</el-button
            >
            <span class="msg">{{ msg }}</span>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="login-container-footer">
      版权所有：陕西省高速集团公司
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'
export default {
  data() {
    return {
      form: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      menuData: [],
      menuData1: [],
      msg: '',
      menuType: '',
      isload: false,
      isdisabled: false
    }
  },
  methods: {
    onSubmit() {
      this.isload = true
      this.isdisabled = true
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.$api.post('/cycle/login/login', this.form, null, r => {
            this.$nextTick(() => {
              if (r.msg === 'success') {
                Message({
                  showClose: true,
                  message: '登录成功',
                  type: 'success'
                })
              } else {
                Message({
                  showClose: true,
                  message: r.msg,
                  type: 'warning'
                })
                this.isload = false
                this.isdisabled = false
              }
            })
            this.menuData = JSON.stringify(r.data.menuList)
            this.menuType = JSON.stringify(r.data.menuType)
            // this.menuData = JSON.stringify(r.data)
            // eslint-disable-next-line no-eval
            // console.log(this.menuData)
            sessionStorage.clear()
            sessionStorage.setItem('id', r.data.M0018_ID)
            sessionStorage.setItem('currentUser', JSON.stringify(r.data))
            sessionStorage['TokenId'] = r.data.TokenId
            sessionStorage.setItem('menuData', this.menuData)
            sessionStorage.setItem('menuType', this.menuType)
            // this.$router.push('/workBanch')
            this.$router.push({
              // path: `/Manage/${this.menuData}/${this.menuType}`
              path: '/Manage'
            })
            // this.$router.push({
            //   path: '/Manage',
            //   query: {
            //     menu: this.menuData
            //   }
            // })
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style>
.login-container {
  height: 100%;
  background: url('../assets/002.jpg') no-repeat 0% 0%;
  background-size: 100% 100%;
}
.login-header {
  height: 15%;
}
.container {
  width: 70%;
  margin: 0 auto;
  position: relative;
  height: 70%;
  /* background-image: linear-gradient(#32323c, #1FB5AC); */
}
.login-container-title {
  width: 100%;
  font-size: 30px;
  letter-spacing: 2px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  /* margin: 30px 0 50px 0; */
  /* padding-left: 50px; */
  color: #fff;
  position: absolute;
  left: 50px;
  top: 30px;
}
.login-container-form {
  padding: 10px;
  /* margin-left: 50px; */
  width: 30%;
  border-radius: 5px;
  text-align: center;
  background: #fff;
  position: absolute;
  left: 50px;
  top: 150px;
  border: 1px solid #000;
}
@media screen and (max-width: 1400px) {
  .login-container-form h2 {
    display: none;
  }
}
.login-form {
  width: 80%;
  margin: 0 auto;
  min-height: 200px;
  background-color: #ffffff;
}
.login-container-footer {
  width: 100%;
  text-align: center;
  color: #fff;
  font-size: 14px;
  margin-top: 100px;
}
.msg {
  color: red;
}
.icon {
  color: red;
  position: relative;
  left: 140px;
  top: -50px;
}
</style>
