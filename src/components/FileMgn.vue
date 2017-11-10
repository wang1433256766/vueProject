<template>
	<div class="wrap">
		<el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="">
            <el-input v-model="formInline.name" placeholder="请输入文件名"></el-input>
          </el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form>
	    <!--表格-->
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="name"
            label="文件名">
          </el-table-column>
          <el-table-column
            prop="size"
            label="文件大小">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间">
          </el-table-column>
          <el-table-column label="下载">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">下载</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="100"
            layout="prev, pager, next, jumper"
            :total="1000">
          </el-pagination>
        </div>
	</div>
</template>

<script>
export default {
  	name: 'fileMgn',
	data(){
	  	return {
	  		formInline: {name:''},
	  		currentPage: 4,
	  		tableData: [{name:'文件名',size:'文件大小',createTime:'创建时间'},
	  					{name:'文件名',size:'文件大小',createTime:'创建时间'},
	  					{name:'文件名',size:'文件大小',createTime:'创建时间'},
	  					{name:'文件名',size:'文件大小',createTime:'创建时间'},
	  					{name:'文件名',size:'文件大小',createTime:'创建时间'},
	  					{name:'文件名',size:'文件大小',createTime:'创建时间'},
	  					{name:'文件名',size:'文件大小',createTime:'创建时间'},
	  					{name:'文件名',size:'文件大小',createTime:'创建时间'},
	  					{name:'文件名',size:'文件大小',createTime:'创建时间'}]
	  	}
	},
	methods:{
		onSubmit(){

		},
		handleSizeChange(val) {
	        console.log(`每页 ${val} 条`);
	    },
	    handleCurrentChange(val) {
	        this.currentPage = val;
	        console.log(`当前页: ${val}`);
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