import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import HomeView from '../views/HomeView.vue'
import MessageView from '../views/MessageView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainView
    },
    {
      path: '/ip',
      name: 'ip',
      component: HomeView
    },
    {
      path: '/message',
      name: 'message',
      component: MessageView
    }
  ]
})

export default router
