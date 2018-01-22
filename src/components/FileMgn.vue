<template>
	<div class="wrap">
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item v-for="path in paths">
		  		<a @click="backFolder(path)">{{path}}</a>
		  	</el-breadcrumb-item>
		  <!-- <el-breadcrumb-item>路径1</el-breadcrumb-item> -->
		</el-breadcrumb>
	    <!--表格-->
        <el-table :data="tableData" border style="width: 100%">
			<!-- <el-table-column prop="name" label="文件名"></el-table-column> -->
            <el-table-column align="center" label="文件夹/文件">
				<template slot-scope="scope">
					<span v-if="scope.row.folder"><a href="#" @click="inFolder(scope.row.floder)">{{scope.row.floder}}</a></span>
					<span v-else>{{scope.row.floder}}</span>
				</template>
            </el-table-column>

            <el-table-column align="center" label="创建时间">
            	<template slot-scope="scope">
					<span>{{scope.row.date | time}}</span>
				</template>
            </el-table-column>

            <el-table-column align="center" label="下载">
            	<template slot-scope="scope">
              		<el-button v-if="!scope.row.folder" type="primary" size="small" @click="handleDownLoad(scope.row)">下载</el-button>
              		<el-button type="success" size="small" @click="handleUgliy(scope.row)">压缩</el-button>
            	</template>
          	</el-table-column>

        </el-table>

        <div class="block">
        	<el-pagination
	            @size-change="handleSizeChange"
	            @current-change="handleCurrentChange"
	            :current-page="currentPage"
	            :page-sizes="[5,10,20,30]" 
	            :page-size="limit"
	            layout="total, sizes, prev, pager, next, jumper"
	            :total="total">
	        </el-pagination>
        </div>
	</div>
</template>

<script>
import api from '@/fetch/api'

export default {
  	name: 'fileMgn',
	data(){
	  	return {
	  		paths: ['文件根目录'],
	  		//formInline: {name:''},
	  		currentPage: 1,
	  		limit: 10,
	  		total: null,
	  		tableData: null,
	  	}
	},
	created(){
		this.getUserFileList('/')
	},
	filters:{
		time : function (value) {
			var now = new Date(value);
			var year=now.getFullYear(); 
		    var month=now.getMonth()+1; 
		    var date=now.getDate(); 
		    var hour=now.getHours(); 
		    var minute=now.getMinutes(); 
		    var second=now.getSeconds(); 
		    return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
	    }
	},
	methods:{
		getUserFileList(dir){
			let params = {
				page: this.currentPage,
				size: this.limit,
				dir: dir
			};
			api.GetUserFileList(params)
				.then(res => {
					console.log(res);
					if(res.status == 1){
						this.tableData = res.data.fileList;
						this.total = res.data.total;
					}
				})
				.catch(error => {
					console.log(error);
				})
		},
		handleSizeChange(val) {
	        this.limit = val;
	        var dir = '';
	    	for(var i=1;i<this.paths.length;i++){
	    		dir += '/'+this.paths[i];
	    	}
	    	if(dir==''){
	    		dir = '/';
	    	}
	        this.getUserFileList(dir)
	    },
	    handleCurrentChange(val) {
	        this.currentPage = val;
	        var dir = '';
	    	for(var i=1;i<this.paths.length;i++){
	    		dir += '/'+this.paths[i];
	    	}
	    	if(dir==''){
	    		dir = '/';
	    	}
	        this.getUserFileList(dir)
	    },
	    handleDownLoad(rowData){
	    	var dir = '';
	    	for(var i=1;i<this.paths.length;i++){
	    		dir += '/'+this.paths[i];
	    	}
	    	if(dir==''){
	    		dir = '/'+rowData.floder;
	    	}else{
	    		dir +=   '/'+rowData.floder;
	    	}
	    	// window.location.href = 'http://10.30.61.208:8084/test/download?floder='+dir+'&'+'token='+localStorage.getItem('user_token');
	    	window.location.href = 'http://miaoto.com.cn:8084/test/download?floder='+dir+'&'+'token='+localStorage.getItem('user_token');
	    },
	    //压缩
	    handleUgliy(rowData){
	    	var dir = '',listDir='';
	    	for(var i=1;i<this.paths.length;i++){
	    		dir += '/'+this.paths[i];
	    		listDir += '/'+this.paths[i];
	    	}
	    	if(dir==''){
	    		dir = '/'+rowData.floder;
	    	}else{
	    		dir +=   '/'+rowData.floder;
	    	}
	    	if(listDir == ''){
	    		listDir = '/';
	    	}
	    	let params = {
				floder: dir
			};
			api.HandleUgliy(params)
				.then(res => {
					if(res.status == 1){
	    				this.$notify({
				          	title: '',
				          	message: '压缩成功',
				          	type: 'success'
				        });
				        this.currentPage = 1;
				        this.getUserFileList(listDir)
	    			}else{
	    				this.$notify.error({
					        title: '失败',
					        message: '压缩失败'
				        });
	    			}
				})
				.catch(error => {
					console.log(error);
				})
	    },
	    inFolder(folderName){
	    	this.paths.push(folderName);
	    	var dir = '';
	    	for(var i=1;i<this.paths.length;i++){
	    		dir += '/'+this.paths[i];
	    	}
	    	this.currentPage = 1;
	    	this.getUserFileList(dir);
	    },
	    backFolder(folderName){
	    	for(var i=0;i<this.paths.length;i++){
	    		if(this.paths[i] == folderName){
	    			this.paths.splice(i+1);
	    		}
	    	}
	    	var dir = '';
	    	for(var i=1;i<this.paths.length;i++){
	    		dir += '/'+this.paths[i];
	    	}
	    	if(dir==''){
	    		dir = '/';
	    	}
	    	this.getUserFileList(dir);
	    }
	}
}	
</script>

<style scoped>
	.wrap{
		background: #ffffff;
		/*margin-top: 20px;*/
		margin-left: 20px;
		height: 100%;
		overflow-y: scroll;
		box-sizing: border-box;
		padding: 30px;
		padding-top: 0px;
	}
	.el-breadcrumb {
	    line-height: 4em;
	}
	.demo-form-inline{
		text-align: center;
	}
	.el-pagination {
	    text-align: center;
	    margin-top: 30px;
	}
</style>