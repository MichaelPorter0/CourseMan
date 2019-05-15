import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

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
  { path: '/register', name: 'register', component: () => import('@/views/register/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: false,
    meta: { title: '主页', icon: 'dashboard' },
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '主页', icon: 'dashboard ' }
    }]
  },
  {
    path: '/course',
    component: Layout,
    meta: { title: '课程列表', icon: '课程管理' },
    children: [
      {
        path: 'index',
        name: '课程',
        component: () => import('@/views/course/list/index'),
        meta: { title: '课程列表', icon: '列表' }
      },
      {
        path: 'create',
        name: 'coursecreate',
        component: () => import('@/views/course/create/index'),
        meta: { title: '创建课程', icon: 'form' }
      },
      {
        path: 'modify',
        name: 'coursemodify',
        component: () => import('@/views/course/modify/index'),
        meta: { title: '修改', icon: 'form' },
        hidden: true
      },
      {
        path: 'chapter',
        name: 'coursechapter',
        component: () => import('@/views/course/chapter/index'),
        hidden: true
      }
    ]
  },
  {
    path: '/video',
    component: Layout,
    redirect: '/video',
    name: 'Video',
    hidden: false,
    meta: { title: '视频管理', icon: '视频', affix: true },
    children: [
      {
        path: 'list',
        component: () => import('@/views/video/list'),
        meta: { title: '视频列表', icon: '列表' }
      },
      {
        path: 'upload',
        name: 'videoupload',
        component: () => import('@/views/video/upload'),
        meta: { title: '视频上传', icon: 'upload' }
      },
      {
        path: 'detail',
        name: 'videodetail',
        hidden: true,
        component: () => import('@/views/video/detail')
      }
    ]
  },
  {
    path: '/homework',
    component: Layout,
    redirect: '/homework',
    name: 'Homework',
    hidden: false,
    meta: { title: '作业管理', icon: '作业' },
    children: [
      {
        path: 'create',
        component: () => import('@/views/homework/create'),
        meta: { title: '作业发布', icon: '发布' }
      },
      {
        path: 'list',
        component: () => import('@/views/homework/list'),
        meta: { title: '作业检查', icon: '检查指标' }
      }
    ]
  },
  {
    path: '/activation',
    component: Layout,
    redirect: '/activation',
    name: 'Activation',
    hidden: false,
    meta: { title: '激活码管理', icon: '激活码' },
    children: [
      {
        path: 'create',
        name: 'activationcreate',
        component: () => import('@/views/activation/create/index'),
        meta: { title: '提取激活码', icon: '生成目录' }
      },
      {
        path: 'list',
        name: 'activationlist',
        component: () => import('@/views/activation/list/index'),
        meta: { title: '提取历史', icon: '历史' }
      },
      {
        path: 'extract:course',
        name: 'activationextract',
        hidden: true,
        component: () => import('@/views/activation/extract/index'),
        meta: { title: '提取激活码' }
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
    meta: { title: '小程序信息管理', icon: '小程序', roles: ['admin'] },
    children: [
      {
        path: 'banner',
        name: 'banner',
        component: () => import('@/views/miniprogram/banner/index'),
        meta: { title: '轮播图管理', icon: '首页轮播图' }
      },
      {
        path: 'announcement',
        name: 'announcement',
        component: () => import('@/views/miniprogram/announcement/index'),
        meta: { title: '通知管理', icon: '通知' }
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

