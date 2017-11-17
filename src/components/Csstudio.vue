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
  		webopi_url_w:'',
  		centerDialogVisible: false,
  		screenWidth: document.body.clientWidth,
  		screenHeight: document.body.clientHeight
  	}
  },
  created(){
  	this.getUrl()
  },
  mounted(){
  	const that = this
    window.onresize = () => {
        return (() => {
            window.screenWidth = document.body.clientWidth;
            window.screenHeight = document.body.clientHeight;
            that.screenWidth = window.screenWidth;
            that.screenHeight = window.screenHeight;
        })()
    }
  },
  watch: {
  	screenWidth(val){
  		if (!this.timer) {
            this.screenWidth = val
            this.timer = true
            let that = this
            setTimeout(function () {
                that.getUrl()
                that.timer = false
            }, 400)
        }
  	},
  	screenHeight(val){
  		if (!this.timer) {
            this.screenHeight = val
            this.timer = true
            let that = this
            setTimeout(function () {
                that.getUrl()
                that.timer = false
            }, 400)
        }
  	}
  },
  methods: {
  	loaded() {
	    
	},
	getUrl(){
		api.GetWebOpiUrl()
			.then(res => {
				if(res.status == 1){
					if(localStorage.getItem('user_token')){
						if(this.screenWidth>1700 && this.screenHeight>900){
							this.webopi_url = res.msg.substring(0,res.msg.length-1)+'/w?token='+localStorage.getItem('user_token');
						}else{
							this.webopi_url = res.msg.substring(0,res.msg.length-1)+'/m?token='+localStorage.getItem('user_token');
						}
						this.webopi_url_w = res.msg.substring(0,res.msg.length-1)+'/w?token='+localStorage.getItem('user_token');
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
		window.open(this.webopi_url_w);
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