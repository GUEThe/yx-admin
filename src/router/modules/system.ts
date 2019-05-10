import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const systemRoutes: RouteConfig = {
  path: '/studentmanaged',
  component: Layout,
  redirect: '/studentmanaged/campus',
  name: 'Studentmanaged',
  meta: { title: 'studentmanaged', icon: 'peoples' },
  children: [
    {
      path: 'campus',
      component: () => import(/* webpackChunkName: "campus" */ '@/views/01studentmanaged/campus/index.vue'),
      name: 'Campus',
      meta: { title: 'studentmanaged-campus' }
    },
    {
      path: 'college',
      component: () => import(/* webpackChunkName: "inlineEditTable" */ '@/views/01studentmanaged/college/index.vue'),
      name: 'College',
      meta: { title: 'studentmanaged-college' }
    },
    {
      path: 'major',
      component: () => import(/* webpackChunkName: "dynamicTable" */ '@/views/01studentmanaged/major/index.vue'),
      name: 'Major',
      meta: { title: 'studentmanaged-major' }
    }
  ]
}

export default systemRoutes
