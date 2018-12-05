import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import CourseShow from './views/CourseShow.vue'
import CourseIndex from './views/CourseIndex.vue'
import CreateUser from './views/CreateUser.vue'
import Signup from './views/Signup.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/courses/:name',
      name: 'course-show',
      component: CourseShow
    },
    {
      path: '/courses',
      name: 'courses-index',
      component: CourseIndex
    },
    {
      path: '/users',
      name: 'create-user',
      component: CreateUser
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
