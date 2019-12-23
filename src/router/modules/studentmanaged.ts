import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const studentmanagedRoutes: RouteConfig = {
  path: '/studentmanaged',
  component: Layout,
  redirect: '/studentmanaged/campus',
  name: 'Studentmanaged',
  meta: { title: 'studentmanaged', icon: 'peoples', roles: ['admin'] },
  children: [
    {
      path: 'campus',
      component: () =>
        import(
          /* webpackChunkName: "campus" */ '@/views/01studentmanaged/campus/index.vue'
        ),
      name: 'Campus',
      meta: { title: 'studentmanaged-campus' }
    },
    {
      path: 'college',
      component: () =>
        import(
          /* webpackChunkName: "inlineEditTable" */ '@/views/01studentmanaged/college/index.vue'
        ),
      name: 'College',
      meta: { title: 'studentmanaged-college' }
    },
    {
      path: 'major',
      component: () =>
        import(
          /* webpackChunkName: "dynamicTable" */ '@/views/01studentmanaged/major/index.vue'
        ),
      name: 'Major',
      meta: { title: 'studentmanaged-major' }
    },
    {
      path: 'student',
      component: () =>
        import(
          /* webpackChunkName: "dynamicTable" */ '@/views/01studentmanaged/student/index.vue'
        ),
      name: 'Student',
      meta: { title: 'students' }
    },
    {
      path: 'list',
      component: () =>
        import(
          /* webpackChunkName: "dynamicTable" */ '@/views/01studentmanaged/student/list.vue'
        ),
      name: 'stuList',
      meta: { title: 'stuList' }
    },
    {
      path: 'course',
      component: () =>
        import(
          /* webpackChunkName: "dynamicTable" */ '@/views/01studentmanaged/course/index.vue'
        ),
      name: 'Course',
      meta: { title: 'courses' }
    },
    {
      path: 'score',
      component: () =>
        import(
          /* webpackChunkName: "dynamicTable" */ '@/views/01studentmanaged/score/index.vue'
        ),
      name: 'Score',
      meta: { title: 'score' }
    }
  ]
}

export default studentmanagedRoutes
