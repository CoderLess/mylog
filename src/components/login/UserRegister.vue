<template>
  <div class="containerBox">
    <el-form :model="registerForm" :rules="registerFormRules" ref="registerFormRef">
      <el-form-item prop="userName">
        <el-input
          class="usernameBox"
          placeholder="手机号/邮箱"
          prefix-icon="el-icon-user"
          v-model="registerForm.userName"
          :spellcheck="false"
        ></el-input>
      </el-form-item>
      <el-form-item prop="passWord">
        <el-input
          type="password"
          class="passwordBox"
          placeholder="请输入密码"
          prefix-icon="el-icon-lock"
          v-model="registerForm.passWord"
        ></el-input>
      </el-form-item>
      <el-form-item prop="repassWord">
        <el-input
          type="password"
          class="passwordBox"
          placeholder="请输入密码"
          prefix-icon="el-icon-lock"
          v-model="registerForm.repassWord"
        ></el-input>
      </el-form-item>
      <el-form-item prop="validateCode">
        <el-col :span="11">
          <el-input class="passwordBox" placeholder="请输入验证码" v-model="registerForm.validateCode"></el-input>
        </el-col>
        <el-col :span="11">
          <img :src="src" @click="changeCode" />
        </el-col>
      </el-form-item>
      <el-button class="registerBtn" type="primary" @click="registerHandle">注册</el-button>
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
    var checkRepassWord = (rule, value, callback) => {
      if(this.registerForm.passWord===this.registerForm.repassWord){
        return callback()
      } else {
        return callback('两次密码不一致,请重新输入')
      }
    };
    return {
      // 注册表单数据
      registerForm: {
        userName: '',
        passWord: '',
        validateCode: '',
        repassWord: ''
      },
      // 验证码url
      src: '',
      registerFormRules: {
        userName: [
          { required: true, message: '请输入用户名 电话或邮箱', trigger: 'blur' },
          { validator: checkUserName, trigger: 'blur' }
        ],
        passWord: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        validateCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          // 正则表达式用用法
          { pattern: /^[0-9a-zA-Z]{4}$/, message: '验证码输入错误', trigger: 'blur' }
        ],
        repassWord: [
          { validator: checkRepassWord, trigger: 'blur' }
        ]
      }
    };
  },

  methods: {
    changeCode() {
      this.$http.get('/imageCode', { responseType: 'arraybuffer' }).then(res => {
        window.sessionStorage.setItem('img-token',res.headers.authorization)
        return 'data:image/png;base64,' + btoa(
          new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
        )
      }).then(data => {
        this.src = data
      })
    },
    registerHandle() {
      this.$refs.registerFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('users/register', this.registerForm, {headers:{'img-token':window.sessionStorage.getItem('img-token')}})
        if (res.status !== 200) return this.$message.error(res.message)
        this.$message.success(res.message)
        this.$router.push('/login')
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
  margin-top: 25px;
}
.containerBox {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 0 auto;
}
.el-form-item {
  margin-bottom: 20px;
}
.registerBtn {
  width: 300px;
}
</style>