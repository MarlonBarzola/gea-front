import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/patients',
    name: 'patients',
    component: () => import('@/layouts/PatientsLayout'),
    children: [
      {
        path: '',
        name: 'patients-home',
        component: () => import('@/views/patients/HomeView'),
      },
      {
        path: 'create',
        name: 'patients-create',
        component: () => import('@/views/patients/CreateView'),
      }
    ]
  },
 
  { 
    path: '/:pathMatch(.*)*', 
    redirect: { name: 'patients' }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
