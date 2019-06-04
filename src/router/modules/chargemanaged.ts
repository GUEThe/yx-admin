import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const chargemanagedRoutes: RouteConfig = {
  path: '/chargemanaged',
  component: Layout,
  redirect: '/chargemanaged/payment',
  name: 'Chargemanaged',
  meta: {
    title: 'chargemanaged',
    icon: 'money',
    roles: ['admin', 'financial']
  },
  children: [
    {
      path: 'payment',
      component: () =>
        import(
          /* webpackChunkName: "payment" */ '@/views/02chargemanaged/payment/index.vue'
        ),
      name: 'Payment',
      meta: { title: 'chargemanaged-payment' }
    },
    {
      path: 'fee',
      component: () =>
        import(
          /* webpackChunkName: "payment" */ '@/views/02chargemanaged/fee/index.vue'
        ),
      name: 'Fee',
      meta: { title: 'chargemanaged-fee' }
    }
  ]
}

export default chargemanagedRoutes
