<template>
  <div class="wrap">
  <div class="cell"> 
  <div class="login-wrap">
    <div class="login-header">
      <img src="../assets/login-logo.png" alt="photo">
    </div>
    <div class="login-content">
      <el-row :gutter="20" class="title">
        <el-col :span="6" :offset="7"><router-link to="/login" class="router-link login">登录</router-link></el-col>
        <el-col :span="6" :offset="1"><router-link to="/register" class="router-link">注册</router-link></el-col>
      </el-row>
      
      <el-form ref="form" :model="inputObj" :rules="rules" label-width="120px">
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

let Base64 = require('js-base64').Base64;

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
                //localStorage.removeItem("currentUser_token");
                //console.log(this.$store.state.currentUser);
                // var token = Base64.decode(this.$store.state.token.split('.')[1]);
                // token = eval("(" + token + ")")
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
    margin-top: -50px;
  }
  .cell{
    display: table-cell;
    vertical-align: middle;
  }
  .login-header{
    text-align: center;
  }
  .login-content{
    width: 500px;
    height: 300px;
    margin: 20px auto;
    background: #ffffff;
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
    height: 50px;
    line-height: 50px;
    position: fixed;
    left: 0;
    bottom: 0;
    text-align: center;
    font-size: 12px;
    color: #c1c1c1;
    background: #ffffff;
  }
</style>


