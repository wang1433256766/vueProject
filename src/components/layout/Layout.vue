<template>
	<div class="wrap">
		<div class="navbar">
			<img src="../../assets/nav-logo.png" alt="photo">
			<div class="account"><a @click="myaccount">{{username}}</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a @click="logout">{{registerOrLogout}}</a></div>
		</div>
		<div class="sidebar">
			<ul>
				<li><router-link to="/fileMgn"><img src="../../assets/file-2.png" alt="photo">文件管理</router-link></li>
				<li><router-link to="/userTo"><img src="../../assets/userTo-2.png" alt="photo">实验人员安排</router-link></li>
				<li><router-link to="/userMgn"><img src="../../assets/userMgn-2.png" alt="photo">角色管理</router-link></li>
				<li><router-link to="/optLog"><img src="../../assets/opt-2.png" alt="photo">操作日志</router-link></li>
				<li><router-link to="/csstudio"><img src="../../assets/csstudio-2.png" alt="photo">csstudio操作界面</router-link></li>
			</ul>
		</div>
		<div class="app-main">
			<router-view></router-view>
		</div>
		<div class="footer">
			Copyright@ 2013 National Center for Protein Science | 沪ICP备05033115号
		</div>
	</div>
</template>

<script>
import api from '@/fetch/api'

let Base64 = require('js-base64').Base64;
let username = '登录';
let registerOrLogout = '注册';

export default {
  name: 'layout',
  data(){
	if(localStorage.getItem('user_token')){
		username = Base64.decode(localStorage.getItem('user_token').split('.')[1]);
		username = eval('('+username+')').sub;
		registerOrLogout = '注销';
	}else{
		username = '登录';
		registerOrLogout = "注册";
	}
  	return {
  		username:username,
  		registerOrLogout:registerOrLogout
  	}
  },
  methods: {
  	delCookie(name){//为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间 
        var date = new Date(); 
        date.setTime(date.getTime() - 10000); 
        document.cookie = name + "=a; expires=" + date.toGMTString(); 
    },
  	myaccount(){
  		if(localStorage.getItem('user_token')){
  			this.$router.replace('/myaccount');
  		}else{
  			this.$router.replace('/login');
  		}
  	},
  	logout(){
  	  	if(localStorage.getItem('user_token')){
  	  		api.Logout()
  	  			.then(res => {
  	  				localStorage.removeItem("user_token");
  	  				this.delCookie('hxfilter');
  	  				this.$router.replace('/login');
  	  			})
  	  			.catch(error => {
  	  				console.log(error);
  	  			})
  	  		
  	  	}else{
  	  		this.$router.replace('/register');
  	  	}
  	}
  }
}
</script>

<style scoped>
	body{
		justify-content: left;
	}
	.navbar{
		width: 100%;
		min-width: 1100px;
		height: 80px;
		background: #00589c;
		position: absolute;
		top: 0;
	}
	.navbar img{
		vertical-align: middle;
		float: left;
	}
	.navbar .account{
		float: right;
		margin-right: 20px;
		line-height: 80px;
		color: #ffffff;
	}
	.navbar .account a{
		text-decoration: none;
		color: #ffffff;
		font-size: 16px;
		cursor: pointer;
	}
	.sidebar{
		width: 220px;
		background: #3f3f3f;
		position: absolute;
		top: 80px;
		bottom: 0;
		z-index: 999;
	}
	.sidebar ul li{
		list-style: none;
	}
	.sidebar ul li a{
		display: block;
		padding-left: 25px;
		height: 50px;
		line-height: 50px;
		text-decoration: none;
		color: #ffffff;
	}
	.sidebar ul li a:hover{
		background: #f4f8fb;
		color: #00589c;
	}
	.sidebar ul li a img{
		vertical-align: middle;
		width: 30px;
		margin-right: 10px;

	}
	.sidebar ul li .router-link-active{
		background: #f4f8fb;
		color: #00589c;
	}
	.app-main{
		width: 100%;
		min-width: 1100px;
		position: absolute;
		top: 80px;
		bottom: 50px;
		padding-left: 220px;
		box-sizing: border-box;
		background: #f4f8fb;
	}
	.footer{
		position: absolute;
		bottom: 0;
		background: #f4f8fb;
		height: 50px;
		line-height: 50px;
		width: 100%;
		min-width: 1100px;
		padding-left: 220px;
		box-sizing: border-box;
		text-align: center;
	    font-size: 12px;
	    color: #c1c1c1;
	}
</style>