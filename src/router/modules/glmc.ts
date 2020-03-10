import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const glmcRoutes: RouteConfig = {
  path: '/glmcstats',
  component: Layout,
  redirect: '/glmcstats/glmcfail',
  name: 'Stats',
  meta: { title: 'stats', icon: 'chart', roles: ['glmc-college'] },
  children: [
    {
      path: 'glmcfail',
      component: () =>
        import(
          /* webpackChunkName: "come" */ '@/views/04stats/glmcfail/index.vue'
        ),
      name: 'glmcfail',
      meta: { title: 'fails', roles: ['glmc-college'] }
    },
    {
      path: 'glmcfailstatisc',
      component: () =>
        import(
          /* webpackChunkName: "come" */ '@/views/04stats/glmcfailstatisc/index.vue'
        ),
      name: 'glmcfailstatisc',
      meta: { title: 'failStatics', roles: ['glmc-college'] }
    },
    {
      path: 'student',
      component: () =>
        import(
          /* webpackChunkName: "dynamicTable" */ '@/views/01studentmanaged/student/list.vue'
        ),
      name: 'Student',
      meta: { title: 'students' }
    }
  ]
}

export default glmcRoutes
