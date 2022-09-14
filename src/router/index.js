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
      },
    ]
  },

  {
    path: '/user/:id/prescription',
    name: 'prescriptions-create',
    component: () => import( '@/views/prescriptions/CreateView.vue'),
    props: ( route ) => {
      const id = Number(route.params.id)
      return isNaN(id) ? { id: 1 } : { id }
    }
  },

  {
    path: '/prescriptions/:id',
    name: 'prescriptions-index',
    component: () => import( '@/views/prescriptions/UserPrescriptions.vue'),
    props: ( route ) => {
      const id = Number(route.params.id)
      return isNaN(id) ? { id: 1 } : { id }
    }
  },

  {
    path: '/prescriptions/:id/edit',
    name: 'prescriptions-edit',
    component: () => import( '@/views/prescriptions/EditView.vue'),
    props: ( route ) => {
      const id = Number(route.params.id)
      return isNaN(id) ? { id: 1 } : { id }
    }
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
