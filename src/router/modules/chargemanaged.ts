import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const chargemanagedRoutes: RouteConfig = {
  path: '/chargemanaged',
  component: Layout,
  redirect: '/chargemanaged/payment',
  name: 'Chargemanaged',
  meta: { title: 'chargemanaged', icon: 'peoples' },
  children: [
    {
      path: 'payment',
      component: () =>
        import(
          /* webpackChunkName: "payment" */ '@/views/02chargemanaged/payment/index.vue'
        ),
      name: 'Payment',
      meta: { title: 'chargemanaged-payment' }
    }
  ]
}

export default chargemanagedRoutes
