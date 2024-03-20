import { createRouter, createWebHistory } from 'vue-router'

import CalculatorPageView from "@/views/CalculatorPageView";
import ContactFormPageView from "@/views/ContactFormPageView";
import LogInView from "@/views/LogInView.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: LogInView
  },
  {
    path: '/contact-form',
    name: 'Contact-form',
    component: ContactFormPageView
  },
  {
    path: '/',
    name: 'Calculator',
    component: CalculatorPageView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
