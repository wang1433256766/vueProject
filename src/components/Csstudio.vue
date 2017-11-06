<template>
	<div class="wrap">
		<!-- <v-html-panel :url.asyc="url1"></v-html-panel> -->
		<iframe ref="iframe" class="iframe" :src='webopi_url' @load="loaded"></iframe>
	</div>
</template>

<script>
import api from '@/fetch/api'

export default {
  name: 'csstudio',
  data(){
  	return {
  		webopi_url:''
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
					this.webopi_url = res.msg;
				}
			})
			.catch(error => {
				console.log(error);
			})
	}
  }
  
}	
</script>

<style scoped>
	.wrap{
		background: #ffffff;
		margin-top: 30px;
		margin-left: 20px;
		height: 100%;
		overflow-y: scroll;
		box-sizing: border-box;
	}
	.iframe{
		width: 100%;
		height: 97%;
	}
</style>