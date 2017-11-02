<template>
	<div class="wrap">
		<el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="">
	            <el-input v-model="formInline.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form>
	    <!--表格-->
        <el-table :data="userList" border style="width: 100%">

            <el-table-column label="用户名">
				<template scope="scope">
					<span>{{scope.row.username}}</span>
				</template>
            </el-table-column>

            <el-table-column label="邮箱">
            	<template scope="scope">
					<span>{{scope.row.email}}</span>
				</template>
            </el-table-column>

            <el-table-column label="用户角色">
            	<template scope="scope">
					<span>{{scope.row.roleArr}}</span>
				</template>
            </el-table-column>

            <el-table-column label="授权管理员">
            	<template scope="scope">
	              	<el-button type="primary" size="small" @click="handleRole(scope.$index, scope.row)">授权</el-button>
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
  name: 'userMgn',
  data(){
	  	return {
	  		formInline: {username:''},
	  		currentPage: 1,
	  		limit: 10,
	  		total: null,
	  		userList: null
	  	}
	},
	created(){
		this.getUserList()
	},
	methods:{
		getUserList(){
			let params = {
				page: this.currentPage,
				size: this.limit,
				sidx: 'id',
				sord: 'desc'
        	};
			api.GetUserList(params)
				.then(res => {
					if(res.status == 1){
						this.userList = res.data.list;
						this.total = res.data.total;
					}
				})
				.catch(error => {
					console.log(error)
				})
		},
		onSubmit(){
			this.currentPage = 1;
	        this.getUserList();
		},
		handleSizeChange(val) {
	        this.limit = val;
      		this.getUserList();
	    },
	    handleCurrentChange(val) {
	        this.currentPage = val;
	        this.getUserList();
	    },
	    handleRole(index,value){
	    	console.log(index+'---'+value);
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