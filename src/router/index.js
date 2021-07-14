import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/views/Home.vue'
import detail from '@/views/detail.vue'
import list from '@/views/list.vue'
import pay from '@/views/pay.vue'

Vue.use(VueRouter)

const routes = [
  {path:'/',redirect:'home'},
  {path:'/home',name:'home',component:home,meta:{keepAlive:true}},
  {path:'/detail',name:'detail',component:detail},
  {path:'/list',name:'list',component:list},
  {path:'/pay',name:'pay',component:pay},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
