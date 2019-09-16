import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const statsRoutes: RouteConfig = {
  path: '/stats',
  component: Layout,
  redirect: '/stats/come',
  name: 'Stats',
  meta: { title: 'stats', icon: 'chart', roles: ['admin'] },
  children: [
    {
      path: 'fail',
      component: () =>
        import(/* webpackChunkName: "come" */ '@/views/04stats/fail/index.vue'),
      name: 'fail',
      meta: { title: 'fails' }
    },
    {
      path: 'gradeAnalysis',
      component: () =>
        import(
          /* webpackChunkName: "come" */ '@/views/04stats/gradeAnalysis/index.vue'
        ),
      name: 'GradeAnalysis',
      meta: { title: '成绩分析' }
    },
    {
      path: 'come',
      component: () =>
        import(/* webpackChunkName: "come" */ '@/views/04stats/come/index.vue'),
      name: 'Come',
      meta: { title: 'stats-come' }
    },
    {
      path: 'cloth',
      component: () =>
        import(
          /* webpackChunkName: "cloth" */ '@/views/04stats/cloth/index.vue'
        ),
      name: 'Cloth',
      meta: { title: 'stats-cloth' }
    },
    {
      path: 'shoe',
      component: () =>
        import(/* webpackChunkName: "shoe" */ '@/views/04stats/shoe/index.vue'),
      name: 'Shoe',
      meta: { title: 'stats-shoe' }
    },
    {
      path: 'station',
      component: () =>
        import(
          /* webpackChunkName: "dynamicTable" */ '@/views/01studentmanaged/station/index.vue'
        ),
      name: 'station',
      meta: { title: 'studentmanaged-station' }
    }
  ]
}

export default statsRoutes
