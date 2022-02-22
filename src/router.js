import { createRouter, createWebHistory } from 'vue-router';

import Posts from './pages/posts/Posts.vue';
import Login from './pages/Login.vue';
import NotFound from './pages/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/user/:id/posts',
      component: Posts
    },
    { path: '/:notFound(.*)', component: NotFound }
  ]
});

export default router;
