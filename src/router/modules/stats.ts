import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const statsRoutes: RouteConfig = {
    path: '/stats',
    component: Layout,
    redirect: '/stats/come',
    name: 'Stats',
    meta: { title: 'stats', icon: 'chart' },
    children: [
        {
            path: 'come',
            component: () =>
                import(
          /* webpackChunkName: "come" */ '@/views/04stats/come/index.vue'
                ),
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
                import(
          /* webpackChunkName: "shoe" */ '@/views/04stats/shoe/index.vue'
                ),
            name: 'Shoe',
            meta: { title: 'stats-shoe' }
        }
    ]
}

export default statsRoutes
