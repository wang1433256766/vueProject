<template>
	<div class="wrap">
		<el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="时间范围">
	            <el-date-picker
				    v-model="formInline.date"
				    type="date"
				    :picker-options="pickerOptions"
				    placeholder="选择日期"
				    align="right">
				</el-date-picker>
            </el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button v-show="false" type="success" @click="saveAll()">批量保存</el-button>
        </el-form>
        <el-form :inline="true" :model="arrangeParams" class="demo-form-inline">
        	<el-form-item label="用户">
	            <el-select v-model="arrangeParams.uid" placeholder="请选择">
				    <el-option
				      v-for="item in options"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
            </el-form-item>
            <el-form-item label="时间段">
	            <template>
				  <el-time-select
				    placeholder="起始时间"
				    v-model="startTime"
				    :picker-options="{
				      start: '00:00',
				      step: '01:00',
				      end: '23:00'
				    }">
				  </el-time-select>
				  <el-time-select
				    placeholder="结束时间"
				    v-model="endTime"
				    :picker-options="{
				      start: '01:00',
				      step: '01:00',
				      end: '24:00',
				      minTime: startTime
				    }">
				  </el-time-select>
				</template>
            </el-form-item>
            <el-button type="success" @click="arrangeOpt()">安排</el-button>
        </el-form>
	    <!--表格-->
        <el-table :data="arrangeList" border style="width: 100%">

            <el-table-column align="center" label="时间段">
				<template slot-scope="scope">
					<span>{{scope.row.hour | hourFomart}}</span>
				</template>
            </el-table-column>

            <el-table-column align="center" label="操作人ID">
            	<template slot-scope="scope">
            		<el-select v-show="scope.row.edit" v-model="scope.row.uid" clearable  filterable placeholder="请选择">
					    <el-option
					      v-for="item in options"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>
					<span v-show="!scope.row.edit">{{scope.row.uid}}</span>
				</template>
            </el-table-column>

            <el-table-column align="center" label="操作人">
            	<template slot-scope="scope">
					<span>{{scope.row.uname}}</span>
				</template>
            </el-table-column>

            <el-table-column align="center" label="编辑">
		        <template slot-scope="scope">
		          	<el-button :type="scope.row.edit?'success':'primary'" @click='scope.row.edit=!scope.row.edit' size="small">{{scope.row.edit?'完成':'编辑'}}</el-button>
		          	<el-button type="success" size="small" @click="save(scope.row)">保存
          			</el-button>
		        </template>
		    </el-table-column>

        </el-table>
	</div>
</template>

<script>
import api from '@/fetch/api'

export default {
    name: 'userTo',
    data(){
	  	return {
	  		options: [],
	  		formInline: {date:new Date()},
	  		arrangeParams: {uid:''},
	  		startTime: '',
        	endTime: '',
	  		pickerOptions: {
	          shortcuts: [{
	            text: '今天',
	            onClick(picker) {
	              picker.$emit('pick', new Date());
	            }
	          }, {
	            text: '昨天',
	            onClick(picker) {
	              const date = new Date();
	              date.setTime(date.getTime() - 3600 * 1000 * 24);
	              picker.$emit('pick', date);
	            }
	          }, {
	            text: '一周前',
	            onClick(picker) {
	              const date = new Date();
	              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
	              picker.$emit('pick', date);
	            }
	          }]
	        },
	  		arrangeList: null
	  	}
	},
	created() {
		this.getList(),
		this.getUserList()
	},
	filters:{
		hourFomart : function (value) {
			var timeRange = null;
			if(value == 1){ timeRange = '01:00 - 02:00' }
			else if(value == 2){ timeRange = '02:00 - 03:00' }
			else if(value == 3){ timeRange = '03:00 - 04:00' }
			else if(value == 4){ timeRange = '04:00 - 05:00' }
			else if(value == 5){ timeRange = '05:00 - 06:00' }
			else if(value == 6){ timeRange = '06:00 - 07:00' }
			else if(value == 7){ timeRange = '07:00 - 08:00' }
			else if(value == 8){ timeRange = '08:00 - 09:00' }
			else if(value == 9){ timeRange = '09:00 - 10:00' }
			else if(value == 10){ timeRange = '10:00 - 11:00' }
			else if(value == 11){ timeRange = '11:00 - 12:00' }
			else if(value == 12){ timeRange = '12:00 - 13:00' }
			else if(value == 13){ timeRange = '13:00 - 14:00' }
			else if(value == 14){ timeRange = '14:00 - 15:00' }
			else if(value == 15){ timeRange = '15:00 - 16:00' }
			else if(value == 16){ timeRange = '16:00 - 17:00' }
			else if(value == 17){ timeRange = '17:00 - 18:00' }
			else if(value == 18){ timeRange = '18:00 - 19:00' }
			else if(value == 19){ timeRange = '19:00 - 20:00' }
			else if(value == 20){ timeRange = '20:00 - 21:00' }
			else if(value == 21){ timeRange = '21:00 - 22:00' }
			else if(value == 22){ timeRange = '22:00 - 23:00' }
			else if(value == 23){ timeRange = '23:00 - 24:00' }
			else if(value == 24){ timeRange = '00:00 - 01:00' }
			else{ timeRange = '' }
			return timeRange;
	    }
	},
	methods:{
		getList() {
			let params = {
				date: this.formInline.date,
				sidx: 'hour',
				sord: 'asc'
			};
			api.GetArrangeList(params)
				.then(res => {
					if(res.status == 1){
						const items = res.data.list;
						this.arrangeList = items.map(v => {
				  			this.$set(v, 'edit', false)
				  			return v
				  		})
					}
				})
				.catch(error => {
					console.log(error);
				})
		},
		getUserList(){
			let params = {
				page: 1,
				size: 9999,
				sidx: 'id',
				sord: 'desc'
        	};
			api.GetUserList(params)
				.then(res => {
					if(res.status == 1){
						if(res.data.list && res.data.list.length>0){
							for(var i=0;i<res.data.list.length;i++){
								var optionObj = {};
								optionObj.value = res.data.list[i].id;
								optionObj.label = res.data.list[i].username;
								this.options.push(optionObj);
							}
						}
					}
				})
				.catch(error => {
					console.log(error)
				})
		},
		//按日期查询
		onSubmit(){
			//console.log(this.formInline.date);
			this.getList()
		},
		//保存
	    save(row_data){
	    	let params = {
	    		date: this.formInline.date,
	    		hours: row_data.hour,
	    		uid: row_data.uid
	    	};
	    	api.SetArrange(params)
	    		.then(res => {
	    			if(res.status == 1){
	    				this.getList()
	    			}
	    		})
	    		.catch(error => {
	    			console.log(error);
	    		})
	    },
	    //批量保存
	    saveAll(){
	    	const dataArr = [];
	    	for(var i=0;i<this.arrangeList.length;i++){
	    		const dataObj = {};
	    		dataObj.hour = this.arrangeList[i].hour;
	    		dataObj.uid = this.arrangeList[i].uid;
	    		dataArr.push(JSON.stringify(dataObj));
	    	}
	    	let params = {
	    		date: this.formInline.date,
	    		data: dataArr.toString()
	    	}
	    	api.SetArrangeAll(params)
	    		.then(res => {
	    			if(res.status == 1){
	    				this.getList()
	    			}
	    		})
	    		.catch(error => {
	    			console.log(error);
	    		})

	    },
	    //安排
	    arrangeOpt(){
	    	//console.log(this.endTime.split(':')[0]-this.startTime.split(':')[0]);
	    	if(!this.arrangeParams.uid){
	    		this.$message({
			        showClose: true,
			            message: '请选择要安排的用户！',
			            type: 'warning'
		        });
		        return false;
	    	}
	    	if(!this.startTime || ! this.endTime){
	    		this.$message({
			        showClose: true,
			            message: '请选择要安排的时间段！',
			            type: 'warning'
		        });
		        return false;
	    	}
	    	if(this.endTime <= this.startTime){
	    		this.$message({
			        showClose: true,
			            message: '请确保结束时间大于起始时间！',
			            type: 'warning'
		        });
		        return false;
	    	}
	    	var hourStr = '';
	    	for(var i=parseInt(this.startTime.split(':')[0]); i<parseInt(this.endTime.split(':')[0]); i++){
	    		console.log(i);
	    		if(i == 0){
	    			hourStr += '24,';
	    		}else{
	    			hourStr += i+',';
	    		}
	    	}
	    	hourStr = hourStr.substring(0,hourStr.length-1);
	    	let params = {
	    		date: this.formInline.date,
	    		hours: hourStr,
	    		uid: this.arrangeParams.uid
	    	};
	    	api.SetArrange(params)
	    		.then(res => {
	    			if(res.status == 1){
	    				this.getList()
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