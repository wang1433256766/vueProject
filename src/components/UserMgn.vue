<template>
	<div class="wrap">
		<el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="">
	            <el-input v-model="formInline.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="success" @click="handleRoleSelect">批量授权</el-button>
        </el-form>
	    <!--表格-->
        <el-table :data="userList" border style="width: 100%" @selection-change="handleSelectionChange">

			<el-table-column  type="selection" width="50">
    		</el-table-column>

            <el-table-column label="用户名" width="90">
				<template slot-scope="scope">
					<span>{{scope.row.username}}</span>
				</template>
            </el-table-column>

            <el-table-column label="邮箱">
            	<template slot-scope="scope">
					<span>{{scope.row.email}}</span>
				</template>
            </el-table-column>

            <el-table-column label="用户角色">
            	<template slot-scope="scope">
					<span>{{scope.row.roleArr}}</span>
				</template>
            </el-table-column>

            <el-table-column label="用户状态" width="95">
            	<template slot-scope="scope">
					<el-tag :type="scope.row.status==0?'success':'danger'">{{scope.row.status==0?'已授权':'未授权'}}</el-tag>
				</template>
            </el-table-column>

            <el-table-column label="授权管理员" width="240">
            	<template slot-scope="scope">
	              	<el-button :type="scope.row.status==0?'danger':'success'" size="small" @click="handleRole(scope.row)">{{scope.row.status==0?'禁用':'授权'}}</el-button>
	              	<el-button type="primary" size="small" @click="viewDetail(scope.row)">详情</el-button>
	              	<el-button type="primary" size="small" @click="setRole(scope.row)">设置角色</el-button>
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
        <el-dialog title="用户详情" :visible.sync="dialogFormVisible">
		  	<el-form :model="form">
			    <el-form-item label="用户名" :label-width="formLabelWidth">
			      	<el-input v-model="form.uname" :disabled="true" class="dialog_input"></el-input>
			    </el-form-item>
			    <el-form-item label="用户邮箱" :label-width="formLabelWidth">
			      	<el-input v-model="form.email" :disabled="true" class="dialog_input"></el-input>
			    </el-form-item>
			    <el-form-item label="用户角色" :label-width="formLabelWidth">
			      	<el-input v-model="form.role" :disabled="true" class="dialog_input"></el-input>
			    </el-form-item>
			    <el-form-item label="用户状态" :label-width="formLabelWidth">
			      	<el-select v-model="form.status" disabled placeholder="请选择活动区域">
				        <el-option label="已授权" value="0"></el-option>
				        <el-option label="未授权" value="2"></el-option>
			      	</el-select>
			    </el-form-item>
		  	</el-form>
		  	<div slot="footer" class="dialog-footer">
		    	<el-button @click="dialogFormVisible = false">取 消</el-button>
		    	<!-- <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button> -->
		  	</div>
		</el-dialog>
		<!-- 设置角色 -->
		<el-dialog title="设置角色" :visible.sync="dialogRoleVisible">
			<el-checkbox v-show="false" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
		    <div style="margin: 15px 0;"></div>
			<el-checkbox-group v-model="checkedRoles" @change="handleCheckedRolesChange" :min="0" :max="1">
			    <el-checkbox v-for="role in roles" :label="role" :key="role.rId">{{role.rMark}}</el-checkbox>
			</el-checkbox-group>
			<div slot="footer" class="dialog-footer">
		    	<el-button @click="dialogRoleVisible = false">取 消</el-button>
		    	<el-button type="primary" @click="save">保 存</el-button>
		  	</div>
		</el-dialog>
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
	  		userList: null,
	  		multipleSelection:[], //table 选中行的数据存于此
	  		dialogFormVisible: false, //用户详情dialog
	  		dialogRoleVisible: false, //角色dialog
	  		formLabelWidth: '100px', //用户详情dialog 距离左边的宽度
	  		form: {
	  			uname: '',
	  			email: '',
	  			role: '',
	  			status: ''
	  		},
	  		isIndeterminate: false,
	  		checkAll: false,
	  		checkedRoles: null,
	  		roles: [],
	  		roleParams: null
	  	}
	},
	created(){
		this.getUserList()
	},
	methods:{
		getUserList(){
			let params = {
				username: this.formInline.username,
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
	    handleRole(value){
	    	let params = {
	    		id : value.id,
	    		status : value.status==0?2:0
	    	};
	    	const tipVal = value.status==0?'禁用':'授权';
	    	api.UpdateUserStatus(params)
	    		.then(res => {
	    			if(res.status == 1){
	    				this.$notify({
				          	title: '',
				          	message: '用户'+tipVal+'成功',
				          	type: 'success'
				        });
				        this.getUserList()
	    			}else{
	    				this.$notify.error({
					        title: '失败',
					        message: '用户'+tipVal+'失败'
				        });
	    			}
	    		})
	    		.catch(error => {
	    			console.log(error);
	    		})
	    },
	    handleRoleSelect(){
	    	if(this.multipleSelection.length == 0){
	    		this.$message({
		          	message: '请选择要授权的用户',
		          	type: 'warning'
		        });
	    		return false;
	    	};
	    	let ids = '';
	    	for(var i=0;i<this.multipleSelection.length;i++){
	    		ids += this.multipleSelection[i].id + ',';
	    	}
	    	ids = ids.substring(0,ids.length-1);
	    	let params = {
	    		ids: ids,
	    		status: 0
	    	}
	    	api.UpdateUserStatusSel(params)
	    		.then(res => {
	    			if(res.status == 1){
	    				this.$notify({
				          	title: '',
				          	message: '所选用户授权成功',
				          	type: 'success'
				        });
				        this.getUserList()
	    			}
	    		})
	    		.catch(error => {
	    			console.log(error);
	    		})
	    },
	    //将table中选中的(checked)数据存入到mutipleSelection中
	    handleSelectionChange(val) {
	        this.multipleSelection = val;
	    },
	    viewDetail(value){
	    	this.dialogFormVisible = true;
	    	this.form.uname = value.username;
	    	this.form.email = value.email;
	    	this.form.role = value.roleArr;
	    	this.form.status = value.status.toString();
	    },
	    //设置角色
	    setRole(val){
	    	this.roleParams = val.id;
	    	this.dialogRoleVisible = true;
	    	this.isIndeterminate = false;
	  		this.checkAll = false;
	  		this.checkedRoles = [];
	    	api.GetRoleList()
	    		.then(res => {
	    			if(res.status == 1){
	    				this.roles = res.data.list;
	    			}
	    			if(val.roleArr){
	    				for(var i=0;i<val.roleArr.split(',').length;i++){
	    					for(var j=0;j<this.roles.length;j++){
	    						if(val.roleArr.split(',')[i] == this.roles[j].rMark){
	    							this.checkedRoles.push(this.roles[j]);
	    						}
	    					}
	    				}
	    				this.isIndeterminate = val.roleArr.split(',').length != this.roles.length;
	    			}
	    		})
	    		.catch(error => {
	    			console.log(error);
	    		})
	    },
	    handleCheckAllChange(val) {
	        this.checkedRoles = val.target.checked ? this.roles : [];
	        this.isIndeterminate = false;
	    },
	    handleCheckedRolesChange(value) {
	        let checkedCount = value.length;
	        this.checkAll = checkedCount === this.roles.length;
	        this.isIndeterminate = checkedCount > 0 && checkedCount < this.roles.length;
	    },
	    //保存设置的角色
	    save(){
	    	// console.log(this.roleParams);
	    	// console.log(this.checkedRoles);
	    	// return false;

	    	let roleID = '';
	    	for(var i=0;i<this.checkedRoles.length;i++){
	    		roleID += this.checkedRoles[i].rId + ',';
	    	};
	    	roleID = roleID.substring(0,roleID.length-1);
	    	let params = {
	    		uids: this.roleParams,
	    		roleID: roleID
	    	};
	    	api.SetRoles(params)
	    		.then(res => {
	    			if(res.status == 1){
	    				this.dialogRoleVisible = false;
	    				this.$notify({
				          	title: '',
				          	message: '角色设置成功',
				          	type: 'success'
				        });
				        this.getUserList();
	    			}else{
	    				this.$notify.error({
					        title: '失败',
					        message: '角色设置失败'
				        });
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
	.dialog_input{
		width: 85%;
	}
</style>