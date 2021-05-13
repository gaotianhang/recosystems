import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import { message } from 'utils/data'


Vue.use(VueRouter);


//避免点击同一路由报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
//路由懒加载
const Login = () => import('views/Login.vue')
const Register = () => import('views/Register.vue')
const Index = () => import('views/Index.vue')
const Collection = () => import('views/Collection.vue')
const Details = () => import('views/Details.vue')
const About = () => import('views/About.vue')
const Admin = () => import('views/Admin.vue')
const Tinymce = () => import('views/Tinymce.vue')

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录'
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: '注册'
    },
  },
  {
    path: '/index',
    name: 'Index',
    component: Index,
    meta: {
      title: '主页',
      isAuthRequired: true,

    },
  }, {
    path: '/details',
    name: 'Details',
    component: Details,
    meta: {
      title: '详情',
      isAuthRequired: true
    },
  },
  {
    path: '/collection',
    name: 'Collection',
    component: Collection,
    meta: {
      title: '收藏',
      isAuthRequired: true
    },
  }, {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      title: '后台',
      isAuthRequired: true
    },
  },
  {
    path: '/tinymce',
    name: 'Tinymce',
    component: Tinymce,
    meta: {
      title: '文章编辑',
      isAuthRequired: true
    },
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: '关于',
      isAuthRequired: true
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.isAuthRequired == true && store.state.isLogin == false) {
    message('请先登录', 'error')
    return next('/')
  } else {
    next();
    document.title = to.meta.title;
  }
  next();
  document.title = to.meta.title;
})

export default router;
