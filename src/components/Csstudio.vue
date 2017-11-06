<template>
	<div class="wrap">
		<!-- <v-html-panel :url.asyc="url1"></v-html-panel> -->
		<iframe ref="iframe" class="iframe" src="http://miaoto.com.cn:8082/w" @load="loaded"></iframe>
	</div>
</template>

<script>
export default {
  name: 'csstudio',
  methods: {
  	loaded() {
	    
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