<template>
  <div class="wrap">
  <div class="cell"> 
  <div class="register-wrap">
    <div class="register-header">
      <img src="../assets/login_nav.png" alt="photo">
    </div>
    <div class="register_parent">
      <div class="register-decoration">
        <p class="p1">X射线小角散射(SAXS)线站</p>
        <p class="p2">x射线小角散射(SAXS)线站将以蛋白质在溶液状态下的结构、动态变化和相互作用为主要研究方向，重点开展以时间分辨为主的动态过程研究工作。</p>
        <img style="width:400px;" src="../assets/login_main.png" alt="photo">
      </div>
      <div class="register-content">
        <el-row :gutter="20" class="title">
          <el-col :span="6" :offset="6"><router-link to="/login" class="router-link">登录</router-link></el-col>
          <el-col :span="6" :offset="2"><router-link to="/register" class="router-link register">注册</router-link></el-col>
        </el-row>
        
        <el-form ref="form" :model="inputObj" :rules="rules" label-width="100px">
          <el-form-item label="邮箱" prop="email">
            <el-col :span="18">
              <el-input v-model="inputObj.email" placeholder="请输入邮箱"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="" prop="verificationCode">
            <el-col :span="9">
              <el-input type="password" v-model="inputObj.verificationCode" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="8" :offset="1">
              <el-button type="primary" style="width:100%;background:#00589c;border-color:#00589c;" @click="getCode">获取验证码</el-button>
            </el-col>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-col :span="18">
              <el-input type="password" v-model="inputObj.password" placeholder="请输入密码"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="确认密码" prop="repwd">
            <el-col :span="18">
              <el-input type="password" v-model="inputObj.repwd" placeholder="确认密码"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width:75%;background:#00589c;border-color:#00589c;" @click="register">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="register-footer">
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
  name:'register',
  data(){
    var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.inputObj.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      inputObj : {
        email: '',
        verificationCode: '',
        password: '',
        repwd: ''
      },
      rules: {
        email: [{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
                { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }],
        password: [{required: true, message: '请输入密码',trigger: 'blur'},
                   {min: 6, message: '密码不得小于6位', trigger: 'blur,change'}],
        repwd: [{required: true,validator: validatePass2, trigger: 'blur,change'}]
      }
    }
  },
  methods: {
    //登录
    register(){
      if(this.inputObj.email && this.inputObj.password){
        let params = {
          email:this.inputObj.email,
          pwd: this.inputObj.password,
          repwd: this.inputObj.repwd,
          verificationCode: this.inputObj.verificationCode
        }
        api.Register(params)
            .then(res => {
              if(res.status == 1) {
                this.$router.replace('/login');
              }
            })
            .catch(error => {
              console.log(error)
            })
      }
    },

    //获取验证码
    getCode(){

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
  .register-header{
    width: 100%;
    height: 80px;
    position: fixed;
    left: 0;
    top: 0;
    background: #ffffff;
  }
  .register-header img{
    margin-left: 20px;
  }
  .register_parent{
    width: 810px;
    height: 420px;
    margin: 20px auto;
    overflow: hidden;
    margin-top: 35px;
  }
  .register-decoration{
    width: 400px;
    height: 350px;
    float: left;
    padding-top: 20px;
    padding-right: 10px;
  }
  .register-decoration .p1{
    font-size: 20px;
    color: #01589d;
    width: 330px;
    margin-left: 68px;
    line-height: 4em;
  }
  .register-decoration .p2{
    font-size: 12px;
    color: #666;
    width: 330px;
    margin-left: 68px;
  }
  .register-content{
    width: 400px;
    height: 400px;
    float: left;
    background: #ffffff;
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
  .register{
    border-bottom: 4px solid #00589c;
  }
  .register-footer{
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


