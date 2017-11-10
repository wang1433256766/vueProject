import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import FileMgn from '@/components/FileMgn'
import UserTo from '@/components/UserTo'
import UserMgn from '@/components/UserMgn'
import OptLog from '@/components/OptLog'
import Csstudio from '@/components/Csstudio'
import MyAccount from '@/components/MyAccount'

Vue.use(Router)

/* layout */
import Layout from '@/components/layout/Layout'

export const routerMap = [
	{
        path: '/login',
        component: Login
    }, {
        path: '/register',
        component: Register
    }, {
    	path: '/',
    	component: Login,
    	redirect: '/login'
    }, {
    	path: '/fileMgn',
    	component: Layout,
    	redirect: '/fileMgn/index',
    	icon: 'file',
    	noDropdown: true,
    	children: [{path: 'index',component: FileMgn,name: '文件管理'}]
    }, {
    	path: '/userTo',
    	component: Layout,
    	redirect: '/userTo/index',
    	icon: 'person',
    	noDropdown: true,
    	children: [{path: 'index',component: UserTo,name: '实验人员安排'}]
    }, {
    	path: '/userMgn',
    	component: Layout,
    	redirect: '/userMgn/index',
    	icon: 'people',
    	noDropdown: true,
    	children: [{path: 'index',component: UserMgn,name: '角色管理'}]
    }, {
    	path: '/optLog',
    	component: Layout,
    	redirect: '/optLog/index',
    	icon: 'log',
    	noDropdown: true,
    	children: [{path: 'index',component: OptLog,name: '操作日志'}]
    }, {
        path: '/csstudio',
        component: Layout,
        redirect: '/csstudio/index',
        icon: 'csstudio',
        noDropdown: true,
        children: [{path: 'index',component: Csstudio,name: 'webopi'}]
    }, {
        path: '/myaccount',
        component: Layout,
        redirect: '/myaccount/index',
        icon: 'myaccount',
        noDropdown: true,
        children: [{path: 'index',component: MyAccount,name: '个人中心'}]
    }
]

export default new Router({
    routes: routerMap
})