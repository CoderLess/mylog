<template>
  <div class="containerBox">
    <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef">
      <!-- 用户名区域 -->
      <el-form-item prop="userName">
        <el-input
          class="usernameBox"
          placeholder="手机号/邮箱"
          prefix-icon="el-icon-user"
          v-model="loginForm.userName"
          :spellcheck="false"
        ></el-input>
      </el-form-item>
      <!-- 密码输区域 -->
      <el-form-item prop="passWord">
        <el-input
          type="password"
          class="passwordBox"
          placeholder="请输入密码"
          prefix-icon="el-icon-lock"
          v-model="loginForm.passWord"
        ></el-input>
      </el-form-item>
      <!-- 验证码区域 -->
      <el-form-item prop="validateCode">
        <!-- 验证码输入框 -->
        <el-col :span="11">
          <el-input class="passwordBox" placeholder="请输入验证码" v-model="loginForm.validateCode"></el-input>
        </el-col>
        <!-- 验证码图片区域 -->
        <el-col :span="11">
          <img :src="src" @click="changeCode" />
        </el-col>
      </el-form-item>
      <el-button class="loginBtn" type="primary" @click="loginHandle">登入</el-button>
    </el-form>
  </div>
</template>

<script>

export default {
  data() {
    // 自定义过滤规则
    var checkUserName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'));
      }
      const phoneOrEmail = /(^([A-Za-z0-9_\-\\.\u4e00-\u9fa5])+@([A-Za-z0-9_\-\\.])+\.([A-Za-z]{2,8})$)|(^1[3456789]\d{9})/;
      if (phoneOrEmail.test(value)) {
        return callback()
      } else {
        return callback('请输入正确的手机号或邮箱')
      }
    };
    return {
      loginForm: {
        userName: '',
        passWord: '',
        validateCode: '',
      },
      src: '',
      // 自定义验证规则
      loginFormRules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { validator: checkUserName, trigger: 'blur' }
        ],
        passWord: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        validateCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          // 正则表达式用用法
          // { pattern: /^[a-z]{4}$/, message: '请输入正确的验证码', trigger: 'blur' }
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    };
  },

  methods: {
    changeCode() {
      this.$http.get('/imageCode', { responseType: 'arraybuffer' }).then(res => {
        window.sessionStorage.setItem('img-token', res.headers.authorization)
        return 'data:image/png;base64,' + btoa(
          new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
        )
      }).then(data => {
        this.src = data
      }).catch(ex => {
        console.log(ex)
      })
    },
    loginHandle() {
      this.$refs.loginFormRef.validate((valid) => {
        // 校验失败返回
        if (!valid) { return }
        // 校验成功走登入接口
        this.$http.post('/users/login', this.loginForm, {headers:{'img-token':window.sessionStorage.getItem('img-token')}}).then(res => {
          if (res.data.status != 200) {
            this.$message.error(res.data.message)
            this.changeCode()
            return
          }
          this.$message.success(res.data.message)
          window.sessionStorage.setItem('token', res.data.token)
          this.$router.push('/index')
        })
      })
    }
  },
  mounted() {
    this.changeCode()
  }

}

</script>
<style lang='less' scoped>
.containerBox {
  width: 80%;
  height: 100%;
}

.usernameBox {
  margin-top: 55px;
}
.containerBox {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 0 auto;
}
.loginBtn {
  width: 300px;
}
</style>