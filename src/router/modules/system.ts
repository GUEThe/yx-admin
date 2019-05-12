import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const systemRoutes: RouteConfig = {
  path: '/system',
  component: Layout,
  redirect: '/system/user',
  name: 'System',
  meta: { title: 'systemmanaged', icon: 'table' },
  children: [
    {
      path: 'user',
      component: () =>
        import(
          /* webpackChunkName: "user" */ '@/views/03system/user/index.vue'
        ),
      name: 'User',
      meta: { title: 'systemmanaged-user' }
    },
    {
      path: 'infoCategory',
      component: () =>
        import(
          /* webpackChunkName: "InfoCategory" */ '@/views/03system/InfoCategory/index.vue'
        ),
      name: 'InfoCategory',
      meta: { title: 'systemmanaged-infoCategory' }
    },
    {
      path: 'news',
      component: () =>
        import(
          /* webpackChunkName: "News" */ '@/views/03system/news/index.vue'
        ),
      name: 'News',
      meta: { title: 'systemmanaged-news' }
    }
  ]
}

export default systemRoutes
