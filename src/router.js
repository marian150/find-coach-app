import { createRouter, createWebHistory } from 'vue-router';
import CoachesList from './components/pages/coaches/CoachesList.vue';
import CoachDetail from './components/pages/coaches/CoachDetail.vue';
import CoachRegistration from './components/pages/coaches/CoachRegistration.vue';
import ContactCoach from './components/pages/request/ContactCoach.vue';
import RequestList from './components/pages/request/RequestsList.vue';
import NotFound from './components/pages/NotFound.vue';
import store from './components/store/index.js';
import UserAuth from './components/pages/auth/UserAuth.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/coaches'
    },
    {
      path: '/coaches',
      component: CoachesList
    },
    {
      path: '/coaches/:id',
      component: CoachDetail,
      props: true,
      children: [{ path: 'contact', component: ContactCoach }]
    },
    {
      path: '/register',
      component: CoachRegistration,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/requests',
      component: RequestList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/auth',
      component: UserAuth,
      meta: {
        requiresUnauth: true
      }
    },
    {
      path: '/:notFound(.*)',
      component: NotFound
    }
  ]
});

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/coaches');
  } else {
    next();
  }
});

export default router;
