import { createRouter, createWebHistory } from 'vue-router'

import CalculatorPageView from "@/views/CalculatorPageView";
import ContactFormPageView from "@/views/ContactFormPageView";

const routes = [
  {
    path: '/',
    name: 'home',
    component: CalculatorPageView
  },
  {
    path: '/contact-form',
    name: 'Contact-form',
    component: ContactFormPageView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
