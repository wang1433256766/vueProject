<template>
	<div class="wrap">
		<div class="link-url"><a @click="centerDialogVisible = true">新窗口打开>></a></div>
		<iframe ref="iframe" class="iframe" :src='webopi_url' @load="loaded"></iframe>
		<el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
		  	<span>点击确定按钮将在新窗口中打开webopi</span>
		  	<span slot="footer" class="dialog-footer">
		    	<el-button @click="centerDialogVisible = false">取 消</el-button>
		    	<el-button type="primary" @click="goUrl">确 定</el-button>
		  	</span>
		</el-dialog>
	</div>
</template>

<script>
import api from '@/fetch/api'

export default {
  name: 'csstudio',
  data(){
  	return {
  		webopi_url:'',
  		centerDialogVisible: false
  	}
  },
  created(){
  	this.getUrl()
  },
  methods: {
  	loaded() {
	    
	},
	getUrl(){
		api.GetWebOpiUrl()
			.then(res => {
				if(res.status == 1){
					if(localStorage.getItem('user_token')){
						this.webopi_url = res.msg.substring(0,res.msg.length-1)+'?token='+localStorage.getItem('user_token');
					}else{
						this.webopi_url = res.msg;
					}
				}
			})
			.catch(error => {
				console.log(error);
			})
	},
	goUrl(){
		this.centerDialogVisible = false;
		window.open(this.webopi_url);
	}
  }
  
}	
</script>

<style scoped>
	.wrap{
		background: #ffffff;
		margin-top: 10px;
		margin-left: 20px;
		height: 100%;
		overflow-y: scroll;
		overflow-x: hidden;
		box-sizing: border-box;
	}
	.link-url{
		width: 100%;
		height: 5%;
		background: #f4f8fb;
	}
	.link-url a{
		cursor: pointer;
		color: #00589c;
	}
	.iframe{
		width: 100%;
		height: 93%;
	}
</style>