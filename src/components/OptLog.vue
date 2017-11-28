<template>
	<div class="wrap">
		<el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="时间范围">
	            <el-date-picker
				    v-model="formInline.timeRange"
				    type="daterange"
				    :picker-options="pickerOptions"
				    range-separator="至"
				    start-placeholder="开始日期"
				    end-placeholder="结束日期"
				    align="right">
				</el-date-picker>
            </el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form>
	    <!--表格-->
        <el-table :data="logData" border style="width: 100%">

            <el-table-column label="操作人员">
				<template slot-scope="scope">
					<span>{{scope.row.logFrom}}</span>
				</template>
            </el-table-column>

            <el-table-column label="操作主机">
            	<template slot-scope="scope">
					<span>{{scope.row.ip}}</span>
				</template>
            </el-table-column>

            <el-table-column label="操作时间">
            	<template slot-scope="scope">
					<span>{{scope.row.createtime | time}}</span>
				</template>
            </el-table-column>

            <el-table-column label="操作内容">
            	<template slot-scope="scope">
					<span>{{scope.row.logName | switchHan}}</span>
				</template>
            </el-table-column>

            <el-table-column label="操作详情">
            	<template slot-scope="scope">
					<span>{{scope.row.logMsg}}</span>
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
    name: 'optLog',
    data(){
	  	return {
	  		pickerOptions: {
	          shortcuts: [{
	            text: '最近一周',
	            onClick(picker) {
	              const end = new Date();
	              const start = new Date();
	              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
	              picker.$emit('pick', [start, end]);
	            }
	          }, {
	            text: '最近一个月',
	            onClick(picker) {
	              const end = new Date();
	              const start = new Date();
	              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
	              picker.$emit('pick', [start, end]);
	            }
	          }, {
	            text: '最近三个月',
	            onClick(picker) {
	              const end = new Date();
	              const start = new Date();
	              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
	              picker.$emit('pick', [start, end]);
	            }
	          }]
	        },
	  		formInline: {timeRange:''},
	  		currentPage: 1,
	  		limit: 5,
	  		total: null,
	  		logData: []
	  	}
	},
	created(){
		this.getList()
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
	    },
	    switchHan : function(value){
	    	var logContent = '';
	    	if(value == 'LOGIN'){
	    		logContent = '登录';
	    	}else if(value == 'LOGOUT'){
	    		logContent = '登出';
	    	}else if(value == 'REGISTER'){
	    		logContent = '注册';
	    	}else if(value == 'FILEDOWNLOAD'){
	    		logContent = '文件下载';
	    	}else if(value == 'FILEUPDATE'){
	    		logContent = '文件修改(删除)';
	    	}else if(value == 'ARRANGE'){
	    		logContent = '人员安排';
	    	}else if(value == 'ROLE'){
	    		logContent = '人员角色修改';
	    	}else if(value == 'WEBOPI'){
	    		logContent = '访问webopi';
	    	}else if(value == 'USERINFO'){
	    		logContent = '用户信息修改';
	    	}
	    	return logContent;
	    }
	},
	methods:{
		getList(){
			let startTime = this.formInline.timeRange ? new Date(this.formInline.timeRange[0]).getFullYear() + '-' + (new Date(this.formInline.timeRange[0]).getMonth() + 1) + '-' + new Date(this.formInline.timeRange[0]).getDate() : '';
			let endTime = this.formInline.timeRange ? new Date(this.formInline.timeRange[1]).getFullYear() + '-' + (new Date(this.formInline.timeRange[1]).getMonth() + 1) + '-' + new Date(this.formInline.timeRange[1]).getDate() : '';
			let params = {
				startTime: startTime,
				endTime: endTime,
				page: this.currentPage,
				size: this.limit,
				sidx: 'createtime',
				sord: 'desc'
        	};
			api.GetLogList(params)
				.then(res => {
					if(res.status == 1){
						this.logData = res.data.list;
						this.total = res.data.total;
					}
				})
				.catch(error => {
					console.log(error)
				})
		},
		onSubmit(){
			this.currentPage = 1;
	        this.getList();
		},
		handleSizeChange(val) {
	        this.limit = val;
      		this.getList();
	    },
	    handleCurrentChange(val) {
	        this.currentPage = val;
	        this.getList();
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
	}
	.demo-form-inline{
		text-align: center;
	}
	.el-pagination {
	    text-align: center;
	    margin-top: 30px;
	}
</style>