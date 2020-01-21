import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const collegeRoutes: RouteConfig = {
  path: '/college',
  component: Layout,
  redirect: '/studentmanaged/student',
  name: '学院管理',
  meta: { title: 'stats', icon: 'chart', roles: ['college'] },
  children: [
    {
      path: 'list',
      component: () => import('@/views/01studentmanaged/student/list.vue'),
      name: 'stuList',
      meta: { title: 'stuList' }
    },
    {
      path: 'status',
      component: () => import('@/views/01studentmanaged/student/index.vue'),
      name: 'stuStatus',
      meta: { title: 'stuStatus' }
    },
    {
      path: 'cet',
      component: () => import('@/views/01studentmanaged/cet/index.vue'),
      name: 'cet',
      meta: { title: 'cet' }
    },
    {
      path: 'score',
      component: () => import('@/views/01studentmanaged/score/index.vue'),
      name: 'Score',
      meta: { title: 'guet_score' }
    }
  ]
}

export default collegeRoutes
