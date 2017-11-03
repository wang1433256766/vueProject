import axios from 'axios'
import qs from 'qs'

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = 'http://miaoto.com.cn:8084/';
//axios.defaults.baseURL = 'http://192.168.1.105:8084/';
axios.defaults.headers.common['Authorization'] = localStorage.getItem('user_token')?localStorage.getItem('user_token') : 'AUTH_TOKEN';

//POST传参序列化
axios.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem('user_token')?localStorage.getItem('user_token') : 'AUTH_TOKEN';
    if(config.method  === 'post'){
        config.data = qs.stringify(config.data);
    }
    return config;
},(error) =>{
    return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use((res) =>{
    if(res.data.status != 1 && res.data.status != 0){
        return Promise.reject(res);
    }
    return res;
}, (error) => {
    return Promise.reject(error);
});

export function fetch_post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
               reject(error)
            })
    })
}

export function fetch_get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {params})
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
               reject(error)
            })
    })
}

export default {
    /**
     * 用户登录
     */
    Login(params) {
        return fetch_post('/auth/login', params)
    },
    
    /**
     * 用户注册
     */
    Register(params) {
        return fetch_post('/auth/register', params)
    },

    /**
     * 发送注册验证码
     */
    RegistVerifiCode(tellphone) {
        return fetch_post('/users/api/registVerifiCode', {tellphone: tellphone})
    },

    /**
     * 登出
     */
    Logout(){
        return fetch_post('/auth/logout')
    },

    /**
     * 获取操作日志
     */
    GetLogList(params){
        return fetch_post('/sysLog/list', params)
    },

    /**
     * [GetUserList 获取用户列表]
     * @param {[type]} params [description]
     */
    GetUserList(params){
        return fetch_get('/userinfo/list', params)
    },

    /**
     * [UpdateUserStates 用户授权]
     * @param {[type]} params [description]
     */
    UpdateUserStatus(params){
        return fetch_post('/userinfo/update', params)
    },

    /**
     * [UpdateUserStatusSel 用户批量授权]
     * @param {[type]} params [description]
     */
    UpdateUserStatusSel(params){
        return fetch_post('/userinfo/updateList', params)
    },

    /**
     * [GetRoleList 获取所有角色]
     */
    GetRoleList(){
        return fetch_get('/role/list')
    },

    /**
     * [SetRoles 设置角色]
     * @param {[type]} params [description]
     */
    SetRoles(params){
        return fetch_post('/userRole/set', params)
    },

    /**
     * [GetArrangeList 获取安排列表]
     * @param {[type]} params [description]
     */
    GetArrangeList(params){
        return fetch_get('/arrange/query', params)
    },

    /**
     * [SetArrange 单个安排人员]
     * @param {[type]} params [description]
     */
    SetArrange(params){
        return fetch_post('/arrange/set', params)
    },

    /**
     * [SetArrangeAll 批量安排人员]
     * @param {[type]} params [description]
     */
    SetArrangeAll(params){
        return fetch_post('/arrange/list_set', params)
    }
     
}
