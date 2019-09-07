import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const glmcRoutes: RouteConfig = {
  path: '/stats',
  component: Layout,
  redirect: '/stats/come',
  name: 'Stats',
  meta: { title: 'stats', icon: 'chart', roles: ['glmc-admin'] },
  children: [
    {
      path: 'glmcfail',
      component: () =>
        import(
          /* webpackChunkName: "come" */ '@/views/04stats/glmcfail/index.vue'
        ),
      name: 'glmcfail',
      meta: { title: 'fails', roles: ['glmc-admin'] }
    },
    {
      path: 'glmcfailstatisc',
      component: () =>
        import(
          /* webpackChunkName: "come" */ '@/views/04stats/glmcfailstatisc/index.vue'
        ),
      name: 'glmcfailstatisc',
      meta: { title: 'failStatics', roles: ['glmc-admin'] }
    }
  ]
}

export default glmcRoutes
