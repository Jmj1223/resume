import Home from '@/views/Home.vue'
import { createRouter, createWebHashHistory } from "vue-router"
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/home',
            name: 'Home',
            component: Home
        },
        {
            path: '/about',
            name: 'About',
            component: () => import ('@/views/About.vue')
        },
        {
            path: '/diary',
            name: 'Diary',
            component: () => import ('@/views/Diary.vue'),
            beforeEnter: (to, from, next) => {
                if(!localStorage.getItem('user')) {
                    alert('您还未登录,即将跳转到登陆界面!')
                    setTimeout(() => {
                        router.push('login')
                    }, 2000)
                } else {
                    next();
                }
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import ('@/views/login.vue')
        },
        {
            path: '/mypage',
            name: 'MyPage',
            component: () => import ('@/views/MyPage.vue'),
        },
        {
            path: '/',
            redirect: '/login',
        }
    ]
})
// 全局路由守卫
// router.beforeEach((to, from, next) => {
//     const isAuthenticated = localStorage.getItem('token');// 检查本地存储中是否有token，用于判断用户是否登录
//     if (to.name!== 'Login' &&!isAuthenticated) {
//       // 如果要访问的不是登录页且用户未登录，重定向到登录页
//       next({ name: 'Login' });
//     } else {
//       // 否则允许路由跳转
//       next();
//     }
//   });
export default router