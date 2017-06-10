import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Utama from '@/components/Utama'
import Questiondetail from '@/components/Questiondetail'
import Login from '@/components/Login'
import Register from '@/components/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Utama',
      component: Utama
    },
    {
      path: '/question/:id',
      name:'question-detail',
      component: Questiondetail
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
