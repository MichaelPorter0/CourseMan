import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
import './font/font.css'
/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/course',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '课程',
        component: () => import('@/views/course/index'),
        meta: { title: '课程', icon: 'form' }
      },
      {
        path: 'create',
        name: 'coursecreate',
        component: () => import('@/views/course/create/index'),
        meta: { title: '创建', icon: 'form' },
        hidden: true
      },
      {
        path: 'modify',
        name: 'coursemodify',
        component: () => import('@/views/course/modify/index'),
        meta: { title: '修改', icon: 'form' },
        hidden: true
      }
    ]
  },
  {
    path: '/class',
    component: Layout,
    redirect: '/class',
    name: 'Class',
    hidden: false,
    children: [{
      path: 'index',
      component: () => import('@/views/class/index'),
      meta: { title: '班级管理', icon: 'form' }
    }]
  },
  {
    path: '/student',
    component: Layout,
    redirect: '/student',
    name: 'Student',
    hidden: false,
    children: [{
      path: 'index',
      component: () => import('@/views/student/index'),
      meta: { title: '学生管理', icon: 'form' }
    }]
  },
  {
    path: '/activation',
    component: Layout,
    redirect: '/activation',
    name: 'Activation',
    hidden: false,
    meta: { title: '激活码管理', icon: 'form' },
    children: [
      {
        path: 'create',
        name: 'activationcreate',
        component: () => import('@/views/activation/create/index'),
        meta: { title: '提取激活码', icon: 'form' }
      },
      {
        path: 'list',
        name: 'activationlist',
        component: () => import('@/views/activation/list/index'),
        meta: { title: '提取历史', icon: 'form' }
      }
    ]
  }
]
// 基于权限的动态路由
export const asyncRouterMap = [
  {
    path: '/miniprogram',
    component: Layout,
    redirect: '/miniprogram',
    name: 'miniprogram',
    meta: { title: '小程序信息管理', icon: 'example', roles: ['admin'] },
    children: [
      {
        path: 'banner',
        name: 'banner',
        component: () => import('@/views/miniprogram/banner/index'),
        meta: { title: '轮播图管理', icon: 'table' }
      },
      {
        path: 'announcement',
        name: 'announcement',
        component: () => import('@/views/miniprogram/announcement/index'),
        meta: { title: '通知管理', icon: 'tree' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

