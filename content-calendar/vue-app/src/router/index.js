import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import ContentView from '@/views/ContentView.vue';
import ContentsView from '@/views/ContentsView.vue';
import AddContentView from '@/views/AddContentView.vue';
import EditContentView from '@/views/EditContentView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/content',
      name: 'contents',
      component: ContentsView
    },
    {
      path: '/content/:id',
      name: 'content',
      component: ContentView,
    },
    {
      path: '/content/add',
      name: 'add-content',
      component: AddContentView
    },
    {
      path: '/content/edit/:id',
      name: 'edit-content',
      component: EditContentView
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
});

export default router;