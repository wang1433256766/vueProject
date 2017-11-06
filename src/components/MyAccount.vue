<template>
	<div class="wrap">
		<el-tabs v-model="activeName" @tab-click="handleClick">
		    <el-tab-pane label="个人中心" name="first">
		    	<div style="margin-top: 15px;">
			    	<el-input placeholder="" v-model="inputMyAccount.email" disabled>
					    <template slot="prepend">邮箱</template>
					</el-input>
				</div>
				<div style="margin-top: 15px;">
					<el-input placeholder="" v-model="inputMyAccount.username" disabled>
					    <template slot="prepend">用户名</template>
					</el-input>
				</div>
				<div style="margin-top: 15px;">
					<el-input placeholder="" v-model="inputMyAccount.department" disabled>
					    <template slot="prepend">单位</template>
					</el-input>
				</div>
				<div style="margin-top: 15px;">
					<el-input placeholder="" v-model="inputMyAccount.tel" disabled>
					    <template slot="prepend">联系方式</template>
					</el-input>
				</div>
		    </el-tab-pane>
		    <el-tab-pane label="资料修改" name="second">
		    	<div style="margin-top: 15px;">
			    	<el-input placeholder="请输入邮箱" v-model="inputUpt.email" disabled>
					    <template slot="prepend">邮箱</template>
					</el-input>
				</div>
				<div style="margin-top: 15px;">
					<el-input placeholder="请输入用户名" v-model="inputUpt.username">
					    <template slot="prepend">用户名</template>
					</el-input>
				</div>
				<div style="margin-top: 15px;">
					<el-input placeholder="请输入单位" v-model="inputUpt.department">
					    <template slot="prepend">单位</template>
					</el-input>
				</div>
				<div style="margin-top: 15px;">
					<el-input placeholder="请输入联系方式" v-model="inputUpt.tel">
					    <template slot="prepend">联系方式</template>
					</el-input>
				</div>
				<div style="margin-top: 25px;text-align:center;">
					<el-button type="primary" @click="updateMyInfo">确认修改</el-button>
				</div>
		    </el-tab-pane>
		    <el-tab-pane label="密码修改" name="third">
		    	<div style="margin-top: 15px;">
			    	<el-input placeholder="请输入原密码" v-model="inputPwd.password">
					    <template slot="prepend">原密码</template>
					</el-input>
				</div>
				<div style="margin-top: 15px;">
					<el-input placeholder="请输入新密码" v-model="inputPwd.newPassword">
					    <template slot="prepend">新密码</template>
					</el-input>
				</div>
				<div style="margin-top: 15px;">
					<el-input placeholder="请确认密码" v-model="inputPwd.comfirmPassword">
					    <template slot="prepend">确认密码</template>
					</el-input>
				</div>
				<div style="margin-top: 25px;text-align:center;">
					<el-button type="primary" @click="updatePwd">确认修改</el-button>
				</div>
		    </el-tab-pane>
		  </el-tabs>
	</div>
</template>

<script>
import api from '@/fetch/api'

let Base64 = require('js-base64').Base64;

	export default{
		name: 'myaccount',
		data() {
			let userid = Base64.decode(localStorage.getItem('user_token').split('.')[1]);
			userid = eval('('+userid+')').uid;
		    return {
		    	uid: userid,
		        activeName: 'first',
		        inputMyAccount: {
		        	email: '',
		        	username: '',
		        	department: '',
		        	tel: ''
		        },
		        inputUpt: {
		        	email: '',
		        	username: '',
		        	department: '',
		        	tel: ''
		        },
		        inputPwd: {
		        	password: '',
		        	newPassword: '',
		        	comfirmPassword: ''
		        }
		    };
	    },
	    created(){
			this.getUserInfo()
		},
	    methods: {
	      	handleClick(tab, event) {
	        	console.log(tab, event);
	      	},
	      	//获取当前用户信息
	      	getUserInfo(){
	      		let params = {
	      			id: this.uid
	      		}
	      		api.GetUserInfo(params)
	      			.then(res => {
	      				if(res.status == 1){
	      					this.inputMyAccount.email = res.data.email;
	      					this.inputMyAccount.username = res.data.username;

	      					this.inputUpt.email = res.data.email;
	      					this.inputUpt.username = res.data.username;
	      				}
	      			})
	      			.catch(error => {
	      				console.log(error);
	      			})
	      	},
	      	//修改个人信息
	      	updateMyInfo(){

	      	},
	      	//修改密码
	      	updatePwd(){

	      	}
	    }
	}
</script>

<style scoped>
	.wrap{
		background: #ffffff;
		margin-top: 20px;
		margin-left: 20px;
		height: 100%;
		overflow-y: scroll;
		box-sizing: border-box;
		padding: 30px;
	}
</style>