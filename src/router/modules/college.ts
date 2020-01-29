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
      path: 'cetAverage',
      component: () => import('@/views/01studentmanaged/cet/average.vue'),
      name: 'cetAverage',
      meta: { title: 'cetAverage' }
    },
    {
      path: 'cetStudent',
      component: () => import('@/views/01studentmanaged/cet/stuList.vue'),
      name: 'cetStudent',
      meta: { title: 'cetStudent' }
    },
    {
      path: 'score',
      component: () => import('@/views/01studentmanaged/score/index.vue'),
      name: 'Score',
      meta: { title: 'guet_score' }
    },
    {
      path: 'CourseScore',
      component: () => import('@/views/01studentmanaged/score/courseList.vue'),
      name: 'CourseScore',
      meta: { title: 'courseScore' }
    },
    {
      path: 'course',
      component: () => import('@/views/01studentmanaged/course/index.vue'),
      name: 'course',
      meta: { title: 'course' }
    },
    {
      path: 'import',
      component: () => import('@/views/03system/importExcel/index.vue'),
      name: 'import',
      meta: { title: 'import' }
    }
  ]
}

export default collegeRoutes
