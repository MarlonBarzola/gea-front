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
      {
        path: ':id/history',
        name: 'patients-history',
        component: () => import( '@/views/history/HistoryListView'),
        props: ( route ) => {
          const id = Number(route.params.id)
          return isNaN(id) ? { id: 1 } : { id }
        }
      },
      {
        path: ':id/edit',
        name: 'patients-edit',
        component: () => import( '@/views/patients/EditView'),
        props: ( route ) => {
          const id = Number(route.params.id)
          return isNaN(id) ? { id: 1 } : { id }
        }
      },
    ]
  },

  {
    path: '/patients/:id/history',
    name: 'prescriptions-create',
    component: () => import( '@/views/history/CreateView.vue'),
    props: ( route ) => {
      const id = Number(route.params.id)
      return isNaN(id) ? { id: 1 } : { id }
    }
  },

  {
    path: '/history/:id/edit',
    name: 'prescriptions-edit',
    component: () => import( '@/views/history/EditView.vue'),
    props: ( route ) => {
      const id = Number(route.params.id)
      return isNaN(id) ? { id: 1 } : { id }
    }
  },
 
  { 
    path: '/:pathMatch(.*)*', 
    redirect: { name: 'patients-home' }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
