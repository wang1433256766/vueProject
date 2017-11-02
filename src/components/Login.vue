<template>
  <div class="wrap">
  <div class="cell"> 
  <div class="login-wrap">
    <div class="login-header">
      <img src="../assets/login_nav.png" alt="photo">
    </div>
    <div class="login_parent">
      <div class="login-decoration">
        <p class="p1">X射线小角散射(SAXS)线站</p>
        <p class="p2">x射线小角散射(SAXS)线站将以蛋白质在溶液状态下的结构、动态变化和相互作用为主要研究方向，重点开展以时间分辨为主的动态过程研究工作。</p>
        <img style="width:400px;" src="../assets/login_main.png" alt="photo">
      </div>
      <div class="login-content">
        <el-row :gutter="20" class="title">
          <el-col :span="6" :offset="6"><router-link to="/login" class="router-link login">登录</router-link></el-col>
          <el-col :span="6" :offset="2"><router-link to="/register" class="router-link">注册</router-link></el-col>
        </el-row>
        
        <el-form ref="form" :model="inputObj" :rules="rules" label-width="100px">
          <el-form-item label="邮箱" prop="email">
            <el-col :span="18">
              <el-input v-model="inputObj.email" placeholder="请输入邮箱"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-col :span="18">
              <el-input type="password" v-model="inputObj.password" placeholder="请输入密码"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width:75%;background:#00589c;border-color:#00589c;" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="login-footer">
      Copyright@ 2013 National Center for Protein Science | 沪ICP备05033115号
    </div>
  </div>
  </div>
  </div>
</template>

<script>
import api from '@/fetch/api'
import store from '@/vuex/store'

export default {
  name:'login',
  data(){
    return {
      inputObj : {
        email: '',
        password: ''
      },
      rules: {
        email: [{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
                { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }],
        password: [{required: true, message: '请输入密码',trigger: 'blur'},
                   {min: 6, message: '密码不得小于6位', trigger: 'blur,change'}]
      }
    }
  },
  methods: {
    //登录
    login(){
      if(this.inputObj.email && this.inputObj.password){
        let params = {
          email:this.inputObj.email,
          pwd: this.inputObj.password
        }
        api.Login(params)
            .then(res => {
              if(res.status == 1) {
                this.$store.commit('setToken',res.data);
                this.$router.replace('/fileMgn');
              }
            })
            .catch(error => {
              console.log(error)
            })
      }
    }
  }
}
</script>

<style scoped>
  .wrap{
    display: table;
    width: 100%;
    height: 100%;
  }
  .cell{
    display: table-cell;
    vertical-align: middle;
  }
  .login-header{
    width: 100%;
    height: 80px;
    position: fixed;
    left: 0;
    top: 0;
    background: #ffffff;
  }
  .login-header img{
    margin-left: 20px;
  }
  .login_parent{
    width: 810px;
    height: 350px;
    margin: 20px auto;
    overflow: hidden;
  }
  .login-decoration{
    width: 400px;
    height: 350px;
    float: left;
    padding-top: 20px;
    padding-right: 10px;
  }
  .login-decoration .p1{
    font-size: 20px;
    color: #01589d;
    width: 330px;
    margin-left: 68px;
    line-height: 4em;
  }
  .login-decoration .p2{
    font-size: 12px;
    color: #666;
    width: 330px;
    margin-left: 68px;
  }
  .login-content{
    width: 400px;
    height: 350px;
    background: #ffffff;
    float: left;
    padding-top: 20px;
    box-sizing: border-box;
    border-radius: 8px;
  }
  .title{
    padding: 30px 0;
  }
  .router-link{
    color: #666;
    text-decoration: none;
    font-size: 24px;
    font-weight: bold;
    padding: 5px 2px;
  }
  .login{
    border-bottom: 4px solid #00589c;
  }
  .login-footer{
    width: 100%;
    height: 80px;
    line-height: 80px;
    position: fixed;
    left: 0;
    bottom: 0;
    text-align: center;
    font-size: 12px;
    color: #c1c1c1;
    background: #ffffff;
  }
</style>


