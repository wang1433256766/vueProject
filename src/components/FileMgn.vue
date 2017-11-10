<template>
	<div class="wrap">
		<!-- <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="">
            <el-input v-model="formInline.name" placeholder="请输入文件名"></el-input>
          </el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form> -->
	    <!--表格-->
        <el-table :data="tableData" border style="width: 100%">
			<!-- <el-table-column prop="name" label="文件名"></el-table-column> -->
            <el-table-column align="center" label="文件夹名">
				<template slot-scope="scope">
					<span>{{scope.row.floder}}</span>
				</template>
            </el-table-column>

            <el-table-column align="center" label="创建时间">
            	<template slot-scope="scope">
					<span>{{scope.row.date | time}}</span>
				</template>
            </el-table-column>

            <el-table-column align="center" label="下载">
            	<template slot-scope="scope">
              		<el-button type="primary" size="small" @click="handleDownLoad(scope.row)">下载</el-button>
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
	  		//formInline: {name:''},
	  		currentPage: 1,
	  		limit: 10,
	  		total: null,
	  		tableData: null,
	  	}
	},
	created(){
		this.getUserFileList()
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
		getUserFileList(){
			let params = {
				page: this.currentPage,
				size: this.limit
			};
			api.GetUserFileList(params)
				.then(res => {
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
	        this.getUserFileList()
	    },
	    handleCurrentChange(val) {
	        this.currentPage = val;
	        this.getUserFileList()
	    },
	    handleDownLoad(rowData){
	    	window.location.href = 'http://miaoto.com.cn:8084/userinfo/download?floder='+rowData.floder;
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
	.demo-form-inline{
		text-align: center;
	}
	.el-pagination {
	    text-align: center;
	    margin-top: 30px;
	}
</style>